import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const sections = {
  projects: { label: 'Проекты', title: 'Ваши проекты', description: 'Активные проекты и результаты работы команды SatUru Studio.' },
  messages: { label: 'Сообщения', title: 'Сообщения', description: 'История общения и последние обновления по вашим задачам.' },
  profile: { label: 'Профиль', title: 'Профиль', description: 'Ваши контактные данные и настройки аккаунта.' },
  settings: { label: 'Настройки', title: 'Настройки', description: 'Управление безопасностью и предпочтениями пространства.' },
} as const

export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const content = sections[section as keyof typeof sections]
  if (!content) notFound()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return <main className="dashboard-page"><div className="dashboard-shell"><header className="dashboard-header"><Link href="/dashboard" className="auth-brand"><span className="auth-mark">S</span> SatUru<span className="auth-dot">•</span></Link><Link href="/dashboard" className="dashboard-logout">Dashboard</Link></header><section className="dashboard-hero"><span className="eyebrow">{content.label}</span><h1>{content.title}</h1><p>{content.description}</p></section><div className="dashboard-panel"><p>{user.email}</p><span>Раздел готов к работе.</span></div></div></main>
}
