import { describe, expect, it } from "vitest";

import { filterApps } from "./filterApps";

import type { AppData } from "./AppData";

const apps: AppData[] = [
  { id: "id00000001", name: "Bank", tags: ["Cashflow Tracking"], route: "/bank", routeType: "INTERNAL" },
  { id: "id00000002", name: "Jira Board", tags: ["Developments"], route: "https://example.com", routeType: "EXTERNAL" },
  { id: "id00000003", name: "Budget", tags: ["Cashflow Tracking", "Planning"], route: "/budget", routeType: "INTERNAL" },
];

const names = (list: AppData[]) => list.map((app) => app.name);

describe("filterApps", () => {
  it("returns every app for an empty or blank query", () => {
    expect(filterApps(apps, "")).toEqual(apps);
    expect(filterApps(apps, "   ")).toEqual(apps);
  });

  it("matches the name, ignoring case", () => {
    expect(names(filterApps(apps, "JIRA"))).toEqual(["Jira Board"]);
  });

  it("matches part of a name and trims the query", () => {
    expect(names(filterApps(apps, "  bud "))).toEqual(["Budget"]);
  });

  it("matches any tag", () => {
    expect(names(filterApps(apps, "cashflow"))).toEqual(["Bank", "Budget"]);
    expect(names(filterApps(apps, "planning"))).toEqual(["Budget"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterApps(apps, "zzz")).toEqual([]);
  });
});
