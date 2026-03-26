/*
 * Display-only filter badge used in the active filter bar.
 * Reuses the shared JobBadge styling without making the badge itself interactive.
 */
import JobBadge from "@/components/shared/JobBadge.component";

function FilterBadge({ label }) {

    return (
        <div className="pointer-events-none">
            <JobBadge label={label}
            className="rounded-r-none hover:bg-secondary hover:text-inherit"/>
        </div>
    )

}
export default FilterBadge;
