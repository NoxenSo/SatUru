import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Globe, Moon, Sun, Shield } from 'lucide-react';

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
          <Icon size={17} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-display text-base font-semibold text-muted-foreground uppercase tracking-wider text-xs mb-2 mt-2">
      {title}
    </h2>
  );
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-1 font-mono tracking-widest uppercase">
          Account
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      {/* Appearance */}
      <section className="rounded-2xl border border-border/40 bg-card/20 px-6">
        <div className="py-4 border-b border-border/40">
          <SectionHeader title="Appearance" />
        </div>
        <SettingRow
          icon={theme === 'dark' ? Moon : Sun}
          label="Dark mode"
          description="Switch between light and dark theme"
        >
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </SettingRow>
      </section>

      {/* Language */}
      <section className="rounded-2xl border border-border/40 bg-card/20 px-6">
        <div className="py-4 border-b border-border/40">
          <SectionHeader title="Language" />
        </div>
        <SettingRow icon={Globe} label="Interface language" description="Choose your preferred language">
          <div className="flex rounded-lg border border-border/50 overflow-hidden text-sm">
            <button
              onClick={() => setLanguage('ru')}
              className={`px-4 py-2 font-medium transition-colors ${
                language === 'ru'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 font-medium transition-colors ${
                language === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              EN
            </button>
          </div>
        </SettingRow>
      </section>

      <section className="rounded-2xl border border-border/40 bg-card/20 px-6">
        <div className="py-4 border-b border-border/40">
          <SectionHeader title="Notifications" />
        </div>
        <SettingRow
          icon={Bell}
          label="Email notifications"
          description="Receive updates about your projects via email"
        >
          <Switch disabled checked={false} />
        </SettingRow>
        <Separator className="opacity-30" />
        <SettingRow
          icon={Bell}
          label="Project status updates"
          description="Get notified when your project status changes"
        >
          <Switch disabled checked={false} />
        </SettingRow>
      </section>

      <section className="rounded-2xl border border-border/40 bg-card/20 px-6">
        <div className="py-4 border-b border-border/40">
          <SectionHeader title="Security" />
        </div>
        <SettingRow
          icon={Shield}
          label="Two-factor authentication"
          description="Add an extra layer of security to your account"
        >
          <Switch disabled checked={false} />
        </SettingRow>
      </section>

      <p className="text-xs text-muted-foreground/40 pb-4">
        More settings will be available as SatUru Studio evolves.
      </p>
    </div>
  );
}
