import { capitalizeWords } from "@/lib/api/jobs";

/**
 * Utils for active badge filters in the jobs list.
 *
 * - `normalizeBadge` — normalizes arbitrary badge text for comparison.
 * - `toggleFilter` — toggles inclusion of a badge in active filter set.
 * - `removeFilter` — removes a badge from active filters.
 * - `clearFilter` — clears all active filters.
 */

/**
 * Normalize a badge value to a consistent key.
 * @param {string} badge - Text to normalize.
 * @returns {string} Normalized value (lowercase, trimmed).
 */
function normalizeBadge(badge) {
  //"normalizes" the text to trim off anything extra and makes the text lowercase if its written in caps for consistency
  return String(badge).trim().toLowerCase();
}
/**
 * Toggle a badge on/off in the active badges array.
 * @param {string[]} activeBadges - Current selected badges.
 * @param {string} badge - Badge to toggle.
 * @returns {string[]} Updated selected badges.
 */
function toggleFilter(activeBadges, badge) {
  const normalizedBadge = normalizeBadge(badge);

  const existingIndex = activeBadges.findIndex(
    (b) => normalizeBadge(b) === normalizedBadge,
  );

  const nextBadges = activeBadges.slice();

  if (existingIndex !== -1) {
    nextBadges.splice(existingIndex, 1);
    return nextBadges;
  }

  nextBadges.push(capitalizeWords(String(badge).trim()));
  return nextBadges;
}

/**
 * Remove a badge from the active badges array.
 * @param {string[]} activeBadges - Current selected badges.
 * @param {string} badge - Badge to remove.
 * @returns {string[]} Updated selected badges.
 */
function removeFilter(activeBadges, badge) {
  const normalizedBadge = normalizeBadge(badge);
  return activeBadges.filter((b) => normalizeBadge(b) !== normalizedBadge);
}

/**
 * Clear all badges from the filter state.
 * @returns {string[]} Empty filter array.
 */
function clearFilter() {
  return [];
}

export { normalizeBadge, toggleFilter, removeFilter, clearFilter };
