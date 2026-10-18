import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from './LegalLayout';

export function PrivacyPage() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      title={isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}
      backText={isRu ? 'На главную' : 'Back to home'}
      updatedAt={isRu ? 'Обновлено: 25 июля 2026 г.' : 'Last updated: 25 July 2026'}
    >
      <p>
        {isRu
          ? 'Настоящая Политика конфиденциальности описывает, как SatUru Studio собирает, использует и хранит персональные данные, которые вы нам предоставляете. Английская версия является юридически обязательной; русская версия предоставляется только для информации.'
          : 'This Privacy Policy describes how SatUru Studio collects, uses, and stores personal data you provide to us. The English version is legally binding; the Russian version is provided for convenience only.'}
      </p>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '1. Какие данные мы собираем' : '1. Data we collect'}
        </h2>
        <p>
          {isRu
            ? 'Мы собираем только ту информацию, которая необходима для общения и выполнения проекта: имя, адрес электронной почты, имя пользователя в Telegram, описание проекта, бюджет и сроки. При регистрации в клиентском портале мы также храним ваше имя, email и роль пользователя.'
            : 'We only collect information needed to communicate and deliver your project: name, email address, Telegram username, project description, budget, and deadline. When you register for the client portal, we also store your name, email, and user role.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '2. Как мы используем данные' : '2. How we use your data'}
        </h2>
        <p>
          {isRu
            ? 'Мы используем ваши данные исключительно для ответа на запросы, управления проектами, предоставления доступа к клиентскому порталу и улучшения качества наших услуг. Мы не продаем и не передаем ваши данные третьим лицам для маркетинговых целей.'
            : 'We use your data solely to respond to inquiries, manage projects, provide access to the client portal, and improve our services. We do not sell or share your data with third parties for marketing purposes.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '3. Cookies и локальное хранилище' : '3. Cookies and local storage'}
        </h2>
        <p>
          {isRu
            ? 'Мы используем только технически необходимые cookies и локальное хранилище браузера для сохранения ваших предпочтений (тема, язык) и поддержания сессии входа в клиентский портал. Мы не используем сторонние трекеры или аналитические cookies без вашего явного согласия.'
            : 'We only use technically necessary cookies and browser local storage to remember your preferences (theme, language) and maintain your client portal session. We do not use third-party trackers or analytics cookies without your explicit consent.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '4. Хранение и безопасность' : '4. Storage and security'}
        </h2>
        <p>
          {isRu
            ? 'Мы храним ваши данные на защищенных серверах с доступом по необходимости. Данные хранятся до тех пор, пока это необходимо для выполнения услуг, или до тех пор, пока вы не попросите их удалить.'
            : 'We store your data on secured servers with need-to-know access. Data is retained only as long as necessary to provide services or until you request deletion.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '5. Ваши права' : '5. Your rights'}
        </h2>
        <p>
          {isRu
            ? 'Вы можете запросить доступ, исправление или удаление своих данных в любое время. Для этого свяжитесь с нами по email: hello@saturu.studio.'
            : 'You may request access, correction, or deletion of your data at any time by contacting us at hello@saturu.studio.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '6. Контакты' : '6. Contact us'}
        </h2>
        <p>
          {isRu
            ? 'Если у вас есть вопросы о данной политике, напишите нам на hello@saturu.studio.'
            : 'If you have any questions about this policy, please email us at hello@saturu.studio.'}
        </p>
      </section>
    </LegalLayout>
  );
}
