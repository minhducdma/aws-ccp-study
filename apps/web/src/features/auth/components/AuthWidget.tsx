import { Button, LogInIcon, LogOutIcon, UserPlusIcon } from '@study/ui';
import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { useAuth } from '../provider';
import AuthDialog from './AuthDialog';
import type { AuthMode } from './AuthForm';

/**
 * Compact auth status for the header: sign-in and sign-up dialog actions for guests, or the
 * account's initial plus a sign-out button once Firebase resolves a session. Nothing renders
 * while the initial session check is pending, so the header does not flash between states.
 */
export default function AuthWidget({ className }: { className?: string }) {
  const { t } = useI18n();
  const { user, logOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [dialogMode, setDialogMode] = useState<AuthMode | null>(null);

  if (user === undefined) return null;

  if (!user) {
    return (
      <div className={`grid min-w-0 grid-cols-2 gap-2 [&_button]:whitespace-nowrap ${className ?? ''}`}>
        <Button
          size="sm"
          block
          icon={<UserPlusIcon size={15} aria-hidden="true" />}
          onClick={() => setDialogMode('signUp')}
        >
          {t('auth.signUp')}
        </Button>
        <Button
          tone="secondary"
          size="sm"
          block
          icon={<LogInIcon size={15} aria-hidden="true" />}
          onClick={() => setDialogMode('signIn')}
        >
          {t('auth.signIn')}
        </Button>
        <AuthDialog
          open={dialogMode !== null}
          mode={dialogMode ?? 'signIn'}
          onModeChange={setDialogMode}
          onOpenChange={(open) => {
            if (!open) setDialogMode(null);
          }}
        />
      </div>
    );
  }

  const initial = (user.displayName ?? user.email ?? '?').slice(0, 1).toUpperCase();

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700"
        title={user.displayName ?? user.email ?? undefined}
        aria-hidden="true"
      >
        {initial}
      </span>
      <Button
        tone="ghost"
        size="sm"
        loading={loggingOut}
        icon={<LogOutIcon size={15} aria-hidden="true" />}
        onClick={async () => {
          setLoggingOut(true);
          try {
            await logOut();
          } finally {
            setLoggingOut(false);
          }
        }}
      >
        {t('auth.signOut')}
      </Button>
    </div>
  );
}
