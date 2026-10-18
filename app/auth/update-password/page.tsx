'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthShell } from '@/app/auth/auth-shell'
export default function UpdatePasswordPage(){const [password,setPassword]=useState('');const [done,setDone]=useState(false);async function submit(e:FormEvent){e.preventDefault();const {error}=await createClient().auth.updateUser({password});if(!error)setDone(true)}return <AuthShell title="Новый пароль" description="Выберите новый пароль для аккаунта.">{done?<p className="auth-success">Пароль обновлён. Теперь можно войти.</p>:<form className="auth-form" onSubmit={submit}><label>Новый пароль<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} /></label><button className="form-submit">Сохранить пароль <span>↗</span></button></form>}</AuthShell>}
