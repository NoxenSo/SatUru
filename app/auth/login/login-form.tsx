'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [pending, setPending] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setPending(true); setError(''); const { error } = await createClient().auth.signInWithPassword({ email, password }); if (error) setError('Неверный email или пароль'); else router.push('/dashboard'); setPending(false) }
  return <form className="auth-form" onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></label><label>Пароль<input type="password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" /></label>{error && <p className="auth-error">{error}</p>}<button className="form-submit" disabled={pending}>{pending ? 'Входим…' : 'Войти'} <span>↗</span></button><Link className="auth-reset" href="/auth/forgot-password">Забыли пароль?</Link></form>
}
