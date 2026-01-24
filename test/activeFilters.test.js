import { describe, it, expect } from "vitest";
import {
  normalizeBadge,
  toggleFilter,
  removeFilter,
  clearFilter,
} from "../src/utils/activeFilters";

describe("activeFilters (unit)", () => {
  it("normalizeBadge trims + lowercases", () => {
    expect(normalizeBadge("  ReAcT  ")).toBe("react");
  });

  it("toggleFilter adds badge if missing", () => {
    expect(toggleFilter([], "React")).toEqual(["React"]);
  });

  it("toggleFilter removes badge if already present (case-insensitive)", () => {
    expect(toggleFilter(["React"], "react")).toEqual([]);
  });

  it("removeFilter removes one badge (case-insensitive)", () => {
    expect(removeFilter(["React", "Frontend"], "REACT")).toEqual(["Frontend"]);
  });

  it("clearFilter returns empty array", () => {
    expect(clearFilter()).toEqual([]);
  });
});
