'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Lang, copy } from '@/data/content';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');
  const [currency, setCurrency] = useState('RUB');
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const t = copy[lang];
  const close = () => setOpen(false);

  return <>
    <header className="sticky top-0 z-40 border-b rule bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight" onClick={close}>
          <span aria-hidden="true" className="relative grid size-6 place-items-center border border-current text-[9px] after:absolute after:-right-1 after:top-1/2 after:h-2 after:w-3 after:-translate-y-1/2 after:rounded-[50%] after:border-t after:border-current"></span>
          SatUru <span className="font-normal text-[var(--muted)]">Studio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-[var(--muted)] md:flex" aria-label="Primary navigation">
          <Link className="transition-colors hover:text-[var(--fg)]" href="/work">{lang === 'ru' ? 'Работы' : 'Work'}</Link>
          <Link className="transition-colors hover:text-[var(--fg)]" href="/services">{lang === 'ru' ? 'Услуги' : 'Services'}</Link>
          <Link className="transition-colors hover:text-[var(--fg)]" href="/about">{lang === 'ru' ? 'О студии' : 'About'}</Link>
          <Link className="transition-colors hover:text-[var(--fg)]" href="/contact">{lang === 'ru' ? 'Контакт' : 'Contact'}</Link>
        </nav>
        <div className="hidden items-center gap-4 text-[11px] md:flex">
          <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="tracking-wider" aria-label="Switch language">{lang.toUpperCase()} <span className="text-[var(--muted)]">/ {lang === 'ru' ? 'EN' : 'RU'}</span></button>
          <button onClick={() => setCurrency(currency === 'RUB' ? 'USD' : 'RUB')} className="text-[var(--muted)]" aria-label="Switch currency">{currency}</button>
          <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="border-l rule pl-4 text-[var(--muted)]">{mounted ? (theme === 'dark' ? <Sun /> : <Moon />) : <span aria-hidden="true" className="inline-block size-6" />}</button>
          <Link className="ml-2 inline-flex items-center gap-2 border border-[var(--fg)] px-4 py-2 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]" href="/contact">{t.start} <ArrowUpRight /></Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t rule md:hidden"><nav className="container flex flex-col gap-5 py-6 text-lg" aria-label="Mobile navigation">
        <Link href="/work" onClick={close}>{lang === 'ru' ? 'Работы' : 'Work'}</Link><Link href="/services" onClick={close}>{lang === 'ru' ? 'Услуги' : 'Services'}</Link><Link href="/about" onClick={close}>{lang === 'ru' ? 'О студии' : 'About'}</Link><Link href="/contact" onClick={close}>{lang === 'ru' ? 'Контакт' : 'Contact'}</Link>
        <div className="flex items-center gap-5 border-t rule pt-5 text-xs text-[var(--muted)]"><button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang.toUpperCase()} / {lang === 'ru' ? 'EN' : 'RU'}</button><button onClick={() => setCurrency(currency === 'RUB' ? 'USD' : 'RUB')}>{currency}</button><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{mounted ? (theme === 'dark' ? 'Light theme' : 'Dark theme') : 'Theme'}</button></div>
        <Link className="inline-flex w-fit items-center gap-2 border border-[var(--fg)] px-4 py-3 text-sm" href="/contact" onClick={close}>{t.start} <ArrowUpRight /></Link>
      </nav></div>}
    </header>
    {children}
  </>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function Footer() { return <footer className="border-t rule py-14"><div className="container grid gap-12 md:grid-cols-[1fr_auto_auto]"><div><div className="text-sm font-semibold">SatUru Studio</div><p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">Digital products, design and development with purpose.</p></div><div className="grid grid-cols-2 gap-12 text-sm"><div className="flex flex-col gap-3"><span className="eyebrow">Navigate</span><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div className="flex flex-col gap-3"><span className="eyebrow">Legal</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div></div><div className="md:text-right"><a className="text-sm underline underline-offset-4" href="mailto:hello@saturu.studio">hello@saturu.studio</a><p className="mt-10 text-xs text-[var(--muted)]">© {new Date().getFullYear()} SatUru Studio</p></div></div></footer>; }
export function Arrow() { return <ArrowUpRight />; }
