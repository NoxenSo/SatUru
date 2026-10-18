import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Send, Check, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

interface OrderFormProps {
  serviceName: string;
  serviceSlug: string;
}

type FormState = 'idle' | 'submitting' | 'success';

export const OrderForm: React.FC<OrderFormProps> = ({ serviceName, serviceSlug }) => {
  const { language } = useLanguage();
  const [state, setState] = useState<FormState>('idle');
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    telegram: '',
    email: '',
    description: '',
    budget: '',
    deadline: '',
  });

  const L = {
    title:       { ru: 'Оставить заявку', en: 'Submit Request' },
    subtitle:    { ru: `Услуга: ${serviceName}`, en: `Service: ${serviceName}` },
    name:        { ru: 'Имя *', en: 'Name *' },
    telegram:    { ru: 'Telegram (например @username) *', en: 'Telegram (e.g. @username) *' },
    email:       { ru: 'Email *', en: 'Email *' },
    description: { ru: 'Описание проекта *', en: 'Project description *' },
    budget:      { ru: 'Бюджет (необязательно)', en: 'Budget (optional)' },
    deadline:    { ru: 'Дедлайн (необязательно)', en: 'Deadline (optional)' },
    submit:      { ru: 'Отправить заявку', en: 'Submit Request' },
    submitting:  { ru: 'Отправляем…', en: 'Sending…' },
    success:     { ru: 'Заявка отправлена!', en: 'Request sent!' },
    successSub:  { ru: 'Мы свяжемся с вами в ближайшие 24 часа.', en: "We'll reach out within 24 hours." },
    consent:     { ru: 'Я согласен с Политикой конфиденциальности и Условиями использования', en: 'I agree to the Privacy Policy and Terms of Service' },
    consentErr:  { ru: 'Необходимо согласие для отправки заявки', en: 'Consent is required to submit the request' },
    mailtoErr:   { ru: 'Не удалось открыть почтовый клиент. Напишите нам на hello@saturu.studio', en: 'Could not open your email client. Please email us at hello@saturu.studio' },
    namePh:      { ru: 'Ваше имя', en: 'Your name' },
    tgPh:        { ru: '@username', en: '@username' },
    emailPh:     { ru: 'your@email.com', en: 'your@email.com' },
    descPh:      { ru: 'Расскажите о вашем проекте, задачах и ожиданиях…', en: 'Tell us about your project, goals and expectations…' },
    budgetPh:    { ru: 'например $500–1000', en: 'e.g. $500–1000' },
    deadlinePh:  { ru: 'например 2 недели', en: 'e.g. 2 weeks' },
  };
  const l = (key: keyof typeof L) => L[key][language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsentError(false);

    if (!consent) {
      setConsentError(true);
      return;
    }

    setState('submitting');

    const subject = encodeURIComponent(`Project request: ${serviceName}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Telegram: ${form.telegram}`,
        `Email: ${form.email}`,
        `Service: ${serviceName}`,
        `Budget: ${form.budget || '-'}`,
        `Deadline: ${form.deadline || '-'}`,
        '',
        'Description:',
        form.description,
      ].join('\n'),
    );

    const mailto = `mailto:hello@saturu.studio?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setState('success');
  };

  const inputCls = `
    w-full rounded-xl border border-border/50 bg-card/40 px-4 py-3
    text-[14px] text-foreground placeholder:text-muted-foreground/40
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
    focus:border-primary/50 transition-all duration-200
  `;

  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 p-7 md:p-10">
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-10 gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Check size={28} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">{l('success')}</h3>
              <p className="text-[14px] text-muted-foreground">{l('successSub')}</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] mb-1">{l('title')}</h3>
              <p className="text-[13px] text-muted-foreground">{l('subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${serviceSlug}-name`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('name')}</label>
                <input
                  id={`${serviceSlug}-name`}
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={l('namePh')}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${serviceSlug}-telegram`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('telegram')}</label>
                <input
                  id={`${serviceSlug}-telegram`}
                  type="text"
                  name="telegram"
                  required
                  value={form.telegram}
                  onChange={handleChange}
                  placeholder={l('tgPh')}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${serviceSlug}-email`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('email')}</label>
              <input
                id={`${serviceSlug}-email`}
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={l('emailPh')}
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${serviceSlug}-description`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('description')}</label>
              <textarea
                id={`${serviceSlug}-description`}
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder={l('descPh')}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${serviceSlug}-budget`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('budget')}</label>
                <input
                  id={`${serviceSlug}-budget`}
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder={l('budgetPh')}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${serviceSlug}-deadline`} className="text-[12px] font-medium text-muted-foreground tracking-wide">{l('deadline')}</label>
                <input
                  id={`${serviceSlug}-deadline`}
                  type="text"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  placeholder={l('deadlinePh')}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`${serviceSlug}-consent`}
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setConsentError(false);
                  }}
                  required
                  className="mt-1 h-4 w-4 rounded border-border/50 bg-card/40 text-primary focus:ring-primary/50 accent-primary"
                />
                <label htmlFor={`${serviceSlug}-consent`} className="text-[13px] text-muted-foreground leading-[1.6]">
                  {l('consent')} (
                  <Link href="/privacy" className="text-primary hover:underline">{language === 'ru' ? 'Политика' : 'Privacy'}</Link>
                  ,{' '}
                  <Link href="/terms" className="text-primary hover:underline">{language === 'ru' ? 'Условия' : 'Terms'}</Link>
                  )
                </label>
              </div>
              {consentError && (
                <p className="text-[12px] text-destructive">{l('consentErr')}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={state === 'submitting'}
              className="mt-2 flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-[14px] shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
              whileTap={{ scale: 0.98 }}
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {l('submitting')}
                </>
              ) : (
                <>
                  <Send size={15} />
                  {l('submit')}
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
