import Link from 'next/link'
import { AuthShell } from '@/app/auth/auth-shell'
export default function AuthErrorPage() { return <AuthShell title="Ссылка недействительна" description="Не удалось завершить авторизацию. Попробуйте запросить новую ссылку."><Link className="form-submit auth-submit-link" href="/auth/login">Вернуться ко входу <span>↗</span></Link></AuthShell> }
