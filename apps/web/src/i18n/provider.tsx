import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { LocalizedText } from '../types';
import {
  contentFallbackChain,
  initialLocale,
  LOCALE_INFO,
  storeLocale,
  type Locale,
} from './locale';
import { en } from './messages/en';
import { vi, type Catalog, type MessageKey } from './messages/vi';
import {
  formatDateTime,
  formatMessage,
  formatNumber,
  formatParam,
  resolveLocalized,
  selectVariant,
  templateParts,
  type MessageParams,
} from './translate';

const CATALOGS: Record<Locale, Catalog> = { vi, en };

export interface I18n {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Interface copy. */
  t: (key: MessageKey, params?: MessageParams) => string;
  /** Same, but a placeholder may be filled with a node, for a highlighted number inside a sentence. */
  tNode: (key: MessageKey, params: MessageParams, slots: Record<string, ReactNode>) => ReactNode;
  /** Authored course text, in the reader's language when it exists. */
  localized: (value: LocalizedText | null | undefined) => string;
  /** Same, plus the language the text is really written in, so a screen can flag a fallback. */
  localizedWithLocale: (
    value: LocalizedText | null | undefined,
  ) => { text: string; locale: string } | null;
  formatNumber: (value: number) => string;
  formatDateTime: (timestamp: number) => string;
}

const I18nContext = createContext<I18n | null>(null);

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be called inside I18nProvider.');
  return value;
}

/** Keeps the document in step with the chosen language, for screen readers and for search engines. */
function useDocumentLocale(locale: Locale, t: I18n['t']) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.title = t('app.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('app.description'));
  }, [locale, t]);
}

export interface I18nProviderProps {
  children: ReactNode;
  /** Forces a language instead of reading the stored or browser preference. Used by the SSR smoke test. */
  locale?: Locale;
}

export function I18nProvider({ children, locale: forced }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => forced ?? initialLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    storeLocale(next);
  }, []);

  const value = useMemo<I18n>(() => {
    const catalog = CATALOGS[locale];
    const chain = contentFallbackChain(locale);

    const t: I18n['t'] = (key, params) => formatMessage(catalog[key], params, locale);

    return {
      locale,
      setLocale,
      t,
      tNode: (key, params, slots) => {
        const template = selectVariant(catalog[key], params, locale);
        return templateParts(template).map((part, index) => {
          if (!part.name) return part.literal;
          if (part.name in slots) return <Fragment key={index}>{slots[part.name]}</Fragment>;
          const param = params[part.name];
          return param == null ? part.literal : formatParam(param, locale);
        });
      },
      localized: (text) => resolveLocalized(text, chain)?.text ?? '',
      localizedWithLocale: (text) => resolveLocalized(text, chain),
      formatNumber: (input) => formatNumber(input, locale),
      formatDateTime: (timestamp) => formatDateTime(timestamp, locale),
    };
  }, [locale, setLocale]);

  useDocumentLocale(locale, value.t);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export { LOCALE_INFO };
