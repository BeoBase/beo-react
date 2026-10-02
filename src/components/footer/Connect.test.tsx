import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Connect from "./Connect";

describe("Connect", () => {
  it("renders the title and description", () => {
    render(<Connect />);

    expect(screen.getByText("Connect with Beo")).toBeInTheDocument();
    expect(
      screen.getByText("Direct message or send me an email."),
    ).toBeInTheDocument();
  });

  it("renders the email link", () => {
    render(<Connect />);

    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:BellamyPhan@icloud.com",
    );
  });

  it.each([
    ["Facebook", "https://www.facebook.com/bellamyphan69"],
    ["LinkedIn", "https://www.linkedin.com/in/bellamyphan/"],
  ])("renders the %s link in a new tab", (name, href) => {
    render(<Connect />);

    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders exactly three links", () => {
    render(<Connect />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
