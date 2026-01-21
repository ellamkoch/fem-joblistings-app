//JobListPage.jsx
//This is the main/home page of our file and will contain a list of jobs and have the ability to filter the jobs based on the job badges that are clicked. when those are clicked, a filter bar will appear at the top of the page that will have filters that can be removed individually or all can be cleared at once with the "clear" button. Each job title leads to a jobDetails page with info pulled from supabase table.
//Needs to include a not visible Job Listings h1 for screen readers
import Heading from "@/components/shared/Heading.component";
import JobList from "@components/jobs/JobList";

// import Card from "@/components/shared/Card.component";
// import FilterBar from "@components/jobs/FilterBar";

// import { Skeleton } from "@/components/ui/skeleton";

function JobListPage() {

    return (
        <>
        <div>
            <Heading hLevel={1} className="flex text-xl primary">Job Listings</Heading>
       </div>
       <div>
            <JobList />

        </div>
        </>
    );
}

export default JobListPage;
