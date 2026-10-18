'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function SignUpForm() { const router = useRouter(); const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [pending,setPending]=useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setPending(true); setError(''); const { error } = await createClient().auth.signUp({ email, password, options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`, data: { name } } }); if (error) setError(error.message.includes('password') ? 'Пароль слишком слабый' : 'Не удалось создать аккаунт'); else router.push('/auth/sign-up-success'); setPending(false) }
  return <form className="auth-form" onSubmit={submit}><label>Имя<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" /></label><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" /></label><label>Пароль<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password" /></label>{error && <p className="auth-error">{error}</p>}<button className="form-submit" disabled={pending}>{pending ? 'Создаём…' : 'Создать аккаунт'} <span>↗</span></button></form>
}
