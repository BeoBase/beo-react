import {useEffect, useState} from "react";
import {BackendConfig} from "../../../components/config/BackendConfig.ts";

import Places, {type Place} from './Places';
import ErrorMessage from "./ErrorMessage";

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

export default function AvailablePlaces({ onSelectPlace }: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/places`);

        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }

        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Something went wrong'));
      } finally {
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorMessage
      title="An error occurred!"
      message={error.message}
    />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
