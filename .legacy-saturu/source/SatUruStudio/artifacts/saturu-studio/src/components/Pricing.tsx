import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { ServiceRequestDialog } from './ServiceRequestDialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MotionDiv = motion.div;

export const Pricing = () => {
  const { t, language } = useLanguage();
  const [active, setActive] = useState('professional');
  const [dialog, setDialog] = useState<{ open: boolean; name: string; slug: string }>({
    open: false,
    name: '',
    slug: '',
  });

  const openRequest = (name: string, slug: string) => setDialog({ open: true, name, slug });

  const packages = [
    {
      key: 'starter',
      icon: Zap,
      badge: language === 'ru' ? 'Быстрый старт' : 'Quick start',
      accent: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      gradient: 'from-blue-500/10 to-violet-500/10',
      borderHover: 'hover:border-blue-500/40',
      glow: 'hsl(217 91% 62% / 0.18)',
    },
    {
      key: 'professional',
      icon: Crown,
      badge: language === 'ru' ? 'Популярный' : 'Popular',
      accent: 'text-violet-400',
      iconBg: 'bg-violet-500/15',
      iconColor: 'text-violet-400',
      gradient: 'from-violet-500/10 to-fuchsia-500/10',
      borderHover: 'hover:border-violet-500/50',
      glow: 'hsl(258 90% 66% / 0.22)',
      featured: true,
    },
    {
      key: 'master',
      icon: Rocket,
      badge: language === 'ru' ? 'Максимум' : 'Maximum',
      accent: 'text-amber-400',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      gradient: 'from-amber-500/10 to-orange-500/10',
      borderHover: 'hover:border-amber-500/40',
      glow: 'hsl(35 95% 55% / 0.18)',
    },
  ];

  const meta: Record<string, { title: string; desc: string; price: string; period: string; services: string[]; benefits: string[]; cta: string }> = {
    starter: {
      title: t.pricingStarter,
      desc: t.pricingStarterDescription,
      price: t.pricingStarterPrice,
      period: t.pricingStarterPeriod,
      services: t.pricingStarterServices,
      benefits: t.pricingStarterBenefits,
      cta: t.pricingCta,
    },
    professional: {
      title: t.pricingProfessional,
      desc: t.pricingProfessionalDescription,
      price: t.pricingProfessionalPrice,
      period: t.pricingProfessionalPeriod,
      services: t.pricingProfessionalServices,
      benefits: t.pricingProfessionalBenefits,
      cta: t.pricingCta,
    },
    master: {
      title: t.pricingMaster,
      desc: t.pricingMasterDescription,
      price: t.pricingMasterPrice,
      period: t.pricingMasterPeriod,
      services: t.pricingMasterServices,
      benefits: t.pricingMasterBenefits,
      cta: t.pricingMasterCta,
    },
  };

  return (
    <section id="pricing" className="py-24 md:py-36 lg:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12 md:mb-20 max-w-3xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Пакеты и цены' : 'Packages & pricing'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em] text-foreground">
              {t.pricingTitle}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Tabs value={active} onValueChange={setActive} className="w-full">
            <TabsList className="w-full h-auto flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 rounded-2xl bg-card/50 border border-border/40 mb-8 md:mb-12">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                const data = meta[pkg.key];
                const isActive = active === pkg.key;
                return (
                  <TabsTrigger
                    key={pkg.key}
                    value={pkg.key}
                    className={[
                      'flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-[13px] font-semibold transition-all duration-200',
                      'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20',
                      'data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground',
                    ].join(' ')}
                  >
                    <Icon size={16} className={isActive ? 'text-primary-foreground' : pkg.iconColor} />
                    <span>{data.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const data = meta[pkg.key];
              return (
                <TabsContent key={pkg.key} value={pkg.key} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <MotionDiv
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={[
                      'group relative rounded-2xl border bg-card/50 p-7 md:p-10 lg:p-12',
                      pkg.featured ? 'border-primary/40' : 'border-border/40',
                      pkg.borderHover,
                      'transition-all duration-400',
                    ].join(' ')}
                    whileHover={{ boxShadow: `0 24px 64px -18px ${pkg.glow}` }}
                  >
                    {pkg.featured && (
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    )}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      {/* Left column: package info */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                          <div className={`w-11 h-11 rounded-2xl ${pkg.iconBg} flex items-center justify-center p-3`}>
                            <Icon size={20} className={pkg.iconColor} />
                          </div>
                          <span className={`text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border ${pkg.featured ? 'bg-primary/10 border-primary/25 text-primary' : 'bg-muted/40 border-border/50 text-muted-foreground'}`}>
                            {pkg.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.02em] text-foreground mb-3">
                          {data.title}
                        </h3>
                        <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] mb-6">
                          {data.desc}
                        </p>

                        <div className="mb-8">
                          <div className="flex items-baseline gap-2">
                            <span className={`font-heading text-[2.8rem] md:text-[3.5rem] font-bold tracking-[-0.04em] ${pkg.accent}`}>
                              {data.price}
                            </span>
                          </div>
                          <span className="text-[13px] text-muted-foreground/70">{data.period}</span>
                        </div>

                        <button
                          onClick={() => openRequest(data.title, pkg.key)}
                          className={[
                            'w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-semibold text-[13px] transition-all duration-250 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none',
                            pkg.featured
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
                              : 'bg-primary/8 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary',
                          ].join(' ')}
                        >
                          {data.cta}
                        </button>
                      </div>

                      {/* Right column: included services + benefits */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <p className="text-[10px] font-mono tracking-[0.22em] text-primary/50 uppercase mb-4">
                            {t.pricingIncludes}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {data.services.map((item) => (
                              <div key={item} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                                <Check size={14} className={`mt-0.5 shrink-0 ${pkg.accent}`} />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono tracking-[0.22em] text-primary/50 uppercase mb-4">
                            {t.pricingBenefits}
                          </p>
                          <div className="flex flex-col gap-3">
                            {data.benefits.map((item) => (
                              <div key={item} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                                <Check size={14} className="text-primary/60 mt-0.5 shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                </TabsContent>
              );
            })}
          </Tabs>
        </FadeIn>
      </div>

      <ServiceRequestDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((s) => ({ ...s, open }))}
        serviceName={dialog.name}
        serviceSlug={dialog.slug}
      />
    </section>
  );
};
