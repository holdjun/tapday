import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { LoginForm } from "@/components/login-form";

vi.mock("@/app/login/actions", () => ({
  login: vi.fn(),
  signup: vi.fn(),
}));

afterEach(cleanup);

test("renders sign in and sign up tabs", () => {
  render(<LoginForm />);
  expect(screen.getByRole("tab", { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /sign up/i })).toBeInTheDocument();
});

test("renders email and password inputs for sign in", () => {
  render(<LoginForm />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("renders sign in submit button", () => {
  render(<LoginForm />);
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
