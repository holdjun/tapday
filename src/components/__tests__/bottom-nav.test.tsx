import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomNav } from "../common/bottom-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("BottomNav", () => {
  it("renders three navigation links", () => {
    render(<BottomNav />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/stats");
    expect(links[2]).toHaveAttribute("href", "/settings");
  });

  it("highlights the active tab", () => {
    render(<BottomNav />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveClass("text-[var(--theme-color)]");
    expect(links[1]).not.toHaveClass("text-[var(--theme-color)]");
  });
});
