import type { LocalizedText } from '../types';
import type { Locale } from './locale';
import { LOCALE_INFO } from './locale';

/**
 * A message is one string, or one string per plural category when it counts something.
 * `other` is always required because it is the only category every language has.
 */
export type MessageValue = string | ({ other: string } & Partial<Record<Intl.LDMLPluralRule, string>>);

export type MessageParams = Record<string, string | number>;

const pluralRules = new Map<Locale, Intl.PluralRules>();

function selectPlural(locale: Locale, count: number): Intl.LDMLPluralRule {
  let rules = pluralRules.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(LOCALE_INFO[locale].tag);
    pluralRules.set(locale, rules);
  }
  return rules.select(count);
}

/** Replaces every `{name}` with the matching parameter; numbers are formatted for the locale. */
function interpolate(template: string, params: MessageParams | undefined, locale: Locale): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = params[name];
    if (value == null) return whole;
    return typeof value === 'number' ? formatNumber(value, locale) : value;
  });
}

/** Narrows a message to the one template that applies, before any placeholder is filled in. */
export function selectVariant(
  message: MessageValue,
  params: MessageParams | undefined,
  locale: Locale,
): string {
  if (typeof message === 'string') return message;
  const count = params?.count;
  const category = typeof count === 'number' ? selectPlural(locale, count) : 'other';
  return message[category] ?? message.other;
}

export function formatMessage(
  message: MessageValue,
  params: MessageParams | undefined,
  locale: Locale,
): string {
  return interpolate(selectVariant(message, params, locale), params, locale);
}

/** Splits a template into its literal parts and its `{name}` placeholders, in order. */
export function templateParts(template: string): { literal: string; name?: string }[] {
  return template.split(/(\{\w+\})/g).map((part) => {
    const match = part.match(/^\{(\w+)\}$/);
    return match ? { literal: part, name: match[1] } : { literal: part };
  });
}

export function formatParam(value: string | number, locale: Locale): string {
  return typeof value === 'number' ? formatNumber(value, locale) : value;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_INFO[locale].tag).format(value);
}

export function formatDateTime(timestamp: number, locale: Locale): string {
  return new Date(timestamp).toLocaleString(LOCALE_INFO[locale].tag, {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Picks the first translation the author actually wrote, following the fallback chain.
 * Returns the locale that was used too, so a screen can say the text is not translated yet.
 */
export function resolveLocalized(
  text: LocalizedText | null | undefined,
  chain: string[],
): { text: string; locale: string } | null {
  if (!text) return null;
  for (const locale of chain) {
    const value = text[locale];
    if (value) return { text: value, locale };
  }
  const [locale, value] = Object.entries(text)[0] ?? [];
  return value ? { text: value, locale } : null;
}
