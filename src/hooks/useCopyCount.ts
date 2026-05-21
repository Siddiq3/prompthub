import { useState, useEffect, useCallback } from 'react';

const POLL_INTERVAL = 5000; // Poll every 5 seconds

export function useCopyCount(promptId: string, initialCount: number = 0) {
  const [copyCount, setCopyCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCopyCount = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/track-copy?promptId=${promptId}`);
      if (response.ok) {
        const data = await response.json();
        setCopyCount(data.copies || initialCount);
        setError(null);
      } else {
        setCopyCount(initialCount);
        setError('Failed to fetch copy count');
      }
    } catch (err) {
      console.error('Error fetching copy count:', err);
      setCopyCount(initialCount);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [promptId, initialCount]);

  // Fetch on mount
  useEffect(() => {
    fetchCopyCount();
  }, [fetchCopyCount]);

  // Poll for updates
  useEffect(() => {
    const interval = setInterval(fetchCopyCount, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCopyCount]);

  return { copyCount, isLoading, error, refetch: fetchCopyCount };
}
