import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppList from "./AppList";

const apps = [
  { name: "Bank", tag: "Cashflow Tracking", to: "/bank" },
  { name: "Jira Board", tag: "Developments", href: "https://example.com" },
  { name: "Budget", tag: "Cashflow Tracking", to: "/budget" },
];

describe("AppList", () => {
  it("renders one link per app", () => {
    render(
      <MemoryRouter>
        <AppList apps={apps} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("renders one heading per tag, in first-seen order", () => {
    render(
      <MemoryRouter>
        <AppList apps={apps} />
      </MemoryRouter>
    );

    const headings = screen.getAllByRole("heading").map((h) => h.textContent);
    expect(headings).toEqual(["Cashflow Tracking", "Developments"]);
  });

  it("puts apps with the same tag in the same group", () => {
    render(
      <MemoryRouter>
        <AppList apps={apps} />
      </MemoryRouter>
    );

    const cashflow = screen
      .getByRole("heading", { name: "Cashflow Tracking" })
      .closest("section") as HTMLElement;

    expect(cashflow).toHaveTextContent("Bank");
    expect(cashflow).toHaveTextContent("Budget");
    expect(cashflow).not.toHaveTextContent("Jira Board");
  });

  it("shows an empty message when there are no apps", () => {
    render(
      <MemoryRouter>
        <AppList apps={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("No apps found.")).toBeInTheDocument();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
