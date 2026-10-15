import {useEffect, useState} from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | undefined>();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error instanceof Error ? error.message : 'Failed to fetch data.'});
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    error,
  }
}