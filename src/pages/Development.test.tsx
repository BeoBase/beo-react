import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Development from "./Development";

describe("Development", () => {
  it("renders the development page text", () => {
    render(<Development />);

    expect(screen.getByText("This is Development page")).toBeInTheDocument();
  });
});
