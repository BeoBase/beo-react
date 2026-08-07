import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import AppLink from "./AppLink";

describe("AppLink", () => {
  
  it("renders link with children", () => {
    render(
      <MemoryRouter>
        <AppLink to="/home">
          Home
        </AppLink>
      </MemoryRouter>
    );
    
    expect(
      screen.getByText("Home")
    ).toBeInTheDocument();
  });
  
  
  it("renders correct href", () => {
    render(
      <MemoryRouter>
        <AppLink to="/profile">
          Profile
        </AppLink>
      </MemoryRouter>
    );
    
    expect(
      screen.getByText("Profile")
    ).toHaveAttribute("href", "/profile");
  });
  
  
  it("applies default classes", () => {
    render(
      <MemoryRouter>
        <AppLink to="/home">
          Home
        </AppLink>
      </MemoryRouter>
    );
    
    const link = screen.getByText("Home");
    
    expect(link).toHaveClass(
      "rounded-md px-3 py-1 font-medium text-white hover:bg-white/20 hover:text-white drop-shadow-sm transition-colors"
    );
  });
  
  
  it("merges custom className", () => {
    render(
      <MemoryRouter>
        <AppLink
          to="/login"
          className="font-bold"
        >
          Login
        </AppLink>
      </MemoryRouter>
    );
    
    const link = screen.getByText("Login");
    
    expect(link).toHaveClass(
      "rounded-md px-3 py-1 font-medium text-white hover:bg-white/20 hover:text-white drop-shadow-sm transition-colors font-bold"
    );
  });
  
});