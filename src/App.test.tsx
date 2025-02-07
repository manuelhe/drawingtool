import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders correctly", () => {
    render(<App />);
    expect(screen.getByText("Drawing Tool")).toBeDefined();
  });

  it("updates canvas on input change", () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText("Enter your commands here...");
    fireEvent.change(textarea, { target: { value: "C 20 4" } });
    expect(screen.queryByText(/waiting for commands/i)).toBeNull();
    expect(screen.getByText(/--------------------/)).toBeDefined();
  });
});
