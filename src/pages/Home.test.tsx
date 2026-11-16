import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Home from "./Home";
import { useApps } from "../components/apps/useApps.ts";

vi.mock("../components/footer/Documentation.tsx", () => ({
  default: () => <div>Documentation</div>,
}));

vi.mock("../components/footer/Connect.tsx", () => ({
  default: () => <div>Connect</div>,
}));

// The apps list is loaded by a hook; mock it so the "Call Spring" tests below
// are the only ones that use fetch
vi.mock("../components/apps/useApps.ts", () => ({
  useApps: vi.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.mocked(useApps).mockReturnValue({
      apps: [],
      isLoading: false,
      error: undefined,
    });
  });

  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };
  
  it("renders the Home page", () => {
    renderHome();
    
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });
  
  it("shows a loading message while the apps are loading", () => {
    vi.mocked(useApps).mockReturnValue({
      apps: [],
      isLoading: true,
      error: undefined,
    });

    renderHome();

    expect(screen.getByText("Loading apps...")).toBeInTheDocument();
    expect(screen.queryByText("No apps found.")).not.toBeInTheDocument();
  });

  it("shows an error message when the apps cannot be loaded", () => {
    vi.mocked(useApps).mockReturnValue({
      apps: [],
      isLoading: false,
      error: "Failed to fetch apps",
    });

    renderHome();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not load apps: Failed to fetch apps",
    );
    expect(screen.queryByText("No apps found.")).not.toBeInTheDocument();
  });

  it("shows the apps from the backend grouped by tag", () => {
    vi.mocked(useApps).mockReturnValue({
      apps: [
        {
          id: "aB3xK9pQ2m",
          name: "Bank",
          tags: ["Cashflow Tracking"],
          route: "/bank",
          routeType: "INTERNAL",
        },
      ],
      isLoading: false,
      error: undefined,
    });

    renderHome();

    expect(
      screen.getByRole("heading", { name: "Cashflow Tracking" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Bank" })).toHaveAttribute(
      "href",
      "/bank",
    );
  });

  it("filters the apps by the search text", async () => {
    vi.mocked(useApps).mockReturnValue({
      apps: [
        { id: "id00000001", name: "Bank", tags: ["Cashflow Tracking"], route: "/bank", routeType: "INTERNAL" },
        { id: "id00000002", name: "Quiz", tags: ["Games"], route: "/quiz", routeType: "INTERNAL" },
      ],
      isLoading: false,
      error: undefined,
    });

    renderHome();
    await userEvent.type(screen.getByLabelText("Search apps"), "qui");

    expect(screen.getByRole("link", { name: "Quiz" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Bank" })).not.toBeInTheDocument();
  });

  it("shows no search box while the apps are loading", () => {
    vi.mocked(useApps).mockReturnValue({
      apps: [],
      isLoading: true,
      error: undefined,
    });

    renderHome();

    expect(screen.queryByLabelText("Search apps")).not.toBeInTheDocument();
  });

  it("sets the document title", () => {
    renderHome();
    
    expect(document.title).toBe("Beo Base | Home");
  });
});