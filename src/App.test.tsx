
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

import App from './App';

describe('App', () => {
  
  it("renders home route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
  
})