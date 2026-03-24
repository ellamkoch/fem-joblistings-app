//JobList.jsx
//This file handles the render for the info on the main page - JobListPage. It pulls info with the custom hook useJobs from Supabase. It also pulls in the filter bar and handles the final logic of the filtering of the badges on the page w/ the clear button.

//react imports
import { useMemo, useState } from "react";

import { Skeleton } from "@components/ui/skeleton";

//child components
import JobCard from "@components/jobs/JobCard";
import FilterBar from "@components/jobs/FilterBar";

import {
  normalizeBadge,
  toggleFilter,
  removeFilter,
  clearFilter,
} from "@/utils/activeFilters";
import { useJobsContext } from "@/contexts/JobsContext";

function JobList() {
    //filterbar needs to be an empty array to start
    const [filter, setFilter] = useState([]);
    // jobs data is shared app-wide so the fetch only happens once
    const {
        jobs,
        loading,
        error
    } = useJobsContext();

    //handles the toggling of the badges for the filter
    const handleFilterBadge = (badge) => {
        const cleanBadge = normalizeBadge(badge);
        setFilter((prevBadges) => toggleFilter(prevBadges, cleanBadge))
    };
    //removes 1 filter by clicking the X
    const handleRemoveFilter = (badge) => {
        const cleanBadge = normalizeBadge(badge);
        setFilter((prevBadges) => removeFilter(prevBadges, cleanBadge));
    };
    //clears the whole filter bar
    const handleClearFilter = () => {
        setFilter(clearFilter());
    };

    const visibleJobs = useMemo(() => jobs.filter((job) => {
    // if no filters show everything
    if (filter.length === 0) return true;

    // reduce filters down to one boolean: does job match ALL badges?
    return filter.reduce((matchingBadges, badge) => {
        if (!matchingBadges) return false;

        if (normalizeBadge(job.role) === badge) return true;
        if (normalizeBadge(job.level) === badge) return true;
        if (job.languages && normalizeBadge(job.languages).includes(badge)) return true;
        if (job.tools && normalizeBadge(job.tools).includes(badge)) return true;

        return false;
    }, true);
    }), [jobs, filter]);

    return (
        <>
            <section>
                <div className="error">
                        {error && (
                            <p className="error-text text-destructive text-center">
                                {error}
                            </p>
                        )}

                        {!loading && !error && jobs.length === 0 && (
                            <p className="no-jobs text-center text-lg">
                                All jobs have been filled at this time. Check back later.
                            </p>
                        )}
                    </div>
                        <FilterBar
                            badges={filter}
                            removeFilter={handleRemoveFilter}
                            clearFilter={handleClearFilter}
                        />

                        {loading ? (
                            <div className="skeleton divide-y divide-border">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-4">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-full max-w" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="job-list flex flex-col gap-y-4">
                                {visibleJobs.map((job) => (
                                    <JobCard
                                    key={job.id}
                                    job={job}
                                    onToggleTag={handleFilterBadge}
                                    />
                                ))}

                            </div>
                        )
                    }
                </section>
        </>
    );

}

export default JobList;

