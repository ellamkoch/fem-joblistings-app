import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/layout/Header";

vi.mock("@components/shared/HeroBackground.component", () => ({
  default: () => <div data-testid="hero-background" />,
}));

describe("Header (component)", () => {
  it("renders hero background", () => {
    render(<Header />);
    expect(screen.getByTestId("hero-background")).toBeInTheDocument();
  });
});
