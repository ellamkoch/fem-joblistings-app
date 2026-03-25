//JobListPage.jsx
//This is the main/home page of our file and will contain a list of jobs and have the ability to filter the jobs based on the job badges that are clicked. when those are clicked, a filter bar will appear at the top of the page that will have filters that can be removed individually or all can be cleared at once with the "clear" button. Each job title leads to a jobDetails page with info pulled from supabase table.
//Needs to include a not visible Job Listings h1 for screen readers
import JobList from "@components/jobs/JobList";
import ProtectedPageHeader from "@/components/auth/ProtectedPageHeader";

// import Card from "@/components/shared/Card.component";
// import FilterBar from "@components/jobs/FilterBar";


function JobListPage() {

    return (
        <>
        <div>
            <h1 className="hidden">Job Listings</h1>
            <ProtectedPageHeader compact>
                <div className="space-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Dashboard
                    </p>
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            Job Listings
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Browse and filter current openings.
                        </p>
                    </div>
                </div>
            </ProtectedPageHeader>
            <JobList />

        </div>
        </>
    );
}

export default JobListPage;
