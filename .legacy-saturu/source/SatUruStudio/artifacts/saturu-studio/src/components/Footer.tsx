import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SaturnIcon } from './SaturnIcon';
import { useLocation } from 'wouter';

export const Footer = () => {
  const { t, language } = useLanguage();
  const [, navigate] = useLocation();

  const serviceLinks = [
    { slug: 'websites',     ru: 'Веб-сайты',   en: 'Websites' },
    { slug: 'ui-ux',        ru: 'UI/UX Дизайн', en: 'UI/UX Design' },
    { slug: 'branding',     ru: 'Брендинг',     en: 'Branding' },
    { slug: 'landing-pages', ru: 'Landing Pages', en: 'Landing Pages' },
    { slug: 'game-projects', ru: 'Игровые проекты', en: 'Game Projects' },
  ];

  const navLinks = [
    { href: '#services', ru: 'Услуги',   en: 'Services' },
    { href: '#works',    ru: 'Работы',   en: 'Works' },
    { href: '#process',  ru: 'Процесс',  en: 'Process' },
    { href: '#contact',  ru: 'Контакты', en: 'Contact' },
  ];

  const legalLinks = [
    { href: '/privacy', ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
    { href: '/terms',  ru: 'Условия использования',      en: 'Terms of Service' },
    { href: '/cookies', ru: 'Политика cookies',          en: 'Cookie Policy' },
  ];

  return (
    <footer className="border-t border-border/30 relative z-10 bg-background" role="contentinfo">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <a
              href="/"
              className="font-display font-bold text-[1.15rem] tracking-[-0.03em] flex items-center gap-0 w-fit"
              aria-label="SatUru Studio"
            >
              Sat<span className="text-gradient">Uru</span>
              <span className="text-muted-foreground/50">&nbsp;St</span>
              <SaturnIcon size="1.05em" />
              <span className="text-muted-foreground/50">dio</span>
            </a>
            <p className="text-[13px] text-muted-foreground/70 leading-[1.75] max-w-[280px]">
              {language === 'ru'
                ? 'Цифровая студия, создающая сайты и продукты на стыке ремесла и инженерии.'
                : 'A digital studio crafting websites and products at the intersection of craft and engineering.'}
            </p>
            <a
              href="mailto:hello@saturu.studio"
              className="mt-1 text-[12px] font-medium px-3.5 py-1.5 rounded-full border border-border/50 text-muted-foreground/60 hover:text-foreground hover:border-border transition-all duration-200 w-fit"
            >
              {language === 'ru' ? 'Email' : 'Email'}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] text-muted-foreground/40 uppercase mb-5">
              {language === 'ru' ? 'Навигация' : 'Navigation'}
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                >
                  {language === 'ru' ? link.ru : link.en}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] text-muted-foreground/40 uppercase mb-5">
              {language === 'ru' ? 'Услуги' : 'Services'}
            </p>
            <nav className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <button
                  key={link.slug}
                  onClick={() => navigate(`/services/${link.slug}`)}
                  className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 text-left w-fit"
                >
                  {language === 'ru' ? link.ru : link.en}
                </button>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] text-muted-foreground/40 uppercase mb-5">
              {language === 'ru' ? 'Юридическая информация' : 'Legal'}
            </p>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                >
                  {language === 'ru' ? link.ru : link.en}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-muted-foreground/40 tracking-wide">{t.footer}</span>
          <span className="text-[12px] text-muted-foreground/30 tracking-wide">
            {language === 'ru' ? 'Сделано с ♥ на Replit' : 'Made with ♥ on Replit'}
          </span>
        </div>
      </div>
    </footer>
  );
};
