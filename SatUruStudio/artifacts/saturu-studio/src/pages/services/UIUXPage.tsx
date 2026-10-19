import { Layers } from 'lucide-react';
import { ServicePageLayout, ServicePageData } from './ServicePageLayout';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const data: ServicePageData = {
  slug: 'ui-ux',
  icon: Layers,
  nameRu: 'UI/UX Дизайн',
  nameEn: 'UI/UX Design',
  taglineRu: 'Проектируем интерфейсы, которые работают — для людей, а не для портфолио. Исследование, прототипирование, дизайн-системы.',
  taglineEn: 'We design interfaces that work — for people, not portfolios. Research, prototyping, design systems.',
  overviewRu: 'Хороший UI/UX — это не просто красиво, это ещё и удобно. Мы начинаем с исследования пользователей и бизнес-задач, строим информационную архитектуру, создаём wireframes и интерактивные прототипы, а затем финализируем пиксельный UI с полной дизайн-системой.',
  overviewEn: 'Good UI/UX is not just beautiful — it\'s also useful. We start with user research and business goals, build information architecture, create wireframes and interactive prototypes, then finalize pixel-perfect UI with a complete design system.',
  tech: ['Figma', 'FigJam', 'Framer', 'Prototyping', 'User Testing', 'Design Tokens'],
  timeRu: '1–3 недели',
  timeEn: '1–3 weeks',
  accentColor: 'hsl(217 91% 60% / 0.12)',
  process: [
    { titleRu: 'Discovery', titleEn: 'Discovery', descRu: 'Интервью со стейкхолдерами, аудит существующего продукта, конкурентный анализ, определение пользовательских сценариев.', descEn: 'Stakeholder interviews, existing product audit, competitive analysis, user scenario mapping.' },
    { titleRu: 'Информационная архитектура', titleEn: 'Information Architecture', descRu: 'Структурируем контент, строим sitemap и пользовательские потоки (user flows).', descEn: 'We structure content, build sitemap and user flows.' },
    { titleRu: 'Wireframes', titleEn: 'Wireframes', descRu: 'Создаём низкодетальные прототипы для быстрой проверки концепций и навигационной логики.', descEn: 'We create low-fidelity prototypes to quickly validate concepts and navigation logic.' },
    { titleRu: 'UI Design', titleEn: 'UI Design', descRu: 'Разрабатываем финальный дизайн с полной дизайн-системой: компоненты, токены, документация.', descEn: 'We develop the final design with a complete design system: components, tokens, documentation.' },
    { titleRu: 'Передача в разработку', titleEn: 'Handoff', descRu: 'Готовим spec-файлы, экспортируем ассеты, консультируем разработчиков на всём этапе.', descEn: 'We prepare spec files, export assets, consult developers throughout implementation.' },
  ],
  faqs: [
    { qRu: 'Работаете ли вы только с новыми проектами?', qEn: 'Do you work only with new projects?', aRu: 'Нет, мы часто работаем с редизайном существующих продуктов. Начинаем с UX-аудита.', aEn: 'No, we frequently work on redesigns of existing products. We start with a UX audit.' },
    { qRu: 'Входит ли прототипирование в стоимость?', qEn: 'Is prototyping included in the price?', aRu: 'Да, интерактивный прототип в Figma входит в каждый тариф.', aEn: 'Yes, an interactive Figma prototype is included in every plan.' },
    { qRu: 'Получу ли я исходные файлы Figma?', qEn: 'Will I receive the Figma source files?', aRu: 'Да, все исходные файлы передаются клиенту по завершении проекта.', aEn: 'Yes, all source files are transferred to the client upon project completion.' },
    { qRu: 'Проводите ли вы пользовательское тестирование?', qEn: 'Do you conduct user testing?', aRu: 'Да, в тарифе Стандарт и выше мы организуем сессии пользовательского тестирования.', aEn: 'Yes, in Standard and above plans we organize user testing sessions.' },
  ],
  pricing: [
    { labelRu: 'Базовый', labelEn: 'Basic', price: 'от $500', featuresRu: ['До 10 экранов', 'Wireframes', 'Мобильная адаптация', 'Срок: 1 неделя'], featuresEn: ['Up to 10 screens', 'Wireframes', 'Mobile adaptation', 'Timeline: 1 week'] },
    { labelRu: 'Стандарт', labelEn: 'Standard', price: 'от $1,200', featuresRu: ['До 30 экранов', 'Дизайн-система', 'Интерактивный прототип', 'Пользовательское тестирование', 'Срок: 2–3 недели'], featuresEn: ['Up to 30 screens', 'Design system', 'Interactive prototype', 'User testing', 'Timeline: 2–3 weeks'], highlighted: true },
    { labelRu: 'Премиум', labelEn: 'Premium', price: 'от $2,500', featuresRu: ['Без ограничений', 'Полная дизайн-система', 'Анимации', 'Dev Handoff', 'Поддержка 2 мес.'], featuresEn: ['Unlimited screens', 'Full design system', 'Animations', 'Dev Handoff', '2-month support'] },
  ],
};

export function UIUXPage() {
  return (
    <>
      <Header />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}
