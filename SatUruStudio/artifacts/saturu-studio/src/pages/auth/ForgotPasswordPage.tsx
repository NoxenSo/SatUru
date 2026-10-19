import { useState } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});
type FormData = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError('');
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-10 text-center">
          <Link href="/">
            <span className="font-display text-2xl font-bold tracking-tight cursor-pointer">
              Sat<span className="text-primary">Uru</span> Studio
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display text-xl font-bold mb-2">Check your email</h1>
              <p className="text-sm text-muted-foreground">
                If that email exists in our system, a password reset link has been sent.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold mb-1">Reset password</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {serverError && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/login">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft size={14} />
              Back to sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
