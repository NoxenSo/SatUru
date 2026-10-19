import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface LegalLayoutProps {
  title: string;
  backText: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, backText, updatedAt, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header />
      <main className="flex-1 px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            {backText}
          </Link>

          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] mb-3">
            {title}
          </h1>
          <p className="text-[13px] text-muted-foreground/60 mb-10">
            {updatedAt}
          </p>

          <div className="space-y-8 text-[15px] text-muted-foreground leading-[1.8]">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
