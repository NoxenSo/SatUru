import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from './LegalLayout';

export function CookiesPage() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      title={isRu ? 'Политика использования cookies' : 'Cookie Policy'}
      backText={isRu ? 'На главную' : 'Back to home'}
      updatedAt={isRu ? 'Обновлено: 25 июля 2026 г.' : 'Last updated: 25 July 2026'}
    >
      <p>
        {isRu
          ? 'Настоящая Политика cookies объясняет, как SatUru Studio использует cookies и похожие технологии.'
          : 'This Cookie Policy explains how SatUru Studio uses cookies and similar technologies.'}
      </p>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '1. Что такое cookies' : '1. What are cookies'}
        </h2>
        <p>
          {isRu
            ? 'Cookies — это небольшие текстовые файлы, которые сохраняются в вашем браузере при посещении сайта. Они помогают сайту запоминать ваши предпочтения и поддерживать сессию входа.'
            : 'Cookies are small text files stored in your browser when you visit a website. They help the site remember your preferences and maintain your login session.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '2. Какие cookies мы используем' : '2. Cookies we use'}
        </h2>
        <p>
          {isRu
            ? 'Мы используем только необходимые cookies и локальное хранилище браузера для запоминания выбранной темы, языка и поддержания сессии в клиентском портале. Мы не используем рекламные, аналитические или сторонние трекинговые cookies.'
            : 'We only use necessary cookies and browser local storage to remember your chosen theme, language, and maintain your client portal session. We do not use advertising, analytics, or third-party tracking cookies.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '3. Управление cookies' : '3. Managing cookies'}
        </h2>
        <p>
          {isRu
            ? 'Вы можете управлять cookies через настройки вашего браузера. Отключение необходимых cookies может привести к тому, что часть функций сайта, включая вход в портал, перестанет работать корректно.'
            : 'You can manage cookies through your browser settings. Disabling necessary cookies may cause parts of the website, including portal login, to stop working correctly.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '4. Контакты' : '4. Contact us'}
        </h2>
        <p>
          {isRu
            ? 'Если у вас есть вопросы, напишите нам на hello@saturu.studio.'
            : 'If you have any questions, please contact us at hello@saturu.studio.'}
        </p>
      </section>
    </LegalLayout>
  );
}
