import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Home } from 'lucide-react';
import { SaturnIcon } from '@/components/SaturnIcon';
import { Header } from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(258 90% 66% / 0.10) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-stars opacity-30" aria-hidden />
        </div>

        {/* Orbital decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]" aria-hidden>
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
            <circle cx="300" cy="300" r="250" stroke="hsl(258 90% 66%)" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="300" cy="300" r="160" stroke="hsl(217 91% 60%)" strokeWidth="0.6" strokeDasharray="4 10" />
          </svg>
        </div>

        <div className="relative text-center px-6 max-w-lg mx-auto">
          {/* Giant Saturn */}
          <motion.div
            className="flex justify-center mb-10"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SaturnIcon size="96px" className="saturn-logo" />
          </motion.div>

          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary/50 uppercase mb-5">
              Error 404
            </p>
            <h1 className="font-heading text-[clamp(4rem,15vw,9rem)] font-bold leading-none tracking-[-0.05em] mb-6">
              <span className="text-gradient">404</span>
            </h1>
            <p className="text-[17px] text-muted-foreground leading-[1.75] mb-12">
              {t.notFoundDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <motion.button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-[14px] rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home size={15} />
                {t.notFoundHome}
              </motion.button>
              <motion.button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-border/50 hover:border-border text-muted-foreground hover:text-foreground font-medium text-[14px] rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={15} />
                {t.notFoundBack}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
