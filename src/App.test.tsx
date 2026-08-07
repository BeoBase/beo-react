
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

import App from './App';

describe('App', () => {
  
  it("renders home route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(
      screen.getByText("Documentation")
    ).toBeInTheDocument();
    
    expect(
      screen.getByText("Connect with Beo")
    ).toBeInTheDocument();
  });
  
})