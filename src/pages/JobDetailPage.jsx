/**
 * JobDetailPage.jsx
 *
 * Dynamic detail page displaying comprehensive information for a selected job listing.
 *
 * Displays:
 * - Job card with company logo, position, and key metadata
 * - Job description and overview
 * - Detailed responsibilities
 * - Requirements for the role
 * - Nice-to-have skills
 * - Company information and EOE statement
 * - Bookmark/save job functionality
 * - Back navigation to job list
 */

import BackButton from '@/components/layout/BackButton';
import Heading from '@/components/shared/Heading.component';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

import ProtectedPageHeader from '@/features/auth/components/ProtectedPageHeader';
import JobCard from '@/features/jobs/components/JobCard';
import { useParams } from 'react-router-dom';

import { useBookmarksContext } from '@/features/bookmarks/context/BookmarksContext';
import { useJobsContext } from '@/features/jobs/context/JobsContext';

/**
 * Displays detailed information for a single job listing.
 *
 * @returns {JSX.Element} Job detail page with full job information.
 */
function JobDetailPage() {
  const bookmarksState = useBookmarksContext();
  // Read shared jobs state from the provider so we do not refetch here.
  const { jobs, loading, error } = useJobsContext();

  //Pulling the job id from the URL using React Router's useParams hook.
  const { id } = useParams();

  // Match route params against the normalized string ids returned by the API layer.
  const selectedJob = jobs.find((currentJob) => currentJob.id === String(id));

  return (
    <>
      <div>
        <div className="error">
          {error && <p className="error-text text-destructive text-center">{error}</p>}

          {!loading && !error && !selectedJob && (
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
            <ProtectedPageHeader>
              <div className="space-y-1">
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Job Details
                  </p>
                  <BackButton />
                </div>
              </div>
            </ProtectedPageHeader>
            {/* Needed selectedJob wrapped around this to get it to pull info and put it w/ the template literals. */}
            {selectedJob && (
              <div>
                <JobCard
                  job={selectedJob}
                  isBookmarked={bookmarksState.isBookmarked(selectedJob.id)}
                  addBookmark={bookmarksState.addBookmark}
                  removeBookmark={bookmarksState.removeBookmark}
                />
              </div>
            )}
          </div>
        )}
        <div className="px-4">
          {selectedJob && (
            <div className="mt-8">
              <section className="">
                <Heading hLevel={2} className="text-lg">
                  Job Description
                </Heading>
                <p className="text-base whitespace-pre-line mt-1">{selectedJob.jobDesc}</p>
                <Separator />
                <Heading hLevel={3} className="text-lg  mt-4">
                  Responsibilities
                </Heading>
                <p className="text-base leading-none whitespace-pre-line mt-1">
                  {selectedJob.responsibilities}
                </p>
              </section>
              <Separator />
              <section className="mt-4">
                <Heading hLevel={2} className="text-lg ">
                  Requirements
                </Heading>
                <p className="text-base leading-none whitespace-pre-line mt-1">
                  {selectedJob.requirements}
                </p>
                <Separator />
                <div className="mt-4">
                  <Heading hLevel={3} className="text-lg ">
                    Nice to Have
                  </Heading>
                  <p className="text-base leading-none whitespace-pre-line mt-1">
                    {selectedJob.nice2have}
                  </p>
                </div>
              </section>
              <Separator />
              <section className="mt-4">
                <Heading hLevel={2} className="text-lg ">
                  About
                </Heading>
                <p className="text-base whitespace-pre-line mt-1">{selectedJob.about}</p>
              </section>
              <Separator />
              <section className="mt-4">
                <Heading hLevel={2} className="text-lg ">
                  Equal Opportunity
                </Heading>
                <p className=" opacity-70 whitespace-pre-line mt-1">{selectedJob.eoeStatement}</p>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
