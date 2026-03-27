/**
 * Formats a date string into a human-readable relative time format.
 *
 * Uses Intl.RelativeTimeFormat to display dates in a user-friendly way:
 * - Dates within a week show as "X day(s) ago"
 * - Dates within a month show as "X week(s) ago"
 * - Older dates show as "X month(s) ago"
 *
 * @param {string} dateString - ISO date string or any valid date format.
 * @returns {string} Formatted relative date (e.g., "2 days ago") or "Date unavailable" if invalid.
 */
export function formatDate(dateString) {
  if (!dateString) return 'Date unavailable';

  const postedDate = new Date(dateString);

  if (Number.isNaN(postedDate.getTime())) {
    return 'Date unavailable';
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
  const now = new Date();
  const diffMs = postedDate.getTime() - now.getTime();

  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;
  const month = day * 30;

  const absDiff = Math.abs(diffMs);

  if (absDiff < week) {
    return rtf.format(Math.round(diffMs / day), 'day');
  }

  if (absDiff < month) {
    return rtf.format(Math.round(diffMs / week), 'week');
  }

  return rtf.format(Math.round(diffMs / month), 'month');
}
