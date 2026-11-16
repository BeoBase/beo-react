import { useState } from "react";

import AppList from "./AppList.tsx";
import AppSearchBar from "./AppSearchBar.tsx";
import type { AppData } from "./AppData.ts";
import { filterApps } from "./filterApps.ts";

type AppFinderProps = {
  apps: AppData[];
};

// The search box plus the apps it filters. It owns the search text, so giving
// it a new `key` (a "soft reset") clears the text and refocuses the box.
export default function AppFinder({ apps }: AppFinderProps) {
  const [query, setQuery] = useState("");

  return (
    <>
      <AppSearchBar value={query} onChange={setQuery} />
      <AppList apps={filterApps(apps, query)} />
    </>
  );
}
