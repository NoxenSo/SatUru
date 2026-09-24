'use client';

import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export default function Contact() {
  return <main className="container py-28" id="contact">
    <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <div className="eyebrow">SatUru Studio / Contact</div>
        <h1 className="mt-5 text-5xl sm:text-7xl">Расскажите о проекте.</h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--muted)]">Опишите задачу в свободной форме. Мы вернёмся с вопросами и следующим шагом.</p>
        <a className="mt-10 inline-block underline underline-offset-4" href="mailto:hello@saturu.studio">hello@saturu.studio</a>
        <Link className="mt-5 block text-sm text-[var(--muted)] underline underline-offset-4" href="/privacy">Privacy Policy</Link>
      </div>
      <ContactForm />
    </div>
  </main>;
}
