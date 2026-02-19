# Movie Discovery App

React Native (Community CLI) app powered by TMDB APIs with:
- Popular movies landing screen
- Search movies with 300ms debounce
- Infinite scrolling with duplicate-request protection
- Movie details (details + cast + reviews using parallel API calls)
- Post review screen (local submit flow)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Install and link env support with `react-native-config`:
   ```sh
   npm install react-native-config
   ```
3. Create your env file:
   ```sh
   cp .env.example .env
   ```
4. Set your key in `.env`:
   ```env
   TMDB_API_KEY=your_real_key
   ```
5. iOS only, install pods:
   ```sh
   cd ios && bundle exec pod install
   ```
6. Run the app:

   Android:
   ```sh
   npm run android
   ```

   iOS:
   ```sh
   npm run ios
   ```

## Architecture Notes

- `src/navigation/AppNavigator.tsx`: In-app route stack + bottom tab bar layout.
- `src/hooks/usePaginatedMovies.ts`: Shared pagination state and API guard logic.
- `src/hooks/useDebouncedValue.ts`: Debounced query updates for search.
- `src/services/tmdb.ts`: Axios service with TMDB endpoints.
- `src/screens/*`: Feature screens for popular, search, details and post review.

## API Endpoints Used

- `GET /movie/popular`
- `GET /search/movie`
- `GET /movie/{movie_id}`
- `GET /movie/{movie_id}/credits`
- `GET /movie/{movie_id}/reviews`

## Notes

- API key is never committed.
- `.env` values are read via `react-native-config`.
- Infinite scroll prevents duplicate page requests with in-flight and fetched-page guards.
- Movie lists are de-duplicated by movie id to avoid duplicate render keys.
- Search pagination resets when debounced query changes.
- This implementation avoids `createNativeStackNavigator`, so it does not require `react-native-screens` native setup to run.

<!-- build-ref:delta -->
