'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Lang, copy } from '@/data/content';

const nav = [
  ['/#services', 'services'],
  ['/#pricing', 'pricing'],
  ['/work', 'work'],
  ['/#process', 'process'],
  ['/#contact', 'contact'],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return <>
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)} aria-label="SatUru Studio — home">
          Sat<span>Uru</span><b> Studi</b><i aria-hidden="true" />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {nav.map(([href, key]) => <Link key={key} href={href}>{key === 'services' ? t.nav.services : key === 'work' ? t.nav.work : key === 'contact' ? t.nav.contact : key === 'pricing' ? (lang === 'ru' ? 'Цены' : 'Pricing') : (lang === 'ru' ? 'Процесс' : 'Process')}</Link>)}
        </nav>
        <div className="site-controls">
          <button className="language-toggle" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} aria-label="Toggle language">{lang.toUpperCase()}</button>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{mounted && (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />)}</button>
          <Link className="header-cta" href="/contact">{t.start}<ArrowUpRight size={14} /></Link>
        </div>
        <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {open && <div className="mobile-nav-panel"><nav className="container" aria-label="Mobile navigation">{nav.map(([href, key]) => <Link key={key} href={href} onClick={() => setOpen(false)}>{key === 'services' ? t.nav.services : key === 'work' ? t.nav.work : key === 'contact' ? t.nav.contact : key === 'pricing' ? (lang === 'ru' ? 'Цены' : 'Pricing') : (lang === 'ru' ? 'Процесс' : 'Process')}<ArrowUpRight size={15} /></Link>)}<div className="mobile-nav-controls"><button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang.toUpperCase()} / {lang === 'ru' ? 'EN' : 'RU'}</button><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{mounted && (theme === 'dark' ? 'Light theme' : 'Dark theme')}</button></div></nav></div>}
    </header>
    {children}
  </>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) { return <>{children}</>; }

export function Footer() {
  return <footer className="site-footer border-t rule"><div className="site-footer__cta"><div className="container"><div className="eyebrow">Let&apos;s work together</div><div className="site-footer__cta-row"><div><h2>Есть идея?<br />Давайте её реализуем.</h2><p>Digital products, design and development with purpose.</p></div><Link className="site-footer__cta-button" href="/contact">Начать проект <ArrowUpRight size={15} /></Link></div></div></div><div className="container site-footer__grid"><div><div className="site-logo">Sat<span>Uru</span><b> Studio</b></div><p>Independent digital practice for products, interfaces and systems.</p></div><nav><span className="eyebrow">Navigate</span><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><div><span className="eyebrow">Contact</span><a href="mailto:hello@saturu.studio">hello@saturu.studio</a><span>Available for selected projects</span></div></div></footer>;
}
