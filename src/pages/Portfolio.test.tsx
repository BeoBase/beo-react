import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  it("renders the portfolio page text", () => {
    render(<Portfolio />);

    expect(screen.getByText("This is Portfolio page")).toBeInTheDocument();
  });
});
