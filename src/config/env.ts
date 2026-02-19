/* build-ref:delta */
type ConfigShape = {
  TMDB_API_KEY?: string;
};

const readString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

const loadReactNativeConfig = (): ConfigShape => {
  try {
    const configModule = require('react-native-config');
    return (configModule?.default ?? configModule ?? {}) as ConfigShape;
  } catch {
    return {};
  }
};

const reactNativeConfig = loadReactNativeConfig();

export const env = {
  tmdbApiKey: readString(reactNativeConfig.TMDB_API_KEY),
};

export const validateEnv = () => {
  if (!env.tmdbApiKey) {
    return [
      'TMDB_API_KEY is missing.',
      'Ensure react-native-config is installed and linked, then add TMDB_API_KEY to .env.',
    ].join(' ');
  }

  return null;
};
