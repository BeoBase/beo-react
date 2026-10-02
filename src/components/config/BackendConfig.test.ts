import { describe, expect, it } from "vitest";

import { BackendConfig, getSpringApiUrl } from "./BackendConfig";

describe("getSpringApiUrl", () => {
  it("returns the local backend URL on localhost", () => {
    expect(getSpringApiUrl("localhost")).toBe("http://localhost:8080");
  });

  it("returns the production API URL for any other host", () => {
    expect(getSpringApiUrl("beobase.com")).toBe("https://api.beobase.com");
    expect(getSpringApiUrl("www.beobase.com")).toBe("https://api.beobase.com");
  });

  it("returns the production API URL for an empty hostname", () => {
    expect(getSpringApiUrl("")).toBe("https://api.beobase.com");
  });
});

describe("BackendConfig", () => {
  it("uses the local backend when tests run on localhost", () => {
    expect(BackendConfig.springApiUrl).toBe("http://localhost:8080");
  });
});
