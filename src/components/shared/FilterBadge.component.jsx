//FilterBadge.component
//This file is for the styling for the Filtered Badges.
//Reusing the JobBadges for styling simplicity, put passing through props so its display only here and badges/tags are removed by the X or Clear Btns.
import JobBadge from "@/components/shared/JobBadge.component";

function FilterBadge({ label }) {

    return (
        <div className="pointer-events-none">
            <JobBadge label={label}/>
        </div>
    )

}
export default FilterBadge;
