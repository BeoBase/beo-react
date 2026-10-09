import {BackendConfig} from "../../components/config/BackendConfig.ts";

export async function fetchAvailablePlaces() {
  const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/user-places`, {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to update user locations');
  }

  return resData.message;
}