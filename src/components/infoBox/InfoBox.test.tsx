import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InfoBox from "./InfoBox";

describe("InfoBox", () => {
  const buttons = [
    {
      label: "Internal",
      to: "/dashboard",
    },
    {
      label: "External",
      href: "https://example.com",
    },
  ];
  
  it("renders the title", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Resources" buttons={buttons} />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });
  
  it("renders all button labels", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Resources" buttons={buttons} />
      </MemoryRouter>
    );
    
    expect(screen.getByRole("link", { name: "Internal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "External" })).toBeInTheDocument();
  });
  
  it("renders internal links using the 'to' prop", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Resources" buttons={buttons} />
      </MemoryRouter>
    );
    
    const internalLink = screen.getByRole("link", {
      name: "Internal",
    });
    
    expect(internalLink).toHaveAttribute("href", "/dashboard");
  });
  
  it("renders external links correctly", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Resources" buttons={buttons} />
      </MemoryRouter>
    );
    
    const externalLink = screen.getByRole("link", {
      name: "External",
    });
    
    expect(externalLink).toHaveAttribute(
      "href",
      "https://example.com"
    );
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });
  
  it("renders the correct number of links", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Resources" buttons={buttons} />
      </MemoryRouter>
    );
    
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  
  it("renders correctly with no buttons", () => {
    render(
      <MemoryRouter>
        <InfoBox title="Empty" buttons={[]} />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Empty")).toBeInTheDocument();
    
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});