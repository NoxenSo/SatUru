import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const MotionA = motion.a;

export const Works = () => {
  const { t, language } = useLanguage();

  const works = [
    {
      name: t.work1Name,
      desc: t.work1Desc,
      tag: t.work1Tag,
      year: '2024',
      category: language === 'ru' ? 'Игровой UI / Веб' : 'Game UI / Web',
      tech: ['React', 'TypeScript', 'ThreeJS', 'Figma'],
      tags: ['UI System', 'Game Interface', 'Dark Mode'],
      summary: language === 'ru'
        ? 'Комплексная дизайн-система для масштабного игрового проекта. Включает HUD, меню, инвентарь и веб-портал.'
        : 'A comprehensive design system for a large-scale game project. Includes HUD, menus, inventory and web portal.',
      gradient: 'from-violet-600/20 via-purple-600/10 to-transparent',
      accentColor: 'hsl(258 90% 66%)',
    },
    {
      name: t.work2Name,
      desc: t.work2Desc,
      tag: t.work2Tag,
      year: '2024',
      category: language === 'ru' ? 'Landing Page' : 'Landing Page',
      tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Vercel'],
      tags: ['Conversion', 'Typography', 'Animation'],
      summary: language === 'ru'
        ? 'Высококонверсионный лендинг для финтех-стартапа с фокусом на типографику и микроанимации.'
        : 'High-conversion landing page for a fintech startup focused on typography and micro-animations.',
      gradient: 'from-blue-600/20 via-cyan-600/10 to-transparent',
      accentColor: 'hsl(217 91% 60%)',
    },
    {
      name: t.work3Name,
      desc: t.work3Desc,
      tag: t.work3Tag,
      year: '2025',
      category: language === 'ru' ? 'Веб-приложение' : 'Web App',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Recharts'],
      tags: ['SaaS', 'Dashboard', 'Real-time'],
      summary: language === 'ru'
        ? 'Полнофункциональная система учёта времени с аналитикой, командными рабочими пространствами и интеграциями с Jira и GitHub.'
        : 'Full-featured time-tracking system with analytics, team workspaces and integrations with Jira and GitHub.',
      gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
      accentColor: 'hsl(160 84% 39%)',
    },
  ];

  return (
    <section id="works" className="py-36 md:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-20 md:mb-28">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Избранные работы' : 'Selected work'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em]">
              {t.worksTitle}
            </h2>
          </div>
        </FadeIn>

        {/* Case study cards */}
        <div className="flex flex-col gap-6">
          {works.map((work, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <MotionA
                href="#contact"
                className="group relative block rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                whileHover="hovered"
                initial="idle"
                aria-label={`${work.name} — ${work.tag}`}
              >
                {/* Animated gradient glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${work.gradient} pointer-events-none`}
                  variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
                  transition={{ duration: 0.5 }}
                />

                {/* Left accent line */}
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
                  style={{ background: `linear-gradient(to bottom, transparent, ${work.accentColor}, transparent)`, originY: 0.5 }}
                  variants={{ idle: { opacity: 0, scaleY: 0.2 }, hovered: { opacity: 1, scaleY: 1 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative p-8 md:p-12 lg:p-14">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start">
                    {/* Left: content */}
                    <div>
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 mb-8">
                        <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/40">
                          {String(index + 1).padStart(2, '0')} / {work.year}
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full border border-border/50 text-muted-foreground/60 group-hover:border-primary/50 group-hover:text-primary/80 transition-all duration-300">
                          {work.category}
                        </span>
                      </div>

                      {/* Project name */}
                      <h3 className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.03em] mb-5 text-foreground group-hover:text-primary transition-colors duration-300">
                        {work.name}
                      </h3>

                      {/* Summary */}
                      <p className="text-muted-foreground text-[15px] leading-[1.8] max-w-2xl mb-8">
                        {work.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {work.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-primary/5 text-primary/70 border border-primary/15 group-hover:border-primary/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:pt-2">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
                        <span className="tracking-wide hidden lg:block">{t.viewProject}</span>
                        <motion.div
                          variants={{ idle: { x: 0, y: 0 }, hovered: { x: 4, y: -4 } }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="w-10 h-10 rounded-full border border-border/50 group-hover:border-primary/50 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
                        >
                          <ArrowUpRight size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionA>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
