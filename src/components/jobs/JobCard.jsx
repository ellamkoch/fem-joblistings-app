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

// import StatusBadge from "@components/shared/StatusBadge.component";
// import JobBadge from "@components/shared/JobBadge.component";
// import Card from "@components/shared/Card.component";
// import Heading from "@components/shared/Heading.component";

export default function JobCard () {

    // const handleBadgeToggle = () => {
    //     onBadgeClick(job.id, !job.role, !job.level, !job.languages, !job.tools);
    // };

    // const assignLabel = () => {
    //     label(job.id, !job.is_new, !job.is_featured);

    // };

    return (
        <div className="job-card flex text-center">
            <div className="logo text-center">
                <p>Job Cards will go here</p>
               {/* <img src="{job.logo_url}" alt="Company logo"></img>
            </div>
            <div className="job-details">
                <div className="top-line">
                    <div className="company-name">
                        {job.company}
                    </div>
                    <span className="status-badges">
                        <div
                            checked={job.is_new}
                            onChange={assignLabel}
                            aria-label="New job"
                        />
                        <div
                            checked={job.is_featured}
                            onChange={assignLabel}
                            aria-label="Featured job"
                        />
                    </span>
                </div>
                <div className="job-title">
                    <Heading hLevel={2}>
                        {job.position}
                    </Heading>
                </div>
                <div className="job-info">
                    <p>{job.posted_at} &middot; {job.contract} &middot; {job.location}</p>
                </div>
            </div>
            <div className="job-badges">
                <div
                    checked={job.role}
                    onClick={handleBadgeToggle}
                    aria-label="Click to filter job list"
                    >
                        {job.role}
                </div >
                <div
                    checked={job.level}
                    onClick={handleBadgeToggle}
                    aria-label="Click to filter job list"
                    >
                        {job.level}
                </div >
                <div
                    checked={job.languages}
                    onClick={handleBadgeToggle}
                    aria-label="Click to filter job list"
                    >
                        {job.languages}
                </div >
                <div
                    checked={job.tools}
                    onClick={handleBadgeToggle}
                    aria-label="Click to filter job list"
                    >
                        {job.tools}
                </div > */}
            </div>
        </div>
    );
}
