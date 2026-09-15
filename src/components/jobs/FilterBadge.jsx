/**
 * FilterBadge.jsx
 *
 * Display-only filter badge used in the active filter bar.
 * Reuses shared JobBadge styling without making the badge itself interactive.
 */
import JobBadge from '@/components/jobs/JobBadge';

/**
 * Displays a single active filter badge (display-only, no interaction).
 *
 * @param {object} props - Component props.
 * @param {string} props.label - Filter badge text.
 * @returns {JSX.Element} Non-interactive filter badge display.
 */
function FilterBadge({ label }) {
  return (
    <div className="pointer-events-none">
      <JobBadge label={label} className="rounded-r-none hover:bg-secondary hover:text-inherit" />
    </div>
  );
}
export default FilterBadge;
