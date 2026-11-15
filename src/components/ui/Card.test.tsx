import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Card from "./Card";
import classes from "./Card.module.scss";

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

  it("applies the shared card style", () => {
    const { container } = render(<Card>Content</Card>);

    expect(container.firstChild).toHaveClass(classes.card);
    expect(container.firstChild).not.toHaveClass(classes.page);
  });

  it("applies the page layout when asked", () => {
    const { container } = render(<Card layout="page">Content</Card>);

    expect(container.firstChild).toHaveClass(classes.card, classes.page);
  });

  it("adds a custom className alongside the shared style", () => {
    const { container } = render(<Card className="max-w-md p-8">Content</Card>);

    expect(container.firstChild).toHaveClass("max-w-md", "p-8", classes.card);
  });
});
