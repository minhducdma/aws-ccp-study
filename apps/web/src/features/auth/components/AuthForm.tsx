import { Button, Card, GlobeIcon } from '@study/ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n, type MessageKey } from '../../../i18n';
import { useAuth } from '../provider';

/**
 * Maps the handful of Firebase Auth error codes users actually hit to a translated message.
 * Anything else falls back to a generic message rather than leaking Firebase's own wording.
 */
function authErrorKey(error: unknown): MessageKey {
  const code = error instanceof Error && 'code' in error ? String((error as { code: unknown }).code) : '';
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'auth.errorInvalidCredential';
  }
  if (code === 'auth/email-already-in-use') return 'auth.errorEmailInUse';
  if (code === 'auth/weak-password') return 'auth.errorWeakPassword';
  return 'auth.errorGeneric';
}

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { t } = useI18n();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signIn') await signIn(email, password);
      else await signUp(email, password, displayName.trim() || undefined);
      navigate('/');
    } catch (err) {
      console.error('[auth] sign-in/sign-up failed:', err);
      setError(t(authErrorKey(err)));
    } finally {
      setLoading(false);
    }
  };

  const withGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      console.error('[auth] Google sign-in failed:', err);
      setError(t(authErrorKey(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-14 sm:py-20">
      <Card inset="lg">
        <h1 className="text-2xl font-bold text-slate-900">
          {t(mode === 'signIn' ? 'auth.signInHeading' : 'auth.signUpHeading')}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {t(mode === 'signIn' ? 'auth.signInSubheading' : 'auth.signUpSubheading')}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === 'signUp' && (
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-slate-600">{t('auth.displayName')}</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
                className="focus-ring w-full rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400"
              />
            </label>
          )}
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-slate-600">{t('auth.email')}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="focus-ring w-full rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-slate-600">{t('auth.password')}</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
              className="focus-ring w-full rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-rose-400">
              {error}
            </p>
          )}

          <Button type="submit" block loading={loading}>
            {t(mode === 'signIn' ? 'auth.signIn' : 'auth.signUp')}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-line" />
          {t('auth.orDivider')}
          <span className="h-px flex-1 bg-line" />
        </div>

        <Button
          type="button"
          tone="secondary"
          block
          loading={loading}
          icon={<GlobeIcon width={16} height={16} />}
          onClick={withGoogle}
        >
          {t('auth.continueWithGoogle')}
        </Button>

        <p className="mt-6 text-center text-sm text-slate-500">
          {t(mode === 'signIn' ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
          <Link
            to={mode === 'signIn' ? '/signup' : '/login'}
            className="focus-ring rounded font-medium text-brand-400 hover:text-brand-300"
          >
            {t(mode === 'signIn' ? 'auth.signUpLink' : 'auth.signInLink')}
          </Link>
        </p>
      </Card>
    </div>
  );
}
