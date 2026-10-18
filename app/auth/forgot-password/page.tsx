import Link from 'next/link'
import { AuthShell } from '@/app/auth/auth-shell'
import { ForgotPasswordForm } from './forgot-password-form'
export default function ForgotPasswordPage() { return <AuthShell title="Сбросить пароль" description="Введите email, и мы отправим ссылку для восстановления доступа."><ForgotPasswordForm /></AuthShell> }
