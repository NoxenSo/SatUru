import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { SaturnIcon } from './SaturnIcon';

export const About = () => {
  const { t, language } = useLanguage();

  const pillars = [
    {
      ru: 'Качество',
      en: 'Quality',
      ru2: 'Каждый пиксель имеет значение',
      en2: 'Every pixel matters',
    },
    {
      ru: 'Скорость',
      en: 'Speed',
      ru2: 'Быстрая поставка, без жертв',
      en2: 'Fast delivery, no compromises',
    },
    {
      ru: 'Точность',
      en: 'Precision',
      ru2: 'Инженерия на уровне мастерства',
      en2: 'Engineering at craft level',
    },
  ];

  return (
    <section className="py-36 md:py-52 px-6 md:px-10 relative z-10 border-t border-border/30 overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vw] pointer-events-none" aria-hidden>
        <div className="w-full h-full rounded-full bg-primary/5 dark:bg-primary/4 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Main quote */}
        <FadeIn>
          <blockquote className="font-heading text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.25] font-bold text-foreground tracking-[-0.02em] mb-20 md:mb-28">
            <span className="text-primary/30 text-[1.4em] leading-none align-top mr-2">&ldquo;</span>
            {t.aboutText}
            <span className="text-primary/30 text-[1.4em] leading-none align-top ml-2">&rdquo;</span>
          </blockquote>
        </FadeIn>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <FadeIn key={p.en} delay={i * 0.1}>
              <motion.div
                className="group relative p-7 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/30 transition-all duration-400"
                whileHover={{ y: -4, boxShadow: '0 16px 48px -12px hsl(258 90% 66% / 0.14)' }}
              >
                <div className="absolute top-5 right-5 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                  <SaturnIcon size="20px" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary/50 mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-bold tracking-[-0.01em] mb-2">
                  {language === 'ru' ? p.ru : p.en}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {language === 'ru' ? p.ru2 : p.en2}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
