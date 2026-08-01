import { Dialog } from '@study/ui';
import { useI18n } from '../../../i18n';
import { AuthForm, type AuthMode } from './AuthForm';

interface AuthDialogProps {
  open: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, mode, onModeChange, onOpenChange }: AuthDialogProps) {
  const { t } = useI18n();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t(mode === 'signIn' ? 'auth.signInHeading' : 'auth.signUpHeading')}
      description={t(mode === 'signIn' ? 'auth.signInSubheading' : 'auth.signUpSubheading')}
      closeLabel={t('auth.closeDialog')}
    >
      <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
        {(['signUp', 'signIn'] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => onModeChange(item)}
            className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              mode === item
                ? 'bg-overlay text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t(item === 'signIn' ? 'auth.signIn' : 'auth.signUp')}
          </button>
        ))}
      </div>
      <AuthForm
        key={mode}
        mode={mode}
        presentation="dialog"
        onSuccess={() => onOpenChange(false)}
        onModeChange={onModeChange}
        showModeSwitch={false}
      />
    </Dialog>
  );
}