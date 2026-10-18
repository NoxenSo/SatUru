import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { Moon, Sun, LayoutDashboard, User, Settings, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SaturnIcon } from './SaturnIcon';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const NAV_LINKS = [
  { href: '#services', key: 'navServices' as const },
  { href: '#pricing',  key: 'navPricing'  as const },
  { href: '#works',    key: 'navWorks'    as const },
  { href: '#process',  key: 'navProcess'  as const },
  { href: '#contact',  key: 'navContact'  as const },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Intensify blur / border after user scrolls 12px */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Close mobile menu on ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'glass-heavy border-b border-border/50 shadow-sm shadow-black/5'
            : 'bg-background/60 backdrop-blur-md border-b border-transparent',
        ].join(' ')}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <a
            href="/"
            className="font-display font-bold text-[1.2rem] tracking-[-0.03em] shrink-0 flex items-center gap-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
            aria-label="SatUru Studio — home"
          >
            Sat<span className="text-gradient">Uru</span>
            <span className="mx-0.5 text-muted-foreground/50">&nbsp;Studi</span>
            <SaturnIcon size="1.1em" className="saturn-logo" />
          </a>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden md:flex items-center gap-7 text-[13px] font-medium text-muted-foreground"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                className="relative py-1 hover:text-foreground transition-colors duration-200 group"
              >
                {t[key]}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* ── Controls ── */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="hidden sm:flex text-[11px] font-bold px-3 h-8 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 tracking-[0.12em] items-center focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Auth area */}
            {loading ? (
              <div className="flex items-center gap-2 pointer-events-none" aria-hidden>
                <div className="h-8 w-16 rounded-full bg-muted/40 animate-pulse" />
                <div className="h-8 w-24 rounded-full bg-muted/30 animate-pulse" />
              </div>
            ) : user ? (
              /* ── Authenticated ── */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 pl-1 pr-3.5 h-9 rounded-full border border-border/50 hover:border-primary/40 bg-card/40 hover:bg-primary/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-primary flex items-center justify-center text-[11px] font-bold tracking-wide shrink-0 ring-1 ring-primary/25 group-hover:ring-primary/50 transition-all">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        getInitials(user.name)
                      )}
                    </span>
                    <span className="hidden sm:block text-[13px] font-medium text-foreground/80 max-w-[110px] truncate">
                      {user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-52 rounded-2xl border border-border/60 bg-background/90 backdrop-blur-2xl shadow-xl shadow-black/20 p-1.5"
                >
                  <div className="px-3 py-2.5 mb-1">
                    <p className="text-[13px] font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/40 mb-1" />

                  <DropdownMenuItem
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer focus:text-foreground focus:bg-primary/8 transition-colors group/item"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LayoutDashboard size={14} className="text-primary/60 group-hover/item:text-primary transition-colors" />
                    {t.menuClientPortal}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer focus:text-foreground focus:bg-primary/8 transition-colors group/item"
                    onClick={() => navigate('/dashboard/profile')}
                  >
                    <User size={14} className="text-primary/60 group-hover/item:text-primary transition-colors" />
                    {t.menuProfile}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer focus:text-foreground focus:bg-primary/8 transition-colors group/item"
                    onClick={() => navigate('/dashboard/settings')}
                  >
                    <Settings size={14} className="text-primary/60 group-hover/item:text-primary transition-colors" />
                    {t.menuSettings}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border/40 my-1" />

                  <DropdownMenuItem
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-red-400/70 hover:text-red-400 cursor-pointer focus:text-red-400 focus:bg-red-500/8 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} />
                    {t.menuSignOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* ── Unauthenticated ── */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-[13px] font-medium px-4 h-8 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 hidden sm:flex items-center"
                >
                  {t.btnLogin}
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-[13px] font-semibold px-4 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary/50 hidden sm:flex items-center"
                >
                  {t.btnSignUp}
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 ml-1"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile nav panel ── */}
      <div
        className={[
          'fixed inset-x-0 top-[72px] z-40 md:hidden transition-all duration-300 ease-out',
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div className="mx-4 mt-2 rounded-2xl glass-heavy border border-border/50 shadow-2xl shadow-black/20 overflow-hidden">
          <nav className="p-4 space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-150"
              >
                {t[key]}
              </a>
            ))}
          </nav>

          {!loading && !user && (
            <div className="px-4 pb-4 pt-2 border-t border-border/40 flex gap-2">
              <button
                onClick={() => { setMobileOpen(false); navigate('/login'); }}
                className="flex-1 text-[14px] font-medium py-2.5 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.btnLogin}
              </button>
              <button
                onClick={() => { setMobileOpen(false); navigate('/signup'); }}
                className="flex-1 text-[14px] font-semibold py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t.btnSignUp}
              </button>
            </div>
          )}

          <div className="px-4 pb-4 pt-2 border-t border-border/40 flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground transition-all tracking-[0.12em]"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-foreground transition-all"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
        {/* Backdrop */}
        <div
          className="absolute inset-x-0 top-full h-screen bg-background/30 backdrop-blur-sm -z-10"
          onClick={() => setMobileOpen(false)}
        />
      </div>
    </>
  );
};
