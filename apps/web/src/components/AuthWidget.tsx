import { Button, ButtonLink } from '@study/ui';
import { useI18n } from '../i18n';
import { useAuth } from '../lib/firebase/auth';

/**
 * Compact auth status for the header: a sign-in link for guests, or the account's initial plus
 * a sign-out button once Firebase resolves a session. Nothing renders while the initial session
 * check is pending, so the header does not flash between guest and signed-in states.
 */
export default function AuthWidget({ className }: { className?: string }) {
  const { t } = useI18n();
  const { user, logOut } = useAuth();

  if (user === undefined) return null;

  if (!user) {
    return (
      <ButtonLink to="/login" tone="secondary" size="sm" className={className}>
        {t('auth.signIn')}
      </ButtonLink>
    );
  }

  const initial = (user.displayName ?? user.email ?? '?').slice(0, 1).toUpperCase();

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-200"
        title={user.displayName ?? user.email ?? undefined}
        aria-hidden="true"
      >
        {initial}
      </span>
      <Button tone="ghost" size="sm" onClick={() => logOut()}>
        {t('auth.signOut')}
      </Button>
    </div>
  );
}
