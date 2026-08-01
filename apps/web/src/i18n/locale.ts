import bundle from '@study/content';

export const LOCALES = ['vi', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** The language every screen falls back to, and the one the course markdown is written in. */
export const DEFAULT_LOCALE: Locale = 'vi';

export interface LocaleInfo {
  code: Locale;
  /** The language named in itself, which is what a reader looking for it expects to see. */
  endonym: string;
  /** Two letters for the compact switch in the header. */
  short: string;
  /** Passed to Intl and written into <html lang>. */
  tag: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  vi: { code: 'vi', endonym: 'Tiếng Việt', short: 'VI', tag: 'vi-VN' },
  en: { code: 'en', endonym: 'English', short: 'EN', tag: 'en-US' },
};

export const LOCALE_LIST: LocaleInfo[] = LOCALES.map((code) => LOCALE_INFO[code]);

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

const STORAGE_KEY = 'study-locale-v1';

export function readStoredLocale(): Locale | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore writes rejected when localStorage is unavailable (private mode).
  }
}

/** First browser language we support, matched on the base tag so `en-GB` still means English. */
function preferredLocale(): Locale | null {
  const requested =
    typeof navigator === 'undefined'
      ? []
      : (navigator.languages ?? [navigator.language]).filter(Boolean);
  for (const tag of requested) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/** A stored choice always wins, because it was made on purpose. */
export function initialLocale(): Locale {
  return readStoredLocale() ?? preferredLocale() ?? DEFAULT_LOCALE;
}

/**
 * Order in which authored content is tried: the reader's language first, then the language the
 * courses are written in, then anything the generator emitted, so a screen is never blank.
 */
export function contentFallbackChain(locale: Locale): string[] {
  return [...new Set([locale, DEFAULT_LOCALE, ...bundle.locales])];
}
