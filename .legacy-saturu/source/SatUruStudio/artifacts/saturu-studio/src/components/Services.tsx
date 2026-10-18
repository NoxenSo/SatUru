import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Layers, Palette, Layout, Gamepad2, Clock, ArrowRight, Check } from 'lucide-react';
import { ServiceRequestDialog } from './ServiceRequestDialog';

const MotionDiv = motion.div;

export const Services = () => {
  const { t, language } = useLanguage();
  const [dialogState, setDialogState] = useState<{ open: boolean; name: string; slug: string }>({
    open: false,
    name: '',
    slug: '',
  });

  const openDialog = (name: string, slug: string) => {
    setDialogState({ open: true, name, slug });
  };

  const services = [
    {
      id: '01',
      slug: 'websites',
      icon: Globe,
      name: t.service1,
      descRu: 'Создаём высококачественные веб-сайты с нуля — от архитектуры до деплоя. Адаптивный дизайн и высокая производительность.',
      descEn: 'We craft high-quality websites from scratch — architecture to deployment. Responsive design and fast performance.',
      includedRu: ['Адаптивный дизайн для всех устройств', 'SEO-оптимизация и скорость', 'Деплой и настройка хостинга', 'Техподдержка после запуска'],
      includedEn: ['Responsive design for all devices', 'SEO optimization & speed', 'Deployment & hosting setup', 'Post-launch technical support'],
      tech: ['React', 'Vite', 'TailwindCSS', 'Node.js'],
      timeRu: '2–4 недели',
      timeEn: '2–4 weeks',
      accentColor: 'from-violet-500/10 to-blue-500/10',
      glowColor: 'hsl(258 90% 66% / 0.18)',
      borderHover: 'hover:border-violet-500/40',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
    },
    {
      id: '02',
      slug: 'ui-ux',
      icon: Layers,
      name: t.service2,
      descRu: 'Проектируем интерфейсы, которые работают. Исследование пользователей, wireframes, интерактивные прототипы.',
      descEn: 'We design interfaces that work. User research, wireframes, interactive prototypes, design systems.',
      includedRu: ['UX-исследование и анализ', 'Wireframes и прототипы', 'UI-дизайн в Figma', 'Дизайн-система и гайдлайны'],
      includedEn: ['UX research & analysis', 'Wireframes & prototypes', 'UI design in Figma', 'Design system & guidelines'],
      tech: ['Figma', 'Framer', 'Prototyping', 'Design Systems'],
      timeRu: '1–3 недели',
      timeEn: '1–3 weeks',
      accentColor: 'from-blue-500/10 to-cyan-500/10',
      glowColor: 'hsl(217 91% 62% / 0.18)',
      borderHover: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      id: '03',
      slug: 'branding',
      icon: Palette,
      name: t.service3,
      descRu: 'Создаём уникальную визуальную идентичность: логотип, фирменный стиль, гайдлайны и брендбук.',
      descEn: 'We craft unique visual identities: logo, brand style, guidelines, patterns and brand book.',
      includedRu: ['Логотип и фирменный стиль', 'Цветовая палитра и типографика', 'Паттерны и элементы айдентики', 'Брендбук в PDF'],
      includedEn: ['Logo & visual identity', 'Color palette & typography', 'Patterns & brand elements', 'Brand book in PDF'],
      tech: ['Illustrator', 'Figma', 'SVG', 'Brand Strategy'],
      timeRu: '1–2 недели',
      timeEn: '1–2 weeks',
      accentColor: 'from-pink-500/10 to-violet-500/10',
      glowColor: 'hsl(300 80% 60% / 0.16)',
      borderHover: 'hover:border-pink-500/40',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-400',
    },
    {
      id: '04',
      slug: 'landing-pages',
      icon: Layout,
      name: t.service4,
      descRu: 'Конверсионные лендинги с продуманной структурой, убедительным копирайтингом и максимальной скоростью загрузки.',
      descEn: 'High-converting landing pages with thoughtful structure, compelling copy and maximum loading speed.',
      includedRu: ['Продуктовая структура и копирайтинг', 'Анимации и интерактив', 'A/B-тестирование', 'Интеграция аналитики'],
      includedEn: ['Product structure & copywriting', 'Animations & interactivity', 'A/B testing ready', 'Analytics integration'],
      tech: ['React', 'Vite', 'TailwindCSS', 'Analytics'],
      timeRu: '3–7 дней',
      timeEn: '3–7 days',
      accentColor: 'from-emerald-500/10 to-blue-500/10',
      glowColor: 'hsl(160 80% 45% / 0.16)',
      borderHover: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      id: '05',
      slug: 'game-projects',
      icon: Gamepad2,
      name: t.service5,
      descRu: 'Разработка игровых проектов, плагинов для Minecraft, веб-интерфейсов для серверов и игровых платформ.',
      descEn: 'Game project development, Minecraft plugins, web interfaces for servers and gaming platforms.',
      includedRu: ['Плагины и скрипты для Minecraft', 'Веб-интерфейс для сервера', 'Игровой UI и дизайн', 'Документация и поддержка'],
      includedEn: ['Minecraft plugins & scripts', 'Server web interface', 'Game UI & design', 'Documentation & support'],
      tech: ['Java', 'Kotlin', 'Skript', 'Game UI'],
      timeRu: '2–6 недель',
      timeEn: '2–6 weeks',
      accentColor: 'from-yellow-500/10 to-orange-500/10',
      glowColor: 'hsl(45 95% 55% / 0.16)',
      borderHover: 'hover:border-yellow-500/40',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-36 lg:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12 md:mb-20 max-w-3xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Что мы делаем' : 'What we do'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em] text-foreground">
              {t.servicesTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const desc = language === 'ru' ? service.descRu : service.descEn;
            const time = language === 'ru' ? service.timeRu : service.timeEn;
            const included = language === 'ru' ? service.includedRu : service.includedEn;

            return (
              <FadeIn key={service.id} delay={index * 0.07}>
                <MotionDiv
                  className={[
                    'group relative flex flex-col h-full rounded-2xl',
                    'border border-border/40 bg-card/50',
                    'transition-all duration-400 ease-out',
                    service.borderHover,
                    'hover:-translate-y-1.5',
                  ].join(' ')}
                  whileHover={{ boxShadow: `0 20px 60px -16px ${service.glowColor}` }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`}
                  />
                  <div className="h-px w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                  <div className="relative flex flex-col h-full">
                    <div className="p-6 md:p-7 pb-4 flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-11 h-11 rounded-2xl ${service.iconBg} flex items-center justify-center shrink-0 p-2.5`}>
                          <Icon size={22} className={service.iconColor} />
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground/25 mt-1">
                          {service.id}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-2">
                          {service.name}
                        </h3>
                        <p className="text-[13px] text-muted-foreground leading-[1.8]">
                          {desc}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-mono tracking-[0.22em] text-primary/50 uppercase">
                          {language === 'ru' ? 'Включено' : 'Included'}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {included.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[12.5px] text-muted-foreground">
                              <Check size={12} className="text-primary/60 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {service.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-border/50 bg-muted/30 text-muted-foreground/70 tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto p-6 md:p-7 pt-0 flex flex-col gap-4">
                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                          <Clock size={12} className="text-muted-foreground/40" />
                          {time}
                        </div>
                      </div>

                      <button
                        onClick={() => openDialog(service.name, service.slug)}
                        className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/8 border border-primary/20 text-primary text-[13px] font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                      >
                        {t.serviceCta}
                        <ArrowRight size={13} className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </MotionDiv>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <ServiceRequestDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((s) => ({ ...s, open }))}
        serviceName={dialogState.name}
        serviceSlug={dialogState.slug}
      />
    </section>
  );
};
