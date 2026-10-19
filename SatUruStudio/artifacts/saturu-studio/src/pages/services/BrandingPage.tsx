import { Palette } from 'lucide-react';
import { ServicePageLayout, ServicePageData } from './ServicePageLayout';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const data: ServicePageData = {
  slug: 'branding',
  icon: Palette,
  nameRu: 'Брендинг',
  nameEn: 'Branding',
  taglineRu: 'Создаём уникальную визуальную идентичность, которая запоминается. Логотип, фирменный стиль, паттерны и брендбук.',
  taglineEn: 'We craft unique visual identities that are remembered. Logo, brand style, patterns and brand book.',
  overviewRu: 'Брендинг — это первое впечатление, которое остаётся навсегда. Мы разрабатываем визуальную идентичность, которая отражает ценности вашего бизнеса и выделяет вас среди конкурентов. Каждый элемент — от логотипа до типографики — создаётся с учётом всех носителей и контекстов использования.',
  overviewEn: 'Branding is the first impression that lasts forever. We develop visual identities that reflect your business values and set you apart from competitors. Every element — from logo to typography — is created with all media and usage contexts in mind.',
  tech: ['Adobe Illustrator', 'Figma', 'SVG', 'Brand Strategy', 'Typography', 'Color Theory'],
  timeRu: '1–2 недели',
  timeEn: '1–2 weeks',
  accentColor: 'hsl(320 80% 60% / 0.10)',
  process: [
    { titleRu: 'Бренд-стратегия', titleEn: 'Brand Strategy', descRu: 'Анализируем ценности, аудиторию и позиционирование. Формируем personality бренда.', descEn: 'We analyze values, audience and positioning. We form the brand personality.' },
    { titleRu: 'Концепции логотипа', titleEn: 'Logo Concepts', descRu: 'Разрабатываем 3–5 концепций логотипа. Презентуем, собираем обратную связь и дорабатываем.', descEn: 'We develop 3–5 logo concepts. Present, gather feedback and refine.' },
    { titleRu: 'Дизайн-система', titleEn: 'Design System', descRu: 'Цветовая палитра, типографика, иконки, паттерны и правила сочетания элементов.', descEn: 'Color palette, typography, icons, patterns and rules for combining elements.' },
    { titleRu: 'Носители', titleEn: 'Brand Materials', descRu: 'Применяем айдентику: визитки, бланки, соцсети, баннеры, мерч (по запросу).', descEn: 'We apply the identity: business cards, letterheads, social media, banners, merch (on request).' },
    { titleRu: 'Брендбук', titleEn: 'Brand Book', descRu: 'Документируем все правила использования бренда в удобном PDF/Figma-гайдлайне.', descEn: 'We document all brand usage rules in a convenient PDF/Figma guideline.' },
  ],
  faqs: [
    { qRu: 'Сколько вариантов логотипа я получу?', qEn: 'How many logo variants will I receive?', aRu: 'На этапе концепций — 3–5 вариантов. Финальный логотип с горизонтальным, вертикальным и монохромным вариантами.', aEn: 'During the concept phase — 3–5 variants. Final logo with horizontal, vertical and monochrome versions.' },
    { qRu: 'В каком формате вы передаёте исходники?', qEn: 'In what format do you transfer source files?', aRu: 'SVG, AI, PNG (x1, x2, x3), PDF. Все форматы для веба и печати.', aEn: 'SVG, AI, PNG (x1, x2, x3), PDF. All formats for web and print.' },
    { qRu: 'Входит ли в стоимость разработка сайта?', qEn: 'Does the price include website development?', aRu: 'Нет, брендинг и разработка — отдельные услуги. Мы можем предложить пакет.', aEn: 'No, branding and development are separate services. We can offer a package deal.' },
    { qRu: 'Что если мне не понравятся концепции?', qEn: 'What if I don\'t like the concepts?', aRu: 'В каждый тариф включены правки. Если нужно, разработаем дополнительные концепции за отдельную плату.', aEn: 'Every plan includes revisions. If needed, we\'ll develop additional concepts for an extra fee.' },
  ],
  pricing: [
    { labelRu: 'Лого', labelEn: 'Logo Only', price: 'от $400', featuresRu: ['3 концепции', 'Финальный логотип', 'SVG + PNG', 'Срок: 1 неделя'], featuresEn: ['3 concepts', 'Final logo', 'SVG + PNG', 'Timeline: 1 week'] },
    { labelRu: 'Айдентика', labelEn: 'Identity', price: 'от $900', featuresRu: ['5 концепций логотипа', 'Цвет + типографика', 'Базовые носители', 'Мини-гайдлайн', 'Срок: 2 недели'], featuresEn: ['5 logo concepts', 'Color + typography', 'Basic materials', 'Mini guideline', 'Timeline: 2 weeks'], highlighted: true },
    { labelRu: 'Брендбук', labelEn: 'Brand Book', price: 'от $1,800', featuresRu: ['Полная айдентика', 'Все носители', 'Полный брендбук', 'Соцсети', 'Поддержка 1 мес.'], featuresEn: ['Full identity', 'All materials', 'Complete brand book', 'Social media kit', '1-month support'] },
  ],
};

export function BrandingPage() {
  return (
    <>
      <Header />
      <ServicePageLayout data={data} />
      <Footer />
    </>
  );
}
