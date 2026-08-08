import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Home from "./Home";

vi.mock("../components/footer/Documentation.tsx", () => ({
  default: () => <div>Documentation</div>,
}));

vi.mock("../components/footer/Connect.tsx", () => ({
  default: () => <div>Connect</div>,
}));

vi.mock("../components/infoBox/InfoBox.tsx", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("Home", () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };
  
  it("renders the Home page", () => {
    renderHome();
    
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });
  
  it("sets the document title", () => {
    renderHome();
    
    expect(document.title).toBe("Beo Base | Home");
  });
  
  it("increments the count when the button is clicked", () => {
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /count is 0/i,
    });
    
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /count is 1/i }),
    ).toBeInTheDocument();
  });
  
  it("increments the count multiple times", () => {
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /count is 0/i,
    });
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /count is 3/i }),
    ).toBeInTheDocument();
  });
  
  it("calls the backend and displays the response", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        text: async () => "Hello from Spring!",
      } as Response);
    
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /call spring/i,
    });
    
    fireEvent.click(button);
    
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/test/test"),
    );
    
    expect(
      await screen.findByText("Hello from Spring!"),
    ).toBeInTheDocument();
    
    fetchMock.mockRestore();
  });
  
  it("displays an error when the backend request fails", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));
    
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /call spring/i,
    });
    
    fireEvent.click(button);
    
    expect(
      await screen.findByText("Backend connection failed"),
    ).toBeInTheDocument();
    
    fetchMock.mockRestore();
  });
  
  it("shows loading state while calling the backend", async () => {
    let resolveFetch!: (value: Response) => void;
    
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockReturnValueOnce(
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
      );
    
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /call spring/i,
    });
    
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /loading/i }),
    ).toBeDisabled();
    
    resolveFetch({
      text: async () => "Success",
    } as Response);
    
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /call spring/i }),
      ).not.toBeDisabled();
    });
    
    fetchMock.mockRestore();
  });
  
  it("re-enables the backend button after a failed request", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));
    
    renderHome();
    
    const button = screen.getByRole("button", {
      name: /call spring/i,
    });
    
    fireEvent.click(button);
    
    expect(
      screen.getByRole("button", { name: /loading/i }),
    ).toBeDisabled();
    
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /call spring/i }),
      ).not.toBeDisabled();
    });
    
    fetchMock.mockRestore();
  });
});