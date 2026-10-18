import { Globe } from 'lucide-react';
import { ServicePageLayout, ServicePageData } from './ServicePageLayout';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const data: ServicePageData = {
  slug: 'websites',
  icon: Globe,
  nameRu: 'Веб-сайты',
  nameEn: 'Websites',
  taglineRu: 'Высококачественные веб-сайты с нуля — от архитектуры до деплоя. Адаптивный дизайн, молниеносная производительность, чистый код.',
  taglineEn: 'High-quality websites built from scratch — architecture to deployment. Responsive design, lightning-fast performance, clean code.',
  overviewRu: 'Мы создаём веб-сайты, которые работают. Каждый проект начинается с глубокого погружения в бизнес-задачи клиента. Мы проектируем архитектуру, разрабатываем дизайн-систему, пишем чистый и масштабируемый код, настраиваем CI/CD и передаём проект в эксплуатацию. Никаких конструкторов — только качественная разработка.',
  overviewEn: 'We build websites that work. Every project starts with a deep dive into the client\'s business goals. We design the architecture, build a design system, write clean and scalable code, set up CI/CD and hand the project over. No page builders — only quality development.',
  tech: ['React', 'Vite', 'Next.js', 'TailwindCSS', 'TypeScript', 'Node.js', 'PostgreSQL'],
  timeRu: '2–4 недели',
  timeEn: '2–4 weeks',
  accentColor: 'hsl(258 90% 66% / 0.12)',
  process: [
    { titleRu: 'Бриф и исследование', titleEn: 'Brief & Research', descRu: 'Собираем требования, изучаем аудиторию и конкурентов, определяем цели и метрики успеха.', descEn: 'We gather requirements, study the audience and competitors, define goals and success metrics.' },
    { titleRu: 'Проектирование', titleEn: 'Design', descRu: 'Создаём sitemap, wireframes и UI-дизайн в Figma. Согласовываем каждый экран до начала разработки.', descEn: 'We create sitemap, wireframes and UI design in Figma. Every screen is approved before development begins.' },
    { titleRu: 'Разработка', titleEn: 'Development', descRu: 'Пишем код итерациями. Еженедельные демо. Покрытие тестами. Git-flow с кодревью.', descEn: 'We code in iterations. Weekly demos. Test coverage. Git-flow with code reviews.' },
    { titleRu: 'Тестирование и QA', titleEn: 'Testing & QA', descRu: 'Проверяем на всех устройствах и браузерах, тестируем производительность и доступность.', descEn: 'We test on all devices and browsers, check performance and accessibility.' },
    { titleRu: 'Запуск', titleEn: 'Launch', descRu: 'Деплой, настройка CDN, мониторинг и обучение команды клиента.', descEn: 'Deployment, CDN setup, monitoring and client team training.' },
  ],
  faqs: [
    { qRu: 'Можете ли вы доработать существующий сайт?', qEn: 'Can you improve an existing website?', aRu: 'Да, мы работаем как с новыми проектами, так и с доработкой существующих. Начнём с аудита текущего состояния.', aEn: 'Yes, we work on both new projects and improvements to existing ones. We start with an audit of the current state.' },
    { qRu: 'Какой стек технологий вы используете?', qEn: 'What tech stack do you use?', aRu: 'Наш основной стек: React + Vite или Next.js + TypeScript + TailwindCSS. Для бэкенда — Node.js + PostgreSQL. Подбираем стек под задачу.', aEn: 'Our main stack: React + Vite or Next.js + TypeScript + TailwindCSS. For backend — Node.js + PostgreSQL. We pick the stack based on the task.' },
    { qRu: 'Включает ли цена хостинг?', qEn: 'Does the price include hosting?', aRu: 'Нет, хостинг оплачивается отдельно. Мы поможем выбрать оптимальный вариант и настроить всё необходимое.', aEn: 'No, hosting is paid separately. We help choose the best option and configure everything.' },
    { qRu: 'Предоставляете ли вы поддержку после запуска?', qEn: 'Do you provide post-launch support?', aRu: 'Да, у нас есть тарифы технической поддержки. Вы также можете заказать разовые правки по мере необходимости.', aEn: 'Yes, we have technical support plans. You can also order one-time fixes as needed.' },
  ],
  pricing: [
    { labelRu: 'Базовый', labelEn: 'Basic', price: 'от $800', featuresRu: ['До 5 страниц', 'Адаптивный дизайн', 'SEO-оптимизация', 'Срок: 2 недели'], featuresEn: ['Up to 5 pages', 'Responsive design', 'SEO optimization', 'Timeline: 2 weeks'] },
    { labelRu: 'Стандарт', labelEn: 'Standard', price: 'от $1,500', featuresRu: ['До 15 страниц', 'Дизайн-система', 'Анимации', 'CMS / Admin', 'Срок: 3–4 недели'], featuresEn: ['Up to 15 pages', 'Design system', 'Animations', 'CMS / Admin', 'Timeline: 3–4 weeks'], highlighted: true },
    { labelRu: 'Премиум', labelEn: 'Premium', price: 'от $3,000', featuresRu: ['Без ограничений', 'Fullstack', 'Интеграции API', 'Тестирование', 'Поддержка 3 мес.'], featuresEn: ['Unlimited pages', 'Fullstack', 'API integrations', 'Testing', '3-month support'] },
  ],
};

export function WebsitesPage() {
  return (
    <>
      <Header />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}
