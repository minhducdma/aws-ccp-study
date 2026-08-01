import {
  Button,
  Card,
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  LogInIcon,
  MailIcon,
  UserPlusIcon,
  UserRoundIcon,
} from '@study/ui';
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

export type AuthMode = 'signIn' | 'signUp';

interface AuthFormProps {
  mode: AuthMode;
  presentation?: 'page' | 'dialog';
  onSuccess?: () => void;
  onModeChange?: (mode: AuthMode) => void;
  showModeSwitch?: boolean;
}

export function AuthForm({
  mode,
  presentation = 'page',
  onSuccess,
  onModeChange,
  showModeSwitch = true,
}: AuthFormProps) {
  const { t } = useI18n();
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      if (mode === 'signIn') await signIn(email, password, remember);
      else await signUp(email, password, displayName.trim() || undefined, remember);
      if (onSuccess) onSuccess();
      else navigate('/');
    } catch (err) {
      console.error('[auth] sign-in/sign-up failed:', err);
      setError(t(authErrorKey(err)));
    }
  };

  const withGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle(remember);
      if (onSuccess) onSuccess();
      else navigate('/');
    } catch (err) {
      console.error('[auth] Google sign-in failed:', err);
      setError(t(authErrorKey(err)));
    }
  };

  const content = (
    <>
      {presentation === 'page' && (
        <>
        <h1 className="text-2xl font-bold text-slate-900">
          {t(mode === 'signIn' ? 'auth.signInHeading' : 'auth.signUpHeading')}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {t(mode === 'signIn' ? 'auth.signInSubheading' : 'auth.signUpSubheading')}
        </p>
        </>
      )}

        <form onSubmit={submit} className={presentation === 'page' ? 'mt-6 space-y-4' : 'space-y-4'}>
          {mode === 'signUp' && (
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-slate-600">{t('auth.displayName')}</span>
              <div className="relative">
                <UserRoundIcon
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete="name"
                  className="focus-ring w-full rounded-xl border border-line bg-surface/60 py-2.5 pr-3.5 pl-10 text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </label>
          )}
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-slate-600">{t('auth.email')}</span>
            <div className="relative">
              <MailIcon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="focus-ring w-full rounded-xl border border-line bg-surface/60 py-2.5 pr-3.5 pl-10 text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-slate-600">{t('auth.password')}</span>
            <div className="relative">
              <LockKeyholeIcon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                className="focus-ring w-full rounded-xl border border-line bg-surface/60 py-2.5 pr-12 pl-10 text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')}
                aria-pressed={showPassword}
                className="focus-ring absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="focus-ring size-4 rounded border-line-strong accent-brand-500"
            />
            <span>{t('auth.rememberMe')}</span>
          </label>

          {error && (
            <p role="alert" className="text-sm text-rose-400">
              {error}
            </p>
          )}

          <Button
            type="submit"
            block
            loading={loading}
            icon={mode === 'signIn' ? <LogInIcon size={17} /> : <UserPlusIcon size={17} />}
          >
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
          icon={
            <span aria-hidden="true" className="text-sm font-black text-sky-600">
              G
            </span>
          }
          onClick={withGoogle}
        >
          {t('auth.continueWithGoogle')}
        </Button>

        {showModeSwitch && <p className="mt-6 text-center text-sm text-slate-500">
          {t(mode === 'signIn' ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
          {onModeChange ? (
            <button
              type="button"
              onClick={() => onModeChange(mode === 'signIn' ? 'signUp' : 'signIn')}
              className="focus-ring rounded font-semibold text-brand-700 hover:text-brand-600"
            >
              {t(mode === 'signIn' ? 'auth.signUpLink' : 'auth.signInLink')}
            </button>
          ) : (
            <Link
              to={mode === 'signIn' ? '/signup' : '/login'}
              className="focus-ring rounded font-semibold text-brand-700 hover:text-brand-600"
            >
              {t(mode === 'signIn' ? 'auth.signUpLink' : 'auth.signInLink')}
            </Link>
          )}
        </p>}
    </>
  );

  if (presentation === 'dialog') return content;

  return (
    <div className="mx-auto max-w-sm px-4 py-14 sm:py-20">
      <Card inset="lg">
        {content}
      </Card>
    </div>
  );
}
