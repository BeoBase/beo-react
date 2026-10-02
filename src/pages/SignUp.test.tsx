import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SignUp from "./SignUp";

describe("SignUp", () => {
  it("renders the sign-up page text", () => {
    render(<SignUp />);

    expect(screen.getByText("This is Sign-Up page")).toBeInTheDocument();
  });
});
