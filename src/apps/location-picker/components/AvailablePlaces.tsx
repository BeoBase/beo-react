import {useEffect, useState} from "react";
import {BackendConfig} from "../../../components/config/BackendConfig.ts";

import Places, {type Place} from './Places';
import Error from "./Error";

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

export default function AvailablePlaces({ onSelectPlace }: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/places`);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error);
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error
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
