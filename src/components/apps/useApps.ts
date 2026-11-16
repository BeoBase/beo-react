import { useEffect, useState } from "react";

import type { AppData } from "./AppData.ts";
import { fetchApps } from "./appsApi.ts";

// Loads the apps from the backend once, when the component first shows
export function useApps() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    // Ignore the answer if the component is gone before it arrives
    let ignore = false;

    fetchApps()
      .then((data) => {
        if (!ignore) {
          setApps(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch apps");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { apps, isLoading, error };
}
