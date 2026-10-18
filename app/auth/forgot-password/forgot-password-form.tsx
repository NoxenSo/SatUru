'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export function ForgotPasswordForm() { const [email,setEmail]=useState(''); const [sent,setSent]=useState(false); const [pending,setPending]=useState(false); async function submit(e:FormEvent){e.preventDefault();setPending(true);await createClient().auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/auth/callback?next=/auth/update-password`});setSent(true);setPending(false)} return sent ? <p className="auth-success">Если аккаунт существует, ссылка для восстановления отправлена на {email}.</p> : <form className="auth-form" onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label><button className="form-submit" disabled={pending}>{pending?'Отправляем…':'Отправить ссылку'} <span>↗</span></button></form> }
