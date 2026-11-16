import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useApps } from "./useApps";

const bank = {
  id: "aB3xK9pQ2m",
  name: "Bank",
  tags: ["Cashflow Tracking"],
  route: "bank",
  routeType: "INTERNAL",
};

describe("useApps", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts in the loading state with no apps", () => {
    vi.spyOn(globalThis, "fetch").mockReturnValueOnce(new Promise<Response>(() => {}));

    const { result } = renderHook(() => useApps());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.apps).toEqual([]);
    expect(result.current.error).toBeUndefined();
  });

  it("returns the apps once they are loaded", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apps: [bank] }),
    } as Response);

    const { result } = renderHook(() => useApps());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.apps).toEqual([bank]);
    expect(result.current.error).toBeUndefined();
  });

  it("returns an error message when the backend answers with an error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useApps());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch apps");
    expect(result.current.apps).toEqual([]);
  });

  it("returns an error message when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useApps());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("Network error");
  });
});
