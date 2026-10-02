import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Card from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    const { container } = render(<Card>Content</Card>);

    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("applies the default card styling", () => {
    const { container } = render(<Card>Content</Card>);

    expect(container.firstChild).toHaveClass(
      "rounded-2xl",
      "border",
      "bg-black/30",
      "shadow-xl",
    );
  });

  it("adds a custom className alongside the default styling", () => {
    const { container } = render(<Card className="max-w-md p-8">Content</Card>);

    expect(container.firstChild).toHaveClass("max-w-md", "p-8", "rounded-2xl");
  });
});
