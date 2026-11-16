import type { AppData } from "./AppData.ts";

// Keeps the apps whose name or any tag contains the query (case-insensitive).
// An empty or blank query keeps every app.
export function filterApps(apps: AppData[], query: string): AppData[] {
  const search = query.trim().toLowerCase();

  if (search === "") {
    return apps;
  }

  return apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search) ||
      app.tags.some((tag) => tag.toLowerCase().includes(search))
  );
}
