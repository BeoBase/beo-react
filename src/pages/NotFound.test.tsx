import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NotFound from "./NotFound";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("NotFound", () => {
  
  beforeEach(() => {
    mockNavigate.mockClear();
    document.title = "";
  });
  
  it("renders the 404 page", () => {
    render(<NotFound />);
    
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    
    expect(
      screen.getByText(
        "The page you are looking for doesn’t exist or may still be under construction."
      )
    ).toBeInTheDocument();
  });
  
  it("sets the document title", () => {
    render(<NotFound />);
    
    expect(document.title).toBe("Beo Base | Error Page");
  });
  
  it("navigates to the previous page when Previous Page is clicked", () => {
    render(<NotFound />);
    
    const button = screen.getByRole("button", {
      name: "Previous Page",
    });
    
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  
  it("navigates home when Go Back Home is clicked", () => {
    render(<NotFound />);
    
    const button = screen.getByRole("button", {
      name: "Go Back Home",
    });
    
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});