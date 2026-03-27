/*
 * Visual badges for the "new" and "featured" job states.
 * The decision to render them lives in JobCard.
 */

import { Badge } from "@/components/ui/badge";

function StatusBadge ({ isNew, isFeatured }) {
    const newBadge ="bg-primary text-center font-semibold pt-1.5 h-5 w-12 tracking-wide";
    const featuredBadge ="bg-foreground text-background text-center font-semibold pt-1.5 h-5 w-17 tracking-wide";

    return (
        <div className="status-badges flex items-center gap-2">
            {isNew && (
                <Badge
                    variant="default"
                    aria-label="new job"
                    className={newBadge}
                    >NEW!
                </Badge>
                    )}
                    {isFeatured && (
                <Badge
                    variant="default"
                    aria-label="featured job"
                    className={featuredBadge}
                    >FEATURED
                </Badge>
            )}
        </div>
    );
}

export default StatusBadge;
