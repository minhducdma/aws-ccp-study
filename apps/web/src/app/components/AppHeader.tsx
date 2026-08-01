import {
  Badge,
  ClipboardIcon,
  MenuIcon,
  Sheet,
  TargetIcon,
} from '@study/ui';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n';
import AuthWidget from '../../features/auth/components/AuthWidget';
import LocaleSwitch from '../../i18n/components/LocaleSwitch';

interface AppHeaderProps {
  title?: string;
  code?: string;
  courseUrl?: string;
  reviewUrl?: string;
  wrongCount?: number;
  onOpenMenu?: () => void;
}

const mobileLink =
  'focus-ring flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors';

export default function AppHeader({
  title = 'AWS Study',
  code,
  courseUrl,
  reviewUrl,
  wrongCount = 0,
  onOpenMenu,
}: AppHeaderProps) {
  const { t } = useI18n();
  const [utilityMenuOpen, setUtilityMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 hidden border-b border-line bg-canvas/90 backdrop-blur-lg lg:block">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-6">
          <NavLink to={courseUrl ?? '/'} className="focus-ring flex min-w-0 items-center gap-3 rounded-xl">
            <span className="flex size-9 shrink-0 rotate-[-3deg] items-center justify-center rounded-xl bg-brand-500 text-sm font-black text-slate-950 shadow-sm">
              A
            </span>
            <span className="truncate text-sm font-bold text-slate-900">{title}</span>
            {code && <Badge tone="slate">{code}</Badge>}
          </NavLink>

          {courseUrl && reviewUrl && (
            <nav className="ml-6 flex items-center gap-1" aria-label={t('nav.courseContents')}>
              <NavLink
                to={courseUrl}
                end
                className={({ isActive }) =>
                  `focus-ring rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-brand-500/12 text-brand-700' : 'text-slate-600 hover:bg-slate-200/70'
                  }`
                }
              >
                {t('nav.overview')}
              </NavLink>
              <NavLink
                to={reviewUrl}
                className={({ isActive }) =>
                  `focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-brand-500/12 text-brand-700' : 'text-slate-600 hover:bg-slate-200/70'
                  }`
                }
              >
                {t('nav.wrongAnswers')}
                {wrongCount > 0 && <Badge tone="red" size="sm">{wrongCount}</Badge>}
              </NavLink>
            </nav>
          )}

          <LocaleSwitch className="ml-auto" />
          <AuthWidget />
        </div>
      </header>

      {courseUrl && reviewUrl ? (
        <>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/95 px-4 backdrop-blur-lg lg:hidden">
            <NavLink to={courseUrl} className="focus-ring flex min-w-0 flex-1 items-center gap-2.5 rounded-xl">
              <span className="flex size-8 shrink-0 rotate-[-3deg] items-center justify-center rounded-lg bg-brand-500 text-xs font-black text-slate-950">
                A
              </span>
              <span className="truncate text-sm font-bold text-slate-900">{title}</span>
            </NavLink>
            <button
              type="button"
              onClick={onOpenMenu}
              className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900"
              aria-label={t('nav.openMenu')}
            >
              <MenuIcon width={22} height={22} />
            </button>
          </header>

          <nav
            className="fixed inset-x-0 bottom-0 z-40 flex h-[4.5rem] items-center border-t border-line-strong bg-overlay/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:hidden"
            aria-label={t('nav.courseNavigation')}
          >
            <NavLink
              to={courseUrl}
              end
              className={({ isActive }) => `${mobileLink} ${isActive ? 'bg-brand-500/12 text-brand-700' : 'text-slate-500'}`}
            >
              <TargetIcon width={20} height={20} />
              <span>{t('nav.overview')}</span>
            </NavLink>
            <NavLink
              to={reviewUrl}
              className={({ isActive }) => `${mobileLink} relative ${isActive ? 'bg-rose-500/10 text-rose-700' : 'text-slate-500'}`}
            >
              <span className="relative">
                <ClipboardIcon width={20} height={20} />
                {wrongCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] text-white">
                    {wrongCount > 9 ? '9+' : wrongCount}
                  </span>
                )}
              </span>
              <span>{t('nav.wrongAnswers')}</span>
            </NavLink>
          </nav>
        </>
      ) : (
        <>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/95 px-4 backdrop-blur-lg lg:hidden">
            <NavLink to="/" className="focus-ring flex min-w-0 flex-1 items-center gap-2.5 rounded-xl">
              <span className="flex size-8 shrink-0 rotate-[-3deg] items-center justify-center rounded-lg bg-brand-500 text-xs font-black text-slate-950">
                A
              </span>
              <span className="truncate text-sm font-bold text-slate-900">{title}</span>
            </NavLink>
            <button
              type="button"
              onClick={() => setUtilityMenuOpen(true)}
              className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900"
              aria-label={t('nav.openMenu')}
            >
              <MenuIcon width={22} height={22} />
            </button>
          </header>
          <Sheet
            open={utilityMenuOpen}
            onOpenChange={setUtilityMenuOpen}
            title={t('nav.settings')}
            variant="compact"
          >
            <div className="space-y-5 px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <div>
                <p className="mb-2 text-xs font-bold tracking-wide text-slate-500 uppercase">
                  {t('locale.label')}
                </p>
                <LocaleSwitch className="w-full" />
              </div>
              <div className="border-t border-line pt-4">
                <AuthWidget className="w-full justify-between" />
              </div>
            </div>
          </Sheet>
        </>
      )}
    </>
  );
}