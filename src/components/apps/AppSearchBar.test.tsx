import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppSearchBar from "./AppSearchBar";

describe("AppSearchBar", () => {
  it("shows the given value in a labelled search box", () => {
    render(<AppSearchBar value="bank" onChange={() => {}} />);

    expect(screen.getByLabelText("Search apps")).toHaveValue("bank");
  });

  it("calls onChange with the typed text", async () => {
    const onChange = vi.fn();
    render(<AppSearchBar value="" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("Search apps"), "a");

    expect(onChange).toHaveBeenCalledWith("a");
  });
});
