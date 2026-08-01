import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LogInIcon,
  LogOutIcon,
  UserPlusIcon,
} from '@study/ui';
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
  const { user, logOut, loading } = useAuth();
  const [dialogMode, setDialogMode] = useState<AuthMode | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

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
  const name = user.displayName?.trim() || user.email?.split('@')[0] || t('auth.account');

  return (
    <DropdownMenu
      open={accountMenuOpen}
      onOpenChange={(open) => {
        setAccountMenuOpen(open);
        if (open) setSignOutError(null);
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`focus-ring flex min-h-10 min-w-0 items-center gap-2 rounded-xl border border-line bg-surface/70 px-2.5 py-1.5 text-left transition-colors hover:border-line-strong hover:bg-surface-hover ${className ?? ''}`}
          aria-label={t('auth.accountMenu')}
        >
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="size-7 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700" aria-hidden="true">
              {initial}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{name}</span>
          <ChevronDownIcon size={15} aria-hidden="true" className="shrink-0 text-slate-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex min-w-0 items-center gap-3 px-3 py-2.5">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700" aria-hidden="true">
              {initial}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-900">{name}</span>
            {user.email && <span className="block truncate text-xs text-slate-500">{user.email}</span>}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={loading}
          className="text-rose-600 data-[highlighted]:bg-rose-50 data-[highlighted]:text-rose-700"
          onSelect={(event) => {
            event.preventDefault();
            setSignOutError(null);
            void logOut()
              .then(() => setAccountMenuOpen(false))
              .catch((error) => {
                console.error('[auth] sign-out failed:', error);
                setSignOutError(t('auth.errorSignOut'));
              });
          }}
        >
          <LogOutIcon size={16} aria-hidden="true" />
          {t('auth.signOut')}
        </DropdownMenuItem>
        {signOutError && (
          <p role="alert" className="px-3 py-2 text-xs leading-relaxed text-rose-600">
            {signOutError}
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
