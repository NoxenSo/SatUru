import Link from 'next/link'
import { AuthShell } from '@/app/auth/auth-shell'
export default function SignUpSuccessPage() { return <AuthShell title="Проверьте почту" description="Мы отправили ссылку подтверждения. После подтверждения вы сможете войти в аккаунт."><Link className="form-submit auth-submit-link" href="/auth/login">Вернуться ко входу <span>↗</span></Link></AuthShell> }
