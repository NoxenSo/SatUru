import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Layout, Palette, Cpu } from 'lucide-react';
import { SaturnIcon } from './SaturnIcon';

const MotionDiv = motion.div;

const badges = [
  { labelRu: 'Веб-разработка', labelEn: 'Web Development', icon: Layout },
  { labelRu: 'UI/UX Дизайн',   labelEn: 'UI/UX Design',    icon: Palette },
  { labelRu: 'Автоматизация',  labelEn: 'Automation',      icon: Cpu },
];

export const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section
      className="relative min-h-[75dvh] md:min-h-[85dvh] flex flex-col justify-center overflow-hidden pt-[72px]"
      aria-label="Hero"
    >
      {/* ── Multi-layer background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
        {/* Vignette — darkens edges, focuses center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(240_12%_5%/0)_40%,hsl(240_12%_5%/0.7)_100%)] z-[2]" />

        {/* Primary orb — top-left purple */}
        <MotionDiv
          className="absolute -top-[18%] -left-[8%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(258 90% 66% / 0.18) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.07, 1], x: [0, 28, 0], y: [0, 18, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary orb — bottom-right blue */}
        <MotionDiv
          className="absolute -bottom-[22%] -right-[8%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 58% / 0.14) 0%, transparent 70%)' }}
          animate={{ scale: [1, 0.95, 1], x: [0, -24, 0], y: [0, -16, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Center accent glow — very soft */}
        <MotionDiv
          className="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(258 90% 66% / 0.06) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle orbital ring — decorative */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05]"
          width="900" height="900" viewBox="0 0 900 900" fill="none"
        >
          <ellipse cx="450" cy="450" rx="380" ry="380" stroke="hsl(258 90% 66%)" strokeWidth="1" />
          <ellipse cx="450" cy="450" rx="280" ry="280" stroke="hsl(217 91% 60%)" strokeWidth="0.5" />
          <ellipse cx="450" cy="450" rx="180" ry="180" stroke="hsl(258 90% 66%)" strokeWidth="0.5" />
        </svg>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(hsl(258 90% 66%) 1px, transparent 1px), linear-gradient(90deg, hsl(258 90% 66%) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full py-8 md:py-14 lg:py-18">

        {/* Eyebrow badge */}
        <FadeIn>
          <div className="hero-badge inline-flex items-center gap-2 mb-4 md:mb-6">
            <span className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.22em] text-primary/80 uppercase px-4 py-2 rounded-full border border-primary/20 bg-primary/5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/8 hover:shadow-sm hover:shadow-primary/10">
              <span className="relative flex items-center justify-center w-[18px] h-[18px]">
                <SaturnIcon size="18px" className="hero-saturn-spin" />
              </span>
              Digital Studio
            </span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.08}>
          <h1 className="font-heading text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] max-w-4xl mb-3 md:mb-5">
            <span className="text-foreground">{t.heroTitle.split(' ').slice(0, 3).join(' ')}</span>
            <br />
            <span className="text-gradient-vivid">{t.heroTitle.split(' ').slice(3).join(' ')}</span>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.18}>
          <p className="text-[clamp(0.85rem,1.4vw,1rem)] text-muted-foreground max-w-2xl mb-4 md:mb-8 leading-[1.75] font-light">
            {t.heroSubtitle}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.28}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-[18px] bg-primary text-primary-foreground font-semibold text-[14px] tracking-wide rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/45 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none overflow-hidden cta-glow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{t.btnStart}</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#works"
              className="group inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 text-muted-foreground/70 hover:text-foreground text-[13px] font-medium rounded-full border border-border/30 hover:border-border/60 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.btnWorks}
            </motion.a>
          </div>
        </FadeIn>

        {/* Premium badges */}
        <FadeIn delay={0.38}>
          <div className="flex flex-wrap gap-2.5">
            {badges.map((b, i) => {
              const Icon = b.icon;
              const label = language === 'ru' ? b.labelRu : b.labelEn;
              return (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/60 px-3 py-1.5 rounded-full border border-border/20 bg-background/40"
                >
                  <Icon size={12} className="text-primary/50" />
                  {label}
                </motion.span>
              );
            })}
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.48}>
          <HeroStats />
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5" aria-hidden>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </div>
    </section>
  );
};

const HeroStats = () => {
  const { language } = useLanguage();
  const stats = [
    { value: '40+', ru: 'Проектов', en: 'Projects' },
    { value: '3+',  ru: 'Года опыта', en: 'Years experience' },
    { value: '24h', ru: 'Время ответа', en: 'Avg. response' },
  ];
  return (
    <div className="mt-6 md:mt-10 flex flex-wrap gap-5 md:gap-12">
      {stats.map((s) => (
        <div key={s.value} className="flex flex-col gap-0.5">
          <span className="font-heading text-[1.3rem] md:text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-gradient">
            {s.value}
          </span>
          <span className="text-[11px] md:text-[12px] text-muted-foreground/60 tracking-[0.05em]">
            {language === 'ru' ? s.ru : s.en}
          </span>
        </div>
      ))}
    </div>
  );
};

