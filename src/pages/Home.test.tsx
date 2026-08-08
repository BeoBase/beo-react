import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Home from "./Home";

vi.mock("../components/footer/Documentation.tsx", () => ({
  default: () => <div>Documentation</div>,
}));

vi.mock("../components/footer/Connect.tsx", () => ({
  default: () => <div>Connect</div>,
}));

vi.mock("../components/infoBox/InfoBox.tsx", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("Home", () => {
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
    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });
  
  it("sets the document title", () => {
    renderHome();
    
    expect(document.title).toBe("Beo Base | Home");
  });
  
  it("increments the count when the button is clicked", () => {
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /count is 0/i,
    });
    
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /count is 1/i }),
    ).toBeInTheDocument();
  });
  
  it("increments the count multiple times", () => {
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /count is 0/i,
    });
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /count is 3/i }),
    ).toBeInTheDocument();
  });
});