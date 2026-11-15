import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppButton from "./AppButton";

describe("AppButton", () => {
  it("renders the app name as a single link", () => {
    render(
      <MemoryRouter>
        <AppButton app={{ name: "Bank", tag: "Cashflow Tracking", to: "/bank" }} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Bank" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("does not show the tag (the group heading does that)", () => {
    render(
      <MemoryRouter>
        <AppButton app={{ name: "Bank", tag: "Cashflow Tracking", to: "/bank" }} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Cashflow Tracking")).not.toBeInTheDocument();
  });

  it("renders an internal link using 'to'", () => {
    render(
      <MemoryRouter>
        <AppButton app={{ name: "Bank", tag: "Cashflow", to: "/bank" }} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/bank");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders an external link in a new tab using 'href'", () => {
    render(
      <MemoryRouter>
        <AppButton
          app={{ name: "Jira Board", tag: "Developments", href: "https://example.com" }}
        />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
