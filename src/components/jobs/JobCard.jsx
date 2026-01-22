//JobCard.jsx
//This file displays a single card with the info as a list and is imported into the JobList.
//Clicking company name takes you to the job details page for that job.
//Clicking the badges (Role/Level/Language/tools) on a job will make the jobs filter. Filter logic owned by JobListPage.
//It displays:
//  * Logo_url (logo files are saved in supabase, url is in table)
//  * Company
//  * Status Badges (New/Featured)
//  * Position
//  * Posted_at date
//  * Contract (FT/PT/Contract)
//  * Location
//  * Job Badges for filtering (role, level, languages, tools) (no filter log here)
import { Link } from "react-router";


// import StatusBadge from "@components/shared/StatusBadge.component";
import StatusBadge from "@components/shared/StatusBadge.component";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
// import Heading from "@components/shared/Heading.component";

export default function JobCard ({ job }) {

    //guard error
    if (!job) {
        return null;
    }
 //created variable to hold the template literal for the logo url saved in the table. logos are saved in a supabase folder and then public links to them are in the table in text.
    const logoSrc = job.logo_url;

    //StatusBadge variables to convert the booleans from Supabase for the conditional UI
    const newJob = job.is_new;
    const featuredJob = job.is_featured;

    // const handleBadgeToggle = () => {
    //     onBadgeClick(job.id, !job.role, !job.level, !job.languages, !job.tools);
    // };

    // const assignLabel = () => {
    //     label(job.id, !job.is_new, !job.is_featured);

    // };

    return (
        <Card className="job-card-container px-4 md:mb-5 relative sm:py-5 py-15 xs:pb-10 mb-10 sm:static">
            {/* <div className="error">
                    {!newJob || !featuredJob || (
                        <p className="job-badges hidden"></p>
                    )}
                </div> */}

            <div className="flex sm:gap-2">
            <div className="logo w-auto h-auto absolute -top-12 px-0 sm:static ">
                {logoSrc && <img src={logoSrc} alt={`${job.company} logo`}/>}
            </div>
                <div className="top-line px-4" >
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-primary font-bold pr-4">{job.company}</span>
                            {(newJob || featuredJob) && (
                                <StatusBadge isNew={newJob} isFeatured={featuredJob} />
                            )}
                        </div>
                    </div>
            </div>
            <CardTitle className="position">
                <Link to={`/job/${job.id}`}>
                    {job.position}
                </Link>
            </CardTitle>
            <div className="justify-between">
            <CardDescription>
                {job.posted_at} &middot; {job.contract} &middot; {job.location}
            </CardDescription>
            </div>
            <Separator className="sm:hidden"></Separator>
            <div className="">
            <CardContent className="px-0">
                <p>Job Badges will go here</p>
            </CardContent>
            </div>

        </Card>
    );
}
// {/*

//             <div className="job-badges">
//                 <div
//                     checked={job.role}
//                     onClick={handleBadgeToggle}
//                     aria-label="Click to filter job list"
//                     >
//                         {job.role}
//                 </div >
//                 <div
//                     checked={job.level}
//                     onClick={handleBadgeToggle}
//                     aria-label="Click to filter job list"
//                     >
//                         {job.level}
//                 </div >
//                 <div
//                     checked={job.languages}
//                     onClick={handleBadgeToggle}
//                     aria-label="Click to filter job list"
//                     >
//                         {job.languages}
//                 </div >
//                 <div
//                     checked={job.tools}
//                     onClick={handleBadgeToggle}
//                     aria-label="Click to filter job list"
//                     >
//                         {job.tools}
//                 </div > */}
