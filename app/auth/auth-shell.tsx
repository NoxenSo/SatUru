'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function AuthShell({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  const pathname = usePathname()
  return <main className="auth-page"><div className="auth-card"><Link href="/" className="auth-brand"><span className="auth-mark">S</span> SatUru<span className="auth-dot">•</span></Link><div className="auth-copy"><span className="eyebrow">SatUru Studio</span><h1>{title}</h1><p>{description}</p></div>{children}<div className="auth-links">{pathname !== '/auth/login' && <Link href="/auth/login">Войти</Link>}{pathname !== '/auth/sign-up' && <Link href="/auth/sign-up">Создать аккаунт</Link>}</div></div></main>
}
