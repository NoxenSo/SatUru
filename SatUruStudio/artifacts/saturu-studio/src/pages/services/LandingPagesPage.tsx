import { Layout } from 'lucide-react';
import { ServicePageLayout, ServicePageData } from './ServicePageLayout';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const data: ServicePageData = {
  slug: 'landing-pages',
  icon: Layout,
  nameRu: 'Landing Pages',
  nameEn: 'Landing Pages',
  taglineRu: 'Конверсионные лендинги с продуманной структурой и максимальной скоростью загрузки. Запуск за 3–7 дней.',
  taglineEn: 'High-converting landing pages with thoughtful structure and maximum loading speed. Launch in 3–7 days.',
  overviewRu: 'Лендинг — ваша главная точка контакта с потенциальным клиентом. Мы строим лендинги по принципу «конверсия прежде всего»: правильная структура блоков, убедительный призыв к действию, быстрая загрузка и SEO. Результат — страница, которая продаёт.',
  overviewEn: 'A landing page is your main point of contact with a potential client. We build landing pages on a "conversion first" principle: correct block structure, compelling call-to-action, fast loading and SEO. The result — a page that sells.',
  tech: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Analytics', 'A/B Testing'],
  timeRu: '3–7 дней',
  timeEn: '3–7 days',
  accentColor: 'hsl(160 84% 39% / 0.10)',
  process: [
    { titleRu: 'Структура и копирайтинг', titleEn: 'Structure & Copy', descRu: 'Определяем блоки, оффер, УТП и призывы к действию. При необходимости помогаем с текстами.', descEn: 'We define blocks, offer, USP and calls to action. We help with copy if needed.' },
    { titleRu: 'Дизайн', titleEn: 'Design', descRu: 'Создаём дизайн в Figma. Одна концепция, два раунда правок, согласование.', descEn: 'We design in Figma. One concept, two revision rounds, approval.' },
    { titleRu: 'Разработка', titleEn: 'Development', descRu: 'Вёрстка на React + TailwindCSS с анимациями и оптимизацией производительности.', descEn: 'Built with React + TailwindCSS with animations and performance optimization.' },
    { titleRu: 'Аналитика', titleEn: 'Analytics', descRu: 'Подключаем Google Analytics / Яндекс.Метрику, настраиваем цели и события.', descEn: 'We connect Google Analytics / Yandex.Metrica, set up goals and events.' },
    { titleRu: 'Запуск', titleEn: 'Launch', descRu: 'Деплой на Vercel/Cloudflare, настройка домена и SSL.', descEn: 'Deploy to Vercel/Cloudflare, domain and SSL setup.' },
  ],
  faqs: [
    { qRu: 'Мне нужен только дизайн без разработки — можно?', qEn: 'I need design only without development — is that possible?', aRu: 'Да, мы можем предоставить только Figma-макет без верстки.', aEn: 'Yes, we can provide just a Figma mockup without coding.' },
    { qRu: 'Включает ли стоимость копирайтинг?', qEn: 'Does the price include copywriting?', aRu: 'Базовые тексты и структура включены. Профессиональный копирайтинг — дополнительная опция.', aEn: 'Basic copy and structure are included. Professional copywriting is an optional add-on.' },
    { qRu: 'Делаете ли вы A/B тестирование?', qEn: 'Do you do A/B testing?', aRu: 'Да, это доступно в тарифе Стандарт и выше.', aEn: 'Yes, available in Standard and above plans.' },
    { qRu: 'Адаптирован ли лендинг под мобильные устройства?', qEn: 'Is the landing page mobile-responsive?', aRu: 'Да, все наши лендинги полностью адаптивны — от 320px до 4K.', aEn: 'Yes, all our landing pages are fully responsive — from 320px to 4K.' },
  ],
  pricing: [
    { labelRu: 'Быстрый старт', labelEn: 'Quick Start', price: 'от $300', featuresRu: ['1 лендинг', 'До 6 блоков', 'Адаптивность', 'Срок: 3 дня'], featuresEn: ['1 landing page', 'Up to 6 blocks', 'Responsive', 'Timeline: 3 days'] },
    { labelRu: 'Стандарт', labelEn: 'Standard', price: 'от $600', featuresRu: ['1 лендинг', 'До 12 блоков', 'Анимации', 'Аналитика', 'Срок: 5–7 дней'], featuresEn: ['1 landing page', 'Up to 12 blocks', 'Animations', 'Analytics', 'Timeline: 5–7 days'], highlighted: true },
    { labelRu: 'Под ключ', labelEn: 'Turnkey', price: 'от $1,200', featuresRu: ['До 3 лендингов', 'A/B тесты', 'CRM-интеграция', 'SEO', 'Поддержка 1 мес.'], featuresEn: ['Up to 3 landing pages', 'A/B testing', 'CRM integration', 'SEO', '1-month support'] },
  ],
};

export function LandingPagesPage() {
  return (
    <>
      <Header />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}
