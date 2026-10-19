import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SaturnIcon } from './SaturnIcon';

const MotionDiv = motion.div;

export const FinalCTA = () => {
  const { t, language } = useLanguage();

  return (
    <section id="final-cta" className="py-36 md:py-48 px-6 md:px-10 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <MotionDiv
            className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-secondary/5 to-transparent p-10 md:p-16 lg:p-20 overflow-hidden"
            whileHover={{ boxShadow: '0 0 64px -16px hsl(258 90% 66% / 0.25)' }}
            transition={{ duration: 0.4 }}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none" aria-hidden>
              <SaturnIcon size="100%" />
            </div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
                {language === 'ru' ? 'Начнем' : 'Let’s start'}
              </p>
              <h2 className="font-heading text-[clamp(2.6rem,7vw,5rem)] font-bold tracking-[-0.03em] text-foreground mb-4">
                {t.finalCtaTitle}
              </h2>
              <p className="text-[clamp(1rem,2.2vw,1.3rem)] text-muted-foreground max-w-2xl mb-12 leading-[1.8]">
                {t.finalCtaSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.a
                  href="#contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold text-[14px] rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.finalCtaStart}
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
                <motion.a
                  href="#contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-border/60 hover:border-foreground/40 text-foreground/80 hover:text-foreground font-medium text-[14px] rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={15} />
                  {t.finalCtaContact}
                </motion.a>
              </div>
            </div>
          </MotionDiv>
        </FadeIn>
      </div>
    </section>
  );
};
