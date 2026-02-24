import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

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

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/manifest", () => ({
  applyManifest: vi.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    mockConfig.setupCompleted = false;
  });

  it("renders setup wizard when setup not completed", () => {
    render(<Home />);
    expect(screen.getByText("给你的打卡起个名字")).toBeInTheDocument();
  });

  it("renders app name when setup is completed", () => {
    mockConfig.setupCompleted = true;
    render(<Home />);
    expect(screen.getByText("Tapday")).toBeInTheDocument();
  });
});
