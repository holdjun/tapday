import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Home from "../page";

afterEach(cleanup);

test("renders the hello world title", () => {
  render(<Home />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("renders dashboard link", () => {
  render(<Home />);
  const link = screen.getByRole("link", { name: /dashboard/i });
  expect(link).toHaveAttribute("href", "/dashboard");
});

test("renders sign in link", () => {
  render(<Home />);
  const link = screen.getByRole("link", { name: /sign in/i });
  expect(link).toHaveAttribute("href", "/login");
});
