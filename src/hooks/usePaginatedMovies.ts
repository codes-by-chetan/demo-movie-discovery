import {useCallback, useRef, useState} from 'react';
import {Movie} from '../types/movie';

/* build-ref:delta */
export type MovieFetcher = (page: number) => Promise<{
  page: number;
  results: Movie[];
  total_pages: number;
}>;

export const usePaginatedMovies = (fetcher: MovieFetcher) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingRef = useRef(false);
  const fetchedPagesRef = useRef(new Set<number>());

  const loadPage = useCallback(
    async (nextPage: number, mode: 'initial' | 'refresh' | 'append') => {
      if (loadingRef.current || fetchedPagesRef.current.has(nextPage)) {
        return;
      }

      loadingRef.current = true;
      if (mode === 'initial') {
        setInitialLoading(true);
      } else if (mode === 'refresh') {
        setRefreshing(true);
      } else {
        setLoadingMore(true);
      }

      try {
        setError(null);
        const response = await fetcher(nextPage);

        setPage(response.page);
        setTotalPages(response.total_pages);
        fetchedPagesRef.current.add(response.page);
        setMovies(current =>
          mode === 'append' ? [...current, ...response.results] : response.results,
        );
      } catch {
        setError('Unable to fetch movies right now. Please try again.');
      } finally {
        loadingRef.current = false;
        setInitialLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [fetcher],
  );

  const resetAndLoad = useCallback(async () => {
    fetchedPagesRef.current.clear();
    setPage(0);
    setTotalPages(1);
    await loadPage(1, 'initial');
  }, [loadPage]);

  const refresh = useCallback(async () => {
    fetchedPagesRef.current.clear();
    await loadPage(1, 'refresh');
  }, [loadPage]);

  const loadNext = useCallback(async () => {
    if (page >= totalPages || loadingRef.current) {
      return;
    }

    await loadPage(page + 1, 'append');
  }, [loadPage, page, totalPages]);

  return {
    movies,
    page,
    totalPages,
    initialLoading,
    loadingMore,
    refreshing,
    error,
    resetAndLoad,
    refresh,
    loadNext,
  };
};
