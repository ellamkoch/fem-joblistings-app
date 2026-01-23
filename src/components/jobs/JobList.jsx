//JobList.jsx
//This file handles the render for the info on the main page - JobListPage. It pulls info with the custom hook useJobs from Supabase.

//react imports
// import { useMemo } from "react";

import { Skeleton } from "@components/ui/skeleton";
// import Card from "@components/shared/Card.component";

//child components
import JobCard from "@components/jobs/JobCard";
// import FilterBar from "@components/jobs/FilterBar";

//custom hook import
import useJobs from "@hooks/useJobs";

function JobList() {
    // const [filter, setFilter] = useState("all");
    //1. need to destructure the custom hook
    const {
        jobs,
        loading,
        error
    } = useJobs();


    // const allJobs = useMemo(() => jobs.length, [jobs]);

    // const jobs = useMemo(() => jobs.filter((job) => {
    //     // if (filter === "active") return !job.
    //     // return true;
    // }) [jobs ]);
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
                                {jobs.map((job) => (
                                    <JobCard
                                    key={job.id}
                                    job={job}
                                    onToggleTag={() => {}}
                                    />
                                ))}
                                <JobCard />
                            </div>
                        )
                    }
                </section>
        </>
    );

}

export default JobList;

