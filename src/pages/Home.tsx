import {useEffect, useState} from "react";

import Card from "../components/ui/Card.tsx";
import AppList from "../components/apps/AppList.tsx";
import AppSearchBar from "../components/apps/AppSearchBar.tsx";

import {filterApps} from "../components/apps/filterApps.ts";
import {useApps} from "../components/apps/useApps.ts";

export default function Home() {

  const {apps, isLoading, error: appsError} = useApps();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Beo Base | Home";
  }, []);
  
  return (
    <>
      {isLoading && (
        <Card layout="page">
          <p className="text-center text-stone-100">Loading apps...</p>
        </Card>
      )}

      {appsError && (
        <Card layout="page">
          <p role="alert" className="text-center text-stone-100">
            Could not load apps: {appsError}
          </p>
        </Card>
      )}

      {!isLoading && !appsError && (
        <>
          <AppSearchBar value={query} onChange={setQuery} />
          <AppList apps={filterApps(apps, query)} />
        </>
      )}
    </>
  );
}