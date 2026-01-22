//JobDetailPage.jsx
//This file will dynamically show the details of the job that is selected from the main page, the JobListPage. Its linked to ids in the supabase table to pull the info needed for the page, which is:
//  * A card with the job info from the listing
//  * A job desc
//  * job responsibilities
//  * job requirements
//  * nice2have skills for the job
//  * about the company
//  * eoe statement for the company
// This page will have a back button to go back to the main page.


import Heading from "@/components/shared/Heading.component";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import JobCard from "@/components/jobs/JobCard";
import { useParams } from 'react-router-dom';

import useJobs from "@hooks/useJobs";


function JobDetailPage() {
    //Destructure the hook for useJobs to use it to pull info in here.
    const {
        jobs,
        loading,
        error
    } = useJobs();

    //pulling the id of the page w/ useParams hook and putting it into a destructured variable.
     const { id }  = useParams();

     // storing the job id from the user param into a variable. parseInt converts it so it can be read/matched.

    const selectedJob = jobs.find((currentJob => currentJob.id === parseInt(id)));

    return (
        <>
            <Card>
                 <div className="error">
                    {error && (
                        <p className="error-text text-destructive text-center">
                            {error}
                        </p>
                    )}

                    {!loading && !error && !selectedJob &&  (
                        <p className="no-jobs text-center text-lg text-destructive">
                            Oops! Seems the details of this job are lost, like our keys. Check back later.
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
                     <div className="job-details-container">
                        {/* Needed selectedJob wrapped around this to get it to pull info and put it w/ the template literals. */}
                        {selectedJob && (
                            <div>

                                 {/* <div>
                                    <Heading hLevel={1} className="flex text-xl primary px-4 pb-4">
                                        Job Details for a {selectedJob.position} with {selectedJob.company}
                                    </Heading>
                                   </div> */}

                                <JobCard job={selectedJob}/>

                            </div>
                            )}
                    </div>
                )}
            </Card>
        </>
    );
}

export default JobDetailPage;


//Idea - add in a prop to make the link "false" on jobCard when reusing that part.
