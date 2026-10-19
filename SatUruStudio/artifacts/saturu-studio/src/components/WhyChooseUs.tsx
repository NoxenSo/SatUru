import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, UserCheck, FileCheck, HeartHandshake } from 'lucide-react';

export const WhyChooseUs = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: Cpu,
      title: t.whyChooseTechTitle,
      desc: t.whyChooseTechDesc,
    },
    {
      icon: UserCheck,
      title: t.whyChooseApproachTitle,
      desc: t.whyChooseApproachDesc,
    },
    {
      icon: FileCheck,
      title: t.whyChooseWorkflowTitle,
      desc: t.whyChooseWorkflowDesc,
    },
    {
      icon: HeartHandshake,
      title: t.whyChooseSupportTitle,
      desc: t.whyChooseSupportDesc,
    },
  ];

  return (
    <section id="why-choose" className="py-36 md:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20 md:mb-28 max-w-3xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Почему мы' : 'Why us'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em] text-foreground">
              {t.whyChooseTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <FadeIn key={benefit.title} delay={index * 0.08}>
                <motion.div
                  className="group relative h-full rounded-2xl border border-border/40 bg-card/30 p-7 md:p-8 transition-all duration-400"
                  whileHover={{
                    y: -4,
                    borderColor: 'hsl(258 90% 66% / 0.4)',
                    boxShadow: '0 16px 48px -12px hsl(258 90% 66% / 0.14)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Top accent line */}
                  <div className="h-px w-full mb-6 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon size={20} className="text-primary/70 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.1rem] font-bold text-foreground tracking-[-0.01em] mb-2 leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-[13px] text-muted-foreground leading-[1.75]">
                        {benefit.desc}
                      </p>
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
