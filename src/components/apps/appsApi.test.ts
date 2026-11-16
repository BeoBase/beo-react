import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchApps } from "./appsApi";

describe("fetchApps", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls GET /apps on the backend", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apps: [] }),
    } as Response);

    await fetchApps();

    expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/\/apps$/));
  });

  it("returns the apps from the response", async () => {
    const apps = [
      { id: "aB3xK9pQ2m", name: "Bank", tags: ["Cashflow Tracking"], route: "bank", routeType: "INTERNAL" },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apps }),
    } as Response);

    await expect(fetchApps()).resolves.toEqual(apps);
  });

  it("throws when the backend answers with an error status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(fetchApps()).rejects.toThrow("Failed to fetch apps");
  });

  it("throws when the request itself fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchApps()).rejects.toThrow("Network error");
  });
});
