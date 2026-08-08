import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import SignIn from "./SignIn";

describe("SignIn", () => {

  const renderSignIn = () => {
    return render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    document.title = "";
  });

  it("renders the sign in page", () => {
    renderSignIn();

    expect(
      screen.getByRole("heading", { name: "Welcome Back" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sign in to continue to your account")
    ).toBeInTheDocument();
  });

  it("sets the document title", () => {
    renderSignIn();

    expect(document.title).toBe("Bellamy Phan | Login");
  });

  it("renders the email input", () => {
    renderSignIn();

    const emailInput = screen.getByLabelText("Email");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "you@example.com");
    expect(emailInput).toBeRequired();
  });

  it("renders the password input", () => {
    renderSignIn();

    const passwordInput = screen.getByLabelText("Password");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute(
      "placeholder",
      "Enter your password"
    );
    expect(passwordInput).toBeRequired();
  });

  it("allows the user to enter an email", async () => {
    const user = userEvent.setup();

    renderSignIn();

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "test@example.com");

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("allows the user to enter a password", async () => {
    const user = userEvent.setup();

    renderSignIn();

    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "password123");

    expect(passwordInput).toHaveValue("password123");
  });

  it("renders the login buttons", () => {
    renderSignIn();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Continue as Demo" })
    ).toBeInTheDocument();
  });

  it("renders the forgot password link", () => {
    renderSignIn();

    const link = screen.getByRole("link", {
      name: "Forgot password?",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/forgot-password");
  });

  it("renders the OTP login link", () => {
    renderSignIn();

    const link = screen.getByRole("link", {
      name: "Login with Email OTP",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login-otp-request");
  });

  it("renders the sign up link", () => {
    renderSignIn();

    const link = screen.getByRole("link", {
      name: "Sign up",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/sign-up");
  });

  it("does not display an error message initially", () => {
    renderSignIn();
    expect(
      screen.queryByText("Invalid email or password")
    ).not.toBeInTheDocument();
  });
});