import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsPage from "../settings/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/settings",
}));

describe("SettingsPage", () => {
  it("renders settings placeholder", () => {
    render(<SettingsPage />);
    expect(screen.getByText("设置")).toBeInTheDocument();
  });
});
