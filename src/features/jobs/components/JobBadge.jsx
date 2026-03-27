/*
 * Shared badge component for job metadata such as role, level,
 * languages, and tools. Badges can also act as filter triggers.
 */

import { Badge } from "@/components/ui/badge";

/**
 * Renders a job metadata badge as either a display pill or an interactive filter button.
 *
 * @param {object} props - Component props.
 * @param {string} props.label - Visible badge text.
 * @param {(label: string) => void} [props.onToggle] - Optional click handler for filtering.
 * @param {string} [props.className] - Optional extra classes.
 * @returns {JSX.Element} Display or interactive badge.
 */
function JobBadge({ label, onToggle, className = "" }) {
    const allJobBadges ="bg-secondary text-center font-semibold tracking-wide rounded-sm pt-1 text-base rounded-xs ";

    if (onToggle) {
        return (
            <Badge asChild variant="default" className={`${allJobBadges} ${className}`}>
                <button
                    type="button"
                    onClick={() => onToggle(label)}
                    className="cursor-pointer hover:bg-primary hover:text-secondary focus-visible:ring-0"
                >
                    {label}
                </button>
            </Badge>
        );
    }

    return (
        <Badge
                variant="default"
                className={`${allJobBadges} ${className}`}
                >{label}
            </Badge>
    );
}

export default JobBadge;
