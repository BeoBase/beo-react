import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import FooterMain from "./FooterMain";

describe("FooterMain", () => {

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders footer content", () => {
    render(<FooterMain />);

    expect(
      screen.getByText(/BeoBase\.com\. All rights reserved\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Dev Lead: Bellamy Tran/i)
    ).toBeInTheDocument();
  });

  it("shows the range from the start year to the current year", () => {
    const currentYear = new Date().getFullYear();

    render(<FooterMain />);

    expect(
      screen.getByText(new RegExp(`© 2025-${currentYear}`))
    ).toBeInTheDocument();
  });

  it("shows a later year in the range", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-06-15"));

    render(<FooterMain />);

    expect(screen.getByText(/© 2025-2030/)).toBeInTheDocument();
  });

  it("shows only the start year when it is still 2025", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15"));

    render(<FooterMain />);

    expect(screen.getByText(/© 2025 BeoBase\.com/)).toBeInTheDocument();
    expect(screen.queryByText(/2025-2025/)).not.toBeInTheDocument();
  });

});
