import {BackendConfig} from "../../components/config/BackendConfig.ts";

export async function fetchAvailablePlaces() {
  const response = await fetch(`${BackendConfig.springApiUrl}/location-picker/places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return resData.places;
}