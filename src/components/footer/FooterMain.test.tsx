import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FooterMain from "./FooterMain";

describe("FooterMain", () => {

  it("renders footer content", () => {
    render(<FooterMain />);

    expect(
      screen.getByText(/BeoBase\.com\. All rights reserved\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Author: Bellamy Phan/i)
    ).toBeInTheDocument();
  });

  it("displays the current year", () => {
    render(<FooterMain />);

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument();
  });

});