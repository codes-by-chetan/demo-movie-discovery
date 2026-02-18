/* build-ref:delta */
const readString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

// React Native CLI does not support `.env` out of the box.
// We support multiple sources so the app can still run without extra native libs:
// 1) process.env.TMDB_API_KEY (if project later adds dotenv tooling)
// 2) globalThis.TMDB_API_KEY (can be injected at runtime/dev tools)
// 3) hardcoded fallback below for local development
const FALLBACK_TMDB_API_KEY = '';

const fromProcessEnv = readString(process.env.TMDB_API_KEY);
const fromGlobal = readString((globalThis as {TMDB_API_KEY?: string}).TMDB_API_KEY);
const fromFallback = readString(FALLBACK_TMDB_API_KEY);

const TMDB_API_KEY = fromProcessEnv || fromGlobal || fromFallback;

export const env = {
  tmdbApiKey: TMDB_API_KEY,
};

export const validateEnv = () => {
  if (!env.tmdbApiKey) {
    return [
      'TMDB API key is missing.',
      'React Native CLI does not read `.env` by default.',
      'Set one of:',
      '1) globalThis.TMDB_API_KEY at app bootstrap, or',
      '2) FALLBACK_TMDB_API_KEY in src/config/env.ts, or',
      '3) install dotenv tooling and use process.env.TMDB_API_KEY.',
    ].join(' ');
  }

  return null;
};
