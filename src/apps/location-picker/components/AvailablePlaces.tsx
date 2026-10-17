import {sortPlacesByDistance} from "../loc.ts";
import {fetchAvailablePlaces} from '../http.ts';
import {useFetch} from '../hooks/useFetch.ts';

import Places, {type Place} from './Places';
import ErrorMessage from "./ErrorMessage";

async function fetchSortedPlaces(): Promise<Place[]> {
  const places = await fetchAvailablePlaces();

  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance<Place & { lat: number; lon: number }>(
          places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  })
}

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

export default function AvailablePlaces({ onSelectPlace }: AvailablePlacesProps) {

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch<Place[]>(fetchSortedPlaces, []);

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
