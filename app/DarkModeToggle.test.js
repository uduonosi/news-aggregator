import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";

// Mock localStorage and matchMedia
beforeAll(() => {
  window.localStorage = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
  };
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe("DarkModeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = "";
  });

  it("renders with light mode by default", () => {
    render(<DarkModeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle dark mode/i })
    ).toHaveTextContent("☀️ Light");
  });

  it("toggles to dark mode on click", async () => {
    render(<DarkModeToggle />);
    const btn = screen.getByRole("button", { name: /toggle dark mode/i });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(btn).toHaveTextContent("🌙 Dark");
    });
  });

  it("respects localStorage theme preference", async () => {
    window.localStorage = {
      getItem: jest.fn(() => "dark"),
      setItem: jest.fn(),
    };
    render(<DarkModeToggle />);
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(
        screen.getByRole("button", { name: /toggle dark mode/i })
      ).toHaveTextContent("🌙 Dark");
    });
  });
});
