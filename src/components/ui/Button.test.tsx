import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
  
  it("renders button with children", () => {
    render(
      <Button>
        Click Me
      </Button>
    );
    
    expect(
      screen.getByRole("button", {
        name: "Click Me",
      })
    ).toBeInTheDocument();
  });
  
  
  it("uses primary variant by default", () => {
    render(
      <Button>
        Primary Button
      </Button>
    );
    
    const button = screen.getByRole("button");
    
    expect(button).toHaveClass(
      "bg-blue-600",
      "text-white",
      "hover:bg-blue-700"
    );
  });
  
  
  it("uses secondary variant", () => {
    render(
      <Button variant="secondary">
        Secondary Button
      </Button>
    );
    
    const button = screen.getByRole("button");
    
    expect(button).toHaveClass(
      "bg-gray-200",
      "text-gray-800",
      "hover:bg-gray-300"
    );
  });
  
  
  it("merges custom className", () => {
    render(
      <Button className="font-bold">
        Custom Button
      </Button>
    );
    
    const button = screen.getByRole("button");
    
    expect(button).toHaveClass(
      "font-bold"
    );
  });
  
  
  it("calls onClick handler", () => {
    const handleClick = vi.fn();
    
    render(
      <Button onClick={handleClick}>
        Click
      </Button>
    );
    
    fireEvent.click(
      screen.getByRole("button", {
        name: "Click",
      })
    );
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  
  it("supports native button attributes", () => {
    render(
      <Button
        type="submit"
        disabled
      >
        Submit
      </Button>
    );
    
    const button = screen.getByRole("button");
    
    expect(button).toHaveAttribute(
      "type",
      "submit"
    );
    
    expect(button).toBeDisabled();
  });
  
});