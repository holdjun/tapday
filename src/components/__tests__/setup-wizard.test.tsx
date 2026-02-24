import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SetupWizard } from "../setup/setup-wizard";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SetupWizard", () => {
  it("renders step 1 with name input", () => {
    render(<SetupWizard onComplete={vi.fn()} />);
    expect(screen.getByText("给你的打卡起个名字")).toBeInTheDocument();
  });

  it("disables next button when name is empty", () => {
    render(<SetupWizard onComplete={vi.fn()} />);
    const nextButtons = screen.getAllByText("下一步");
    expect(nextButtons[0]).toBeDisabled();
  });

  it("enables next button when name is entered", () => {
    render(<SetupWizard onComplete={vi.fn()} />);
    const input = screen.getAllByRole("textbox")[0];
    fireEvent.change(input, { target: { value: "读书打卡" } });
    const nextButtons = screen.getAllByText("下一步");
    expect(nextButtons[0]).toBeEnabled();
  });

  it("advances to step 2 when next is clicked", async () => {
    render(<SetupWizard onComplete={vi.fn()} />);
    const input = screen.getAllByRole("textbox")[0];
    fireEvent.change(input, { target: { value: "读书打卡" } });
    fireEvent.click(screen.getAllByText("下一步")[0]);
    await vi.waitFor(() => {
      expect(screen.getByText("选一个 App 图标")).toBeInTheDocument();
    });
  });
});
