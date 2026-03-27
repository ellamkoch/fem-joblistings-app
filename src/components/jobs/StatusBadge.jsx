/**
 * StatusBadge.jsx
 *
 * Visual badges for the "new" and "featured" job listing states.
 * The decision to render them lives in JobCard component.
 */

import { Badge } from '@/components/ui/badge';

/**
 * Displays status badges for job listings (NEW! and FEATURED).
 *
 * @param {object} props - Component props.
 * @param {boolean} [props.isNew=false] - Whether to display the "NEW!" badge.
 * @param {boolean} [props.isFeatured=false] - Whether to display the "FEATURED" badge.
 * @returns {JSX.Element} Status badges container with conditional rendering.
 */
function StatusBadge({ isNew, isFeatured }) {
  const newBadge = 'bg-primary text-center font-semibold pt-1.5 h-5 w-12 tracking-wide';
  const featuredBadge =
    'bg-foreground text-background text-center font-semibold pt-1.5 h-5 w-17 tracking-wide';

  return (
    <div className="status-badges flex items-center gap-2">
      {isNew && (
        <Badge variant="default" aria-label="new job" className={newBadge}>
          NEW!
        </Badge>
      )}
      {isFeatured && (
        <Badge variant="default" aria-label="featured job" className={featuredBadge}>
          FEATURED
        </Badge>
      )}
    </div>
  );
}

export default StatusBadge;
