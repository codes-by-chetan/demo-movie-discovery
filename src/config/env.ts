/* build-ref:delta */

export const env = {
  tmdbApiKey: '9ebd4908637c187df84f8541b88ad3b2',
};

export const validateEnv = () => {
  if (!env.tmdbApiKey) {
    return 'TMDB_API_KEY is missing. Add it to your environment before running the app.';
  }
  return null;
};
