import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import type { User } from "@supabase/supabase-js";
import { DashboardContent } from "@/components/dashboard-content";

vi.mock("@/app/login/actions", () => ({
  logout: vi.fn(),
}));

const mockUser: User = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2024-01-01T00:00:00Z",
  last_sign_in_at: "2024-06-15T10:30:00Z",
};

afterEach(cleanup);

test("renders user email", () => {
  render(<DashboardContent user={mockUser} />);
  expect(screen.getByText("test@example.com")).toBeInTheDocument();
});

test("renders user ID", () => {
  render(<DashboardContent user={mockUser} />);
  expect(
    screen.getByText("123e4567-e89b-12d3-a456-426614174000"),
  ).toBeInTheDocument();
});

test("renders sign out button", () => {
  render(<DashboardContent user={mockUser} />);
  expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
});

test("renders avatar with initial", () => {
  render(<DashboardContent user={mockUser} />);
  expect(screen.getByText("T")).toBeInTheDocument();
});
