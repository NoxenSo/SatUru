import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { OrderForm } from '@/components/OrderForm';
import { ArrowLeft, Clock, DollarSign, Check, ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

interface Pricing {
  label: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServicePageData {
  slug: string;
  icon: React.ElementType;
  nameRu: string;
  nameEn: string;
  taglineRu: string;
  taglineEn: string;
  overviewRu: string;
  overviewEn: string;
  tech: string[];
  timeRu: string;
  timeEn: string;
  accentColor: string;
  process: { titleRu: string; titleEn: string; descRu: string; descEn: string }[];
  faqs: { qRu: string; qEn: string; aRu: string; aEn: string }[];
  pricing: { labelRu: string; labelEn: string; price: string; featuresRu: string[]; featuresEn: string[]; highlighted?: boolean }[];
}

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[14px] text-muted-foreground leading-[1.8]">{a}</p>
      </motion.div>
    </div>
  );
}

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  const Icon = data.icon;

  const t = (ru: string, en: string) => (language === 'ru' ? ru : en);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-0">
        <button
          onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          {t('К услугам', 'Back to Services')}
        </button>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-[30%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full"
            style={{ background: `radial-gradient(circle, ${data.accentColor} 0%, transparent 70%)` }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28 relative">
          <FadeIn>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${data.accentColor.replace('0.12', '0.15')}` }}>
                <Icon size={22} className="text-primary" />
              </div>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {t(data.timeRu, data.timeEn)}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="font-heading text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6">
              {t(data.nameRu, data.nameEn)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground leading-[1.75] max-w-2xl">
              {t(data.taglineRu, data.taglineEn)}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28 space-y-24 md:space-y-32">

        {/* Overview */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <p className="text-[11px] font-mono tracking-[0.28em] text-primary/60 uppercase mb-6">
                {t('Обзор', 'Overview')}
              </p>
              <p className="text-[17px] text-muted-foreground leading-[1.85]">
                {t(data.overviewRu, data.overviewEn)}
              </p>
            </div>
            <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-2 shrink-0">
              {data.tech.map((tech) => (
                <span key={tech}
                  className="text-[12px] font-mono px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-muted-foreground whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Process */}
        <div>
          <FadeIn>
            <p className="text-[11px] font-mono tracking-[0.28em] text-primary/60 uppercase mb-12">
              {t('Процесс', 'Process')}
            </p>
          </FadeIn>
          <div className="space-y-6">
            {data.process.map((step, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start group">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/30 pt-1 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="pb-6 border-b border-border/30 last:border-b-0">
                    <h3 className="font-display text-[17px] font-bold mb-2 text-foreground">
                      {t(step.titleRu, step.titleEn)}
                    </h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.75]">
                      {t(step.descRu, step.descEn)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <FadeIn>
            <p className="text-[11px] font-mono tracking-[0.28em] text-primary/60 uppercase mb-12">
              {t('Стоимость', 'Pricing')}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.pricing.map((tier, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className={[
                    'relative rounded-2xl p-7 border flex flex-col gap-5 h-full',
                    tier.highlighted
                      ? 'border-primary/40 bg-primary/5 shadow-glow-card'
                      : 'border-border/40 bg-card/30',
                  ].join(' ')}
                  whileHover={{ y: -3 }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground tracking-wide">
                        {t('Популярный', 'Popular')}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-[13px] font-medium text-muted-foreground mb-2">
                      {t(tier.labelRu, tier.labelEn)}
                    </p>
                    <p className="font-heading text-3xl font-bold tracking-[-0.02em] text-foreground flex items-baseline gap-1">
                      {tier.price}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {(language === 'ru' ? tier.featuresRu : tier.featuresEn).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                        <Check size={14} className="text-primary/70 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <FadeIn>
            <p className="text-[11px] font-mono tracking-[0.28em] text-primary/60 uppercase mb-12">
              {t('Частые вопросы', 'FAQ')}
            </p>
          </FadeIn>
          <div className="rounded-2xl border border-border/40 bg-card/30 px-6 md:px-8 divide-y divide-transparent">
            {data.faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <FAQItem q={t(faq.qRu, faq.qEn)} a={t(faq.aRu, faq.aEn)} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Order form */}
        <div>
          <FadeIn>
            <p className="text-[11px] font-mono tracking-[0.28em] text-primary/60 uppercase mb-12">
              {t('Оставить заявку', 'Place an Order')}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <OrderForm
              serviceName={t(data.nameRu, data.nameEn)}
              serviceSlug={data.slug}
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
