import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Header from "../src/components/layout/Header";

vi.mock("@components/shared/HeroBackground.component", () => ({
  default: () => <div data-testid="hero-background" />,
}));

describe("Header (snapshot)", () => {
  it("matches snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
