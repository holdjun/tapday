import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock useAppConfig hook
const mockConfig = {
  name: "Tapday",
  icon: { type: "emoji" as const, emoji: "📅" },
  marker: { type: "emoji" as const, emoji: "✅" },
  themeColor: "#f97316",
  setupCompleted: false,
  darkMode: "system" as const,
};

vi.mock("@/hooks/use-app-config", () => ({
  useAppConfig: () => ({
    config: mockConfig,
    loading: false,
    updateConfig: vi.fn(),
  }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Home", () => {
  beforeEach(() => {
    mockConfig.setupCompleted = false;
  });

  it("renders welcome message when setup not completed", () => {
    render(<Home />);
    expect(screen.getByText("欢迎来到 Tapday")).toBeInTheDocument();
  });

  it("renders app name when setup is completed", () => {
    mockConfig.setupCompleted = true;
    render(<Home />);
    expect(screen.getByText("Tapday")).toBeInTheDocument();
  });
});
