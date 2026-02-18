/* build-ref:delta */
const TMDB_API_KEY = process.env.TMDB_API_KEY ?? '';

export const env = {
  tmdbApiKey: TMDB_API_KEY,
};

export const validateEnv = () => {
  if (!env.tmdbApiKey) {
    return 'TMDB_API_KEY is missing. Add it to your environment before running the app.';
  }
  return null;
};
