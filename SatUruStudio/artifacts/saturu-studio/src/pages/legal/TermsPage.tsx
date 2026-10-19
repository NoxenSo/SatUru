import { useLanguage } from '@/context/LanguageContext';
import { LegalLayout } from './LegalLayout';

export function TermsPage() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      title={isRu ? 'Условия использования' : 'Terms of Service'}
      backText={isRu ? 'На главную' : 'Back to home'}
      updatedAt={isRu ? 'Обновлено: 25 июля 2026 г.' : 'Last updated: 25 July 2026'}
    >
      <p>
        {isRu
          ? 'Настоящие Условия использования регулируют использование сайта SatUru Studio и заказ услуг. Английская версия является юридически обязательной.'
          : 'These Terms of Service govern your use of the SatUru Studio website and the services you order. The English version is legally binding.'}
      </p>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '1. Услуги' : '1. Services'}
        </h2>
        <p>
          {isRu
            ? 'SatUru Studio предоставляет услуги по веб-разработке, UI/UX-дизайну, брендингу, лендингам и игровым проектам. Конкретный объем работ, сроки и стоимость согласовываются индивидуально в каждом проекте.'
            : 'SatUru Studio provides web development, UI/UX design, branding, landing pages, and game project services. The exact scope, timeline, and cost are agreed individually for each project.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '2. Цены и оплата' : '2. Pricing and payment'}
        </h2>
        <p>
          {isRu
            ? 'Цены, указанные на сайте, являются ориентировочными и могут меняться в зависимости от сложности проекта. Финальная стоимость фиксируется после согласования технического задания. Оплата производится по договоренности с клиентом.'
            : 'Prices shown on the website are estimates and may vary depending on project complexity. Final pricing is confirmed after the scope is agreed upon. Payment is arranged directly with the client.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '3. Интеллектуальная собственность' : '3. Intellectual property'}
        </h2>
        <p>
          {isRu
            ? 'После полной оплаты клиент получает права на конечный результат проекта, если иное не согласовано отдельно. Мы оставляем за собой право использовать обезличенные фрагменты работы в портфолио, если клиент не запросил обратного.'
            : 'After full payment, the client receives rights to the final project deliverables unless otherwise agreed. We reserve the right to use anonymized portions of the work in our portfolio unless the client requests otherwise.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '4. Обязанности клиента' : '4. Client responsibilities'}
        </h2>
        <p>
          {isRu
            ? 'Клиент обязуется предоставить своевременно всю необходимую информацию, материалы и обратную связь. Задержки со стороны клиента могут повлиять на сроки выполнения проекта.'
            : 'The client agrees to provide all necessary information, materials, and feedback in a timely manner. Delays caused by the client may affect the project timeline.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '5. Ответственность' : '5. Liability'}
        </h2>
        <p>
          {isRu
            ? 'SatUru Studio не несет ответственности за непрямые убытки, упущенную выгоду или убытки, возникшие вследствие использования или невозможности использования сайта или услуг, за исключением случаев умысла или грубой неосторожности.'
            : 'SatUru Studio is not liable for indirect damages, lost profits, or losses arising from the use or inability to use the website or services, except in cases of willful misconduct or gross negligence.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '6. Изменения условий' : '6. Changes to these terms'}
        </h2>
        <p>
          {isRu
            ? 'Мы можем обновлять настоящие Условия. Актуальная версия всегда размещена по адресу /terms. Продолжение использования сайта означает согласие с обновленными условиями.'
            : 'We may update these Terms from time to time. The current version is always available at /terms. Continued use of the website means you accept the updated terms.'}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          {isRu ? '7. Контакты' : '7. Contact us'}
        </h2>
        <p>
          {isRu
            ? 'По всем вопросам обращайтесь на hello@saturu.studio.'
            : 'For any questions, please contact us at hello@saturu.studio.'}
        </p>
      </section>
    </LegalLayout>
  );
}
