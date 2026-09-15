import { capitalizeWords } from '@/api/jobs';

/**
 * Utility functions for managing active badge filters in the jobs list.
 *
 * - `normalizeBadge` — Normalizes arbitrary badge text to lowercase for consistent comparison.
 * - `toggleFilter` — Toggles inclusion of a badge in the active filter set.
 * - `removeFilter` — Removes a specific badge from active filters.
 * - `clearFilter` — Clears all active filters at once.
 */

/**
 * Normalizes a badge value to a consistent key for comparison.
 * Converts to lowercase and trims whitespace for case-insensitive, consistent matching.
 *
 * @param {string} badge - Badge text to normalize.
 * @returns {string} Normalized value (lowercase and trimmed).
 */
function normalizeBadge(badge) {
  return String(badge).trim().toLowerCase();
}

/**
 * Toggles a badge on/off in the active filters array.
 * If the badge is already in the array (case-insensitive), it removes it.
 * Otherwise, it adds the badge to the array with proper capitalization.
 *
 * @param {string[]} activeBadges - Current array of selected filter badges.
 * @param {string} badge - Badge text to toggle.
 * @returns {string[]} Updated filter badges array.
 */
function toggleFilter(activeBadges, badge) {
  const normalizedBadge = normalizeBadge(badge);

  const existingIndex = activeBadges.findIndex((b) => normalizeBadge(b) === normalizedBadge);

  const nextBadges = activeBadges.slice();

  if (existingIndex !== -1) {
    nextBadges.splice(existingIndex, 1);
    return nextBadges;
  }

  nextBadges.push(capitalizeWords(String(badge).trim()));
  return nextBadges;
}

/**
 * Removes a specific badge from the active filters array.
 * Performs case-insensitive matching using normalizeBadge.
 *
 * @param {string[]} activeBadges - Current array of selected filter badges.
 * @param {string} badge - Badge text to remove.
 * @returns {string[]} Updated filter badges array without the removed badge.
 */
function removeFilter(activeBadges, badge) {
  const normalizedBadge = normalizeBadge(badge);
  return activeBadges.filter((b) => normalizeBadge(b) !== normalizedBadge);
}

/**
 * Clears all badges from the active filters.
 *
 * @returns {string[]} Empty filter array.
 */
function clearFilter() {
  return [];
}

export { normalizeBadge, toggleFilter, removeFilter, clearFilter };
