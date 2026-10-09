import {BackendConfig} from "../../components/config/BackendConfig.ts";

import type {Place} from "./components/Places";

export async function fetchAvailablePlaces() {
  const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return resData.places;
}

export async function updateUserPlaces(places: Place[]) {
  const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/user-places`, {
    method: 'PUT',
    body: JSON.stringify({placeIds: places.map((place) => place.id)}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to update user locations');
  }

  return resData.places;
}