import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SaturnIcon } from '@/components/SaturnIcon';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/dashboard',           label: 'Dashboard',   icon: LayoutDashboard, exact: true },
  { href: '/dashboard/projects',  label: 'My Projects', icon: FolderOpen },
  { href: '/dashboard/messages',  label: 'Messages',    icon: MessageSquare },
  { href: '/dashboard/profile',   label: 'Profile',     icon: User },
  { href: '/dashboard/settings',  label: 'Settings',    icon: Settings },
];

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  onClick?: () => void;
}) {
  const [location] = useLocation();
  const active = exact ? location === href : location.startsWith(href);

  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 group relative',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        )}
        aria-current={active ? 'page' : undefined}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
        )}
        <Icon
          size={16}
          className={cn('shrink-0 transition-colors', active ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-foreground')}
        />
        {label}
        {active && <ChevronRight size={12} className="ml-auto text-primary/50" />}
      </button>
    </Link>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '??';

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={cn(
        'flex flex-col h-full bg-sidebar border-r border-sidebar-border',
        mobile ? 'w-72' : 'w-60',
      )}
      role="navigation"
      aria-label="Dashboard navigation"
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between border-b border-sidebar-border/50">
        <Link href="/">
          <span className="font-display text-[1rem] font-bold tracking-[-0.03em] cursor-pointer flex items-center gap-0">
            Sat<span className="text-gradient">Uru</span>
            <span className="text-muted-foreground/40 text-[0.9em]">&nbsp;St</span>
            <SaturnIcon size="0.95em" />
            <span className="text-muted-foreground/40 text-[0.9em]">dio</span>
          </span>
        </Link>
        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            onClick={mobile ? () => setMobileOpen(false) : undefined}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border/50 p-3 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/30">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user?.avatarUrl ?? undefined} />
            <AvatarFallback className="bg-primary/15 text-primary text-[11px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate leading-tight">{user?.name}</p>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2.5 text-[13px] text-muted-foreground hover:text-red-400 hover:bg-red-500/8 transition-colors rounded-xl h-9"
        >
          <LogOut size={14} />
          Sign out
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="relative h-full"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sidebar mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-40 flex items-center gap-4 px-4 py-3.5 bg-background/90 backdrop-blur-md border-b border-border/40">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            aria-label="Open navigation"
          >
            <Menu size={16} />
          </button>
          <span className="font-display font-bold text-[0.95rem] tracking-[-0.02em] flex items-center gap-0">
            Sat<span className="text-gradient">Uru</span>
            <span className="text-muted-foreground/40">&nbsp;St</span>
            <SaturnIcon size="0.95em" />
            <span className="text-muted-foreground/40">dio</span>
          </span>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
