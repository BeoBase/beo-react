import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppButton from "./AppButton";

import type { AppData } from "./AppData";

const internalApp: AppData = {
  id: "aB3xK9pQ2m",
  name: "Bank",
  tags: ["Cashflow Tracking"],
  route: "/bank",
  routeType: "INTERNAL",
};

const externalApp: AppData = {
  id: "xY7mN2kL9q",
  name: "Jira Board",
  tags: ["Developments"],
  route: "https://example.com",
  routeType: "EXTERNAL",
};

describe("AppButton", () => {
  it("renders the app name as a single link", () => {
    render(
      <MemoryRouter>
        <AppButton app={internalApp} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Bank" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("does not show the tag (the group heading does that)", () => {
    render(
      <MemoryRouter>
        <AppButton app={internalApp} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Cashflow Tracking")).not.toBeInTheDocument();
  });

  it("renders an INTERNAL app as a router link", () => {
    render(
      <MemoryRouter>
        <AppButton app={internalApp} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/bank");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders an EXTERNAL app in a new tab", () => {
    render(
      <MemoryRouter>
        <AppButton app={externalApp} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
