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

import BackButton from "@/components/shared/BackButton.component";
import Heading from "@/components/shared/Heading.component";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

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
     const { id } = useParams();

     // storing the job id from the user param into a variable. parseInt converts it so it can be read/matched.
    const selectedJob = jobs.find((currentJob => currentJob.id === parseInt(id)));

    return (
        <>
            <div>
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
                        <div className="back-btn flex justify-end">
                            <BackButton />
                        </div>
                        {/* Needed selectedJob wrapped around this to get it to pull info and put it w/ the template literals. */}
                        {selectedJob && (
                            <div>
                                <JobCard job={selectedJob}/>
                            </div>
                            )}
                    </div>
                )}
                <div className="px-4">
                    {selectedJob && (
                        <div className="mt-8">
                            <section className="">
                                <Heading hLevel={2} className="text-lg">Job Description</Heading>
                                    <p className="text-base whitespace-pre-line mt-1">
                                        {selectedJob.jobDesc}
                                    </p>
                            <Separator />
                                <Heading hLevel={3} className="text-lg  mt-4">Responsibilities</Heading>
                                    <p className="text-base leading-none whitespace-pre-line mt-1">
                                        {selectedJob.responsibilities}
                                    </p>
                            </section>
                        <Separator />
                            <section className="mt-4">
                                <Heading hLevel={2} className="text-lg ">Requirements</Heading>
                                    <p className="text-base leading-none whitespace-pre-line mt-1">
                                        {selectedJob.requirements}
                                    </p>
                        <Separator />
                                <div className="mt-4">
                                    <Heading hLevel={3} className="text-lg ">Nice to Have</Heading>
                                        <p className="text-base leading-none whitespace-pre-line mt-1">
                                            {selectedJob.nice2have}
                                        </p>
                                </div>
                            </section>
                        <Separator />
                            <section className="mt-4">
                                <Heading hLevel={2} className="text-lg ">About</Heading>
                                    <p className="text-base whitespace-pre-line mt-1">
                                        {selectedJob.about}
                                    </p>
                            </section>
                        <Separator />
                            <section className="mt-4">
                                <Heading hLevel={2} className="text-lg ">Equal Opportunity</Heading>
                                    <p className=" opacity-70 whitespace-pre-line mt-1">
                                        {selectedJob.eoeStatement}
                                    </p>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobDetailPage;
