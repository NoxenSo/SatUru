import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { FileCode2, MonitorSmartphone, Database, Palette } from 'lucide-react';

export const Technology = () => {
  const { t, language } = useLanguage();

  const items = [
    {
      icon: FileCode2,
      title: t.techTypeScriptTitle,
      desc: t.techTypeScriptDesc,
      tags: ['TypeScript', 'ESLint', 'Tests'],
    },
    {
      icon: MonitorSmartphone,
      title: t.techFrameworksTitle,
      desc: t.techFrameworksDesc,
      tags: ['React', 'Vite', 'Tailwind'],
    },
    {
      icon: Database,
      title: t.techDatabaseTitle,
      desc: t.techDatabaseDesc,
      tags: ['PostgreSQL', 'Drizzle', 'Supabase'],
    },
    {
      icon: Palette,
      title: t.techDesignTitle,
      desc: t.techDesignDesc,
      tags: ['Figma', 'SVG', 'Motion'],
    },
  ];

  return (
    <section id="technology" className="py-36 md:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20 md:mb-28 max-w-3xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Наш стек' : 'Our stack'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em] text-foreground">
              {t.techTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.08}>
                <motion.div
                  className="group relative h-full rounded-2xl border border-border/40 bg-card/30 p-7 md:p-8 transition-all duration-400 overflow-hidden"
                  whileHover={{
                    y: -4,
                    borderColor: 'hsl(217 91% 60% / 0.4)',
                    boxShadow: '0 16px 48px -12px hsl(217 91% 60% / 0.14)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={20} className="text-secondary/70 group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <h3 className="font-display text-[1.2rem] font-bold text-foreground tracking-[-0.01em] leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[13.5px] text-muted-foreground leading-[1.8] mb-6 flex-1">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border/50 bg-muted/30 text-muted-foreground/70 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
