//JobBadge.component.jsx
//This file is for the job badges and encompasses the following fields from Supabase
//  * role
//  * level
//  * languages
//  * tools
// Badges will be clickable so you can filter jobs based upon what is clicked.

import { Badge } from "@/components/ui/badge";

function JobBadge({ label, onToggle }) {
    const allJobBadges ="bg-secondary text-center font-semibold tracking-wide rounded-sm hover:bg-primary hover:text-secondary cursor-pointer pt-1 text-base rounded-xs ";


    return (
        <div className="job-badges flex flex-wrap items-center gap-3">
            <Badge
                variant="default"
                onClick={() => onToggle(label)}
                className={allJobBadges}
                >{label}
            </Badge>
        </div>
    );
}

export default JobBadge;
