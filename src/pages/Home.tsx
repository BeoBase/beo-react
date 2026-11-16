import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import Card from "../components/ui/Card.tsx";
import AppFinder from "../components/apps/AppFinder.tsx";

import {useApps} from "../components/apps/useApps.ts";

export default function Home() {

  const {apps, isLoading, error: appsError} = useApps();
  // Changes on every navigation, even a click on a link to the page we are
  // already on. Used as a key below to soft reset the search.
  const {key: locationKey} = useLocation();

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
        <AppFinder key={locationKey} apps={apps} />
      )}
    </>
  );
}
