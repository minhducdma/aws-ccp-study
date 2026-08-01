import { GlobeIcon } from '@study/ui';
import { LOCALE_LIST, useI18n } from '..';

/**
 * Segmented control rather than a dropdown: with two languages every option is already visible,
 * so switching takes one click and nobody has to guess what is behind the menu.
 */
export default function LocaleSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('locale.label')}
      className={[
        'inline-flex items-center gap-1 rounded-lg border border-line bg-surface/60 p-1',
        className ?? '',
      ].join(' ')}
    >
      <GlobeIcon width={14} height={14} className="ml-1 shrink-0 text-slate-500" aria-hidden="true" />
      {LOCALE_LIST.map((info) => {
        const active = info.code === locale;
        return (
          <button
            key={info.code}
            type="button"
            lang={info.code}
            onClick={() => setLocale(info.code)}
            aria-pressed={active}
            title={active ? undefined : t('locale.switchTo', { name: info.endonym })}
            className={[
              'focus-ring rounded-md px-2 py-0.5 text-xs font-semibold transition-colors duration-200',
              active
                ? 'bg-brand-500 text-slate-950'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
            ].join(' ')}
          >
            {/* The two letters are the visible name; screen readers get the language in full,
                and aria-pressed already says which one is on. */}
            <span aria-hidden="true">{info.short}</span>
            <span className="sr-only">{info.endonym}</span>
          </button>
        );
      })}
    </div>
  );
}
