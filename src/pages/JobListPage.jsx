/**JobListPage.jsx
This is the main/home page of our file and will contain a list of jobs and have the ability to filter the jobs based on the job badges that are clicked. when those are clicked, a filter bar will appear at the top of the page that will have filters that can be removed individually or all can be cleared at once with the "clear" button. Each job title leads to a jobDetails page with info pulled from supabase table.
*/
import JobList from "@components/jobs/JobList";
import ProtectedPageNav from "@/components/auth/ProtectedPageNav";
import ProtectedPageHeader from "@/components/auth/ProtectedPageHeader";


function JobListPage() {
    return (
        <div>
            <h1 className="hidden">Job Listings</h1>
            <ProtectedPageHeader compact>
                <div className="space-y-1">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Dashboard
                        </p>
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                Job Listings
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Browse, filter, and save current openings.
                            </p>
                        </div>
                    </div>
                    <ProtectedPageNav />
                </div>
            </ProtectedPageHeader>
            <JobList />
        </div>
    );
}

export default JobListPage;
