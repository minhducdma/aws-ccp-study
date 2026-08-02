/**
 * App-wide constants. Values that were previously inlined as string/number literals across the
 * codebase live here so there is a single place to change a storage key, a collection name, or a
 * timing rule, and so a typo becomes a compile error rather than a silent mismatch.
 */

/** localStorage keys. Bumping a version suffix intentionally orphans the old cache. */
export const PROGRESS_STORAGE_KEY = 'study-progress-v2';
export const LOCALE_STORAGE_KEY = 'study-locale-v1';

/**
 * Progress written before the app supported multiple courses. It held a single course's data at
 * the top level, which is now stored under this id. Kept only so existing browsers can migrate.
 */
export const LEGACY_PROGRESS_STORAGE_KEY = 'aws-ccp-progress-v1';
export const LEGACY_COURSE_ID = 'aws-clf-c02';

/** The Firestore root collection holding one document per signed-in user (keyed by uid). */
export const USER_PROGRESS_COLLECTION = 'userProgress';

/** One minute in milliseconds; exam timers are authored in minutes but run in ms. */
export const MS_PER_MINUTE = 60_000;
