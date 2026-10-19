import { Gamepad2 } from 'lucide-react';
import { ServicePageLayout, ServicePageData } from './ServicePageLayout';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const data: ServicePageData = {
  slug: 'game-projects',
  icon: Gamepad2,
  nameRu: 'Игровые проекты',
  nameEn: 'Game Projects',
  taglineRu: 'Разработка Minecraft-плагинов, веб-интерфейсов для серверов и игровых платформ любой сложности.',
  taglineEn: 'Minecraft plugin development, web interfaces for servers and gaming platforms of any complexity.',
  overviewRu: 'Мы специализируемся на разработке для игровых проектов: плагины для Minecraft на Java и Kotlin, веб-сайты и панели управления для серверов, интеграция с игровыми API и платёжными системами. Понимаем специфику игровой аудитории и создаём решения, которые работают под нагрузкой.',
  overviewEn: 'We specialize in development for game projects: Minecraft plugins in Java and Kotlin, websites and control panels for servers, integration with game APIs and payment systems. We understand the gaming audience and build solutions that work under load.',
  tech: ['Java', 'Kotlin', 'Paper/Spigot', 'Skript', 'React', 'Node.js', 'WebSockets'],
  timeRu: '2–6 недель',
  timeEn: '2–6 weeks',
  accentColor: 'hsl(45 96% 53% / 0.10)',
  process: [
    { titleRu: 'Техническое задание', titleEn: 'Technical Spec', descRu: 'Подробно обсуждаем механики, интеграции и технические ограничения. Фиксируем в ТЗ.', descEn: 'We discuss mechanics, integrations and technical constraints in detail. Documented in a spec.' },
    { titleRu: 'Архитектура', titleEn: 'Architecture', descRu: 'Проектируем архитектуру с учётом производительности и расширяемости.', descEn: 'We design architecture with performance and extensibility in mind.' },
    { titleRu: 'Разработка', titleEn: 'Development', descRu: 'Пишем код итерациями. Для плагинов — тестируем на тестовом сервере. Регулярные демо.', descEn: 'We code iteratively. For plugins — tested on a test server. Regular demos.' },
    { titleRu: 'Нагрузочное тестирование', titleEn: 'Load Testing', descRu: 'Проверяем производительность под реальной нагрузкой, оптимизируем узкие места.', descEn: 'We test performance under real load, optimize bottlenecks.' },
    { titleRu: 'Деплой и поддержка', titleEn: 'Deploy & Support', descRu: 'Разворачиваем на вашем сервере, документируем, обучаем администраторов.', descEn: 'Deploy to your server, document, train administrators.' },
  ],
  faqs: [
    { qRu: 'Работаете ли вы с Bedrock Edition?', qEn: 'Do you work with Bedrock Edition?', aRu: 'Преимущественно Java Edition, но есть опыт и с Bedrock. Обсудите задачу — найдём решение.', aEn: 'Primarily Java Edition, but we have Bedrock experience too. Discuss your task — we\'ll find a solution.' },
    { qRu: 'Можете ли вы разработать сайт для Minecraft-сервера?', qEn: 'Can you build a website for a Minecraft server?', aRu: 'Да, это одна из наших специализаций. Сайт, личный кабинет, донат-магазин, статистика игроков.', aEn: 'Yes, this is one of our specializations. Site, user cabinet, donation store, player statistics.' },
    { qRu: 'Интегрируете ли вы сторонние плагины?', qEn: 'Do you integrate third-party plugins?', aRu: 'Да, умеем работать с большинством популярных плагинов: Vault, LuckPerms, WorldGuard и другими.', aEn: 'Yes, we work with most popular plugins: Vault, LuckPerms, WorldGuard and others.' },
    { qRu: 'Предоставляете ли вы исходный код?', qEn: 'Do you provide source code?', aRu: 'Да, исходный код передаётся клиенту вместе с документацией в финальном пакете.', aEn: 'Yes, source code is transferred to the client along with documentation in the final package.' },
  ],
  pricing: [
    { labelRu: 'Базовый плагин', labelEn: 'Basic Plugin', price: 'от $600', featuresRu: ['1 плагин', 'Базовые механики', 'Документация', 'Срок: 1–2 недели'], featuresEn: ['1 plugin', 'Basic mechanics', 'Documentation', 'Timeline: 1–2 weeks'] },
    { labelRu: 'Серверный пакет', labelEn: 'Server Package', price: 'от $1,500', featuresRu: ['До 3 плагинов', 'Веб-сайт', 'Интеграции', 'Нагрузочные тесты', 'Срок: 3–4 недели'], featuresEn: ['Up to 3 plugins', 'Website', 'Integrations', 'Load testing', 'Timeline: 3–4 weeks'], highlighted: true },
    { labelRu: 'Полная платформа', labelEn: 'Full Platform', price: 'от $3,500', featuresRu: ['Без ограничений', 'Личный кабинет', 'Донат-система', 'API', 'Поддержка 3 мес.'], featuresEn: ['Unlimited plugins', 'User cabinet', 'Donation system', 'API', '3-month support'] },
  ],
};

export function GameProjectsPage() {
  return (
    <>
      <Header />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}
