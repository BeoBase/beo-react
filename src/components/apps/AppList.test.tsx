import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppList from "./AppList";

import type { AppData } from "./AppData";

const apps: AppData[] = [
  { id: "id00000001", name: "Bank", tags: ["Cashflow Tracking"], route: "/bank", routeType: "INTERNAL" },
  { id: "id00000002", name: "Jira Board", tags: ["Developments"], route: "https://example.com", routeType: "EXTERNAL" },
  { id: "id00000003", name: "Budget", tags: ["Cashflow Tracking"], route: "/budget", routeType: "INTERNAL" },
];

function renderList(list: AppData[]) {
  return render(
    <MemoryRouter>
      <AppList apps={list} />
    </MemoryRouter>
  );
}

describe("AppList", () => {
  it("renders one link per app", () => {
    renderList(apps);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("renders one heading per tag, in first-seen order", () => {
    renderList(apps);

    const headings = screen.getAllByRole("heading").map((h) => h.textContent);
    expect(headings).toEqual(["Cashflow Tracking", "Developments"]);
  });

  it("puts apps with the same tag in the same group", () => {
    renderList(apps);

    const cashflow = screen
      .getByRole("heading", { name: "Cashflow Tracking" })
      .closest("section") as HTMLElement;

    expect(cashflow).toHaveTextContent("Bank");
    expect(cashflow).toHaveTextContent("Budget");
    expect(cashflow).not.toHaveTextContent("Jira Board");
  });

  it("shows an app with several tags in every one of its groups", () => {
    renderList([
      { id: "id00000004", name: "Car Loan", tags: ["Financial Liability", "Assets"], route: "/car-loan", routeType: "INTERNAL" },
    ]);

    const headings = screen.getAllByRole("heading").map((h) => h.textContent);
    expect(headings).toEqual(["Financial Liability", "Assets"]);
    expect(screen.getAllByRole("link", { name: "Car Loan" })).toHaveLength(2);
  });

  it("puts an app without tags in the Other folder", () => {
    renderList([
      { id: "id00000005", name: "Lonely App", tags: [], route: "/lonely", routeType: "INTERNAL" },
    ]);

    const other = screen
      .getByRole("heading", { name: "Other" })
      .closest("section") as HTMLElement;

    expect(other).toHaveTextContent("Lonely App");
  });

  it("shows an empty message when there are no apps", () => {
    renderList([]);

    expect(screen.getByText("No apps found.")).toBeInTheDocument();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
