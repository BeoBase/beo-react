import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import NavbarMain from "./NavbarMain";

describe("NavbarMain", () => {

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <NavbarMain />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Home")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Portfolio")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Log In / Profile")
    ).toBeInTheDocument();
  });


  it("renders links with correct paths", () => {
    render(
      <MemoryRouter>
        <NavbarMain />
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");
    const portfolioLink = screen.getByText("Portfolio");
    const loginLink = screen.getByText("Log In / Profile");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(portfolioLink).toHaveAttribute("href", "/portfolio");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

});