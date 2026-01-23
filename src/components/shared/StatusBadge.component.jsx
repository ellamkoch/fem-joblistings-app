//StatusBadge.component.jsx
//This file holds the styles for the new and featured job badges, which will conditionally show up if that is marked true within Supabase on the is_new and is_featured parts of the table.
//Only styling is here.
//Conditional logic is in the JobCard.

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
