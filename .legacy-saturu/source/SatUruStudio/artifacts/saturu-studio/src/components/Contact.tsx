import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Send } from 'lucide-react';
import { SaturnIcon } from './SaturnIcon';

export const Contact = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="contact"
      className="py-40 md:py-56 px-6 md:px-10 border-t border-border/30 relative z-10 overflow-hidden"
      aria-label="Contact"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[70vw] h-[50vw] max-w-[900px] bg-primary/6 dark:bg-primary/5 rounded-full blur-[140px]" />
      </div>

      {/* Decorative orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] dark:opacity-[0.06]" aria-hidden>
        <svg width="800" height="500" viewBox="0 0 800 500" fill="none">
          <ellipse cx="400" cy="250" rx="360" ry="220" stroke="hsl(258 90% 66%)" strokeWidth="1" />
          <ellipse cx="400" cy="250" rx="240" ry="140" stroke="hsl(217 91% 60%)" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Saturn decoration */}
        <FadeIn>
          <div className="flex justify-center mb-8">
            <SaturnIcon size="48px" />
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.08}>
          <h2 className="font-heading text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-8">
            <span className="text-gradient">{t.contactTitle}</span>
          </h2>
        </FadeIn>

        {/* Sub-text */}
        <FadeIn delay={0.16}>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground mb-16 md:mb-20 leading-[1.75] font-light max-w-xl mx-auto">
            {t.contactText}
          </p>
        </FadeIn>

        {/* CTA buttons */}
        <FadeIn delay={0.24}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:hello@saturu.studio"
              className="group inline-flex items-center gap-3 w-full sm:w-auto justify-center px-10 py-4.5 bg-foreground text-background font-semibold text-[14px] tracking-wide rounded-full hover:bg-foreground/90 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={15} className="opacity-70" />
              {language === 'ru' ? 'Email' : 'Email'}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>

            <motion.a
              href="#works"
              className="group inline-flex items-center gap-3 w-full sm:w-auto justify-center px-10 py-4.5 bg-transparent border border-border/60 hover:border-primary/50 text-foreground/80 hover:text-foreground font-medium text-[14px] tracking-wide rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'ru' ? 'Смотреть портфолио' : 'View portfolio'}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          </div>
        </FadeIn>

        {/* Response time note */}
        <FadeIn delay={0.34}>
          <p className="mt-10 text-[12px] text-muted-foreground/40 tracking-[0.08em]">
            {language === 'ru' ? '⚡ Обычно отвечаем в течение 24 часов' : '⚡ Usually respond within 24 hours'}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
