import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { Lightbulb, ClipboardList, Pencil, Code2, TestTube2, Rocket } from 'lucide-react';

const ICONS = [Lightbulb, ClipboardList, Pencil, Code2, TestTube2, Rocket];

export const Process = () => {
  const { t, language } = useLanguage();

  const steps = [
    { title: t.process1Title, desc: t.process1Desc },
    { title: t.process2Title, desc: t.process2Desc },
    { title: t.process3Title, desc: t.process3Desc },
    { title: t.process4Title, desc: t.process4Desc },
    { title: t.process5Title, desc: t.process5Desc },
    { title: t.process6Title, desc: t.process6Desc },
  ];

  return (
    <section id="process" className="py-36 md:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20 md:mb-28 max-w-3xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Как мы работаем' : 'How we work'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em]">
              {t.processTitle}
            </h2>
          </div>
        </FadeIn>

        {/* Steps — 2 cols mobile, 3 cols tablet, 6 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {steps.map((step, index) => {
            const Icon = ICONS[index];
            return (
              <FadeIn key={index} delay={index * 0.08}>
                <motion.div
                  className="group relative flex flex-col h-full rounded-2xl border border-border/40 bg-card/30 p-6 md:p-7 transition-all duration-400"
                  whileHover={{ y: -4, borderColor: 'hsl(258 90% 66% / 0.4)', boxShadow: '0 16px 48px -12px hsl(258 90% 66% / 0.14)' }}
                >
                  {/* Connector line on desktop */}
                  <div className="hidden xl:block absolute top-8 -right-2 w-4 h-px bg-gradient-to-r from-border/50 to-transparent" />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary/15 flex items-center justify-center mb-4 transition-colors duration-300 shrink-0">
                    <Icon size={18} className="text-primary/70 group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Step title */}
                  <span className="font-display text-[14px] font-bold text-foreground tracking-[-0.01em] mb-2 leading-tight">
                    {step.title}
                  </span>

                  {/* Description */}
                  <p className="text-[12.5px] text-muted-foreground leading-[1.75] flex-1">
                    {step.desc}
                  </p>

                  {/* Watermark number */}
                  <div className="mt-5 font-heading text-[2.8rem] font-bold leading-none select-none text-border/30 group-hover:text-primary/10 transition-colors duration-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
