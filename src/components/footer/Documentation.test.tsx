import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Documentation from "./Documentation";

describe("Documentation", () => {
  it("renders the title and description", () => {
    render(<Documentation />);

    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(
      screen.getByText("Public source code and project documentation."),
    ).toBeInTheDocument();
  });

  it.each([
    ["Bellamy", "https://github.com/bellamyphan"],
    ["Beo Base", "https://github.com/BeoBase"],
    ["Confluence", "https://bellamyphan.atlassian.net/wiki/spaces/BB/overview"],
  ])("renders the %s link in a new tab", (name, href) => {
    render(<Documentation />);

    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the resume link pointing to the PDF in a new tab", () => {
    render(<Documentation />);

    const link = screen.getByRole("link", { name: "Resume" });
    expect(link.getAttribute("href")).toMatch(/BellamyPhan_Resume.*\.pdf$/);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders exactly four links", () => {
    render(<Documentation />);

    expect(screen.getAllByRole("link")).toHaveLength(4);
  });
});
