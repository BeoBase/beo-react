import { BackendConfig } from "../config/BackendConfig.ts";

import type { AppData } from "./AppData.ts";

// GET /apps -> { apps: [...] }
export async function fetchApps(): Promise<AppData[]> {
  const response = await fetch(`${BackendConfig.springApiUrl}/apps`);

  if (!response.ok) {
    throw new Error("Failed to fetch apps");
  }

  const resData = await response.json();
  return resData.apps;
}
