import {useEffect, useState} from "react";

import Places, {type Place} from './Places';

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

export default function AvailablePlaces({ onSelectPlace }: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/location-picker/places').then((response) => {
      return response.json();
    }).then((resData) => {
      setAvailablePlaces(resData.places);
    });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
