import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  const { t, language } = useLanguage();

  const items = [
    { q: t.faq1Question, a: t.faq1Answer },
    { q: t.faq2Question, a: t.faq2Answer },
    { q: t.faq3Question, a: t.faq3Answer },
    { q: t.faq4Question, a: t.faq4Answer },
    { q: t.faq5Question, a: t.faq5Answer },
  ];

  return (
    <section id="faq" className="py-36 md:py-48 px-6 md:px-10 border-t border-border/30 relative z-10">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="mb-16 md:mb-20">
            <p className="text-[11px] font-mono tracking-[0.3em] text-primary/60 uppercase mb-5">
              {language === 'ru' ? 'Ответы' : 'Answers'}
            </p>
            <h2 className="font-heading text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.03em] text-foreground">
              {t.faqTitle}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border/40"
              >
                <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:text-primary hover:no-underline transition-colors duration-200 [&[data-state=open]>svg]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-[14px] text-muted-foreground leading-[1.8]">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
};
