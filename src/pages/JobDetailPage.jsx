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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import JobCard from '@/components/jobs/JobCard';
import { useParams } from 'react-router-dom';

import { useBookmarksContext } from '@/contexts/BookmarksContext';
import { useJobsContext } from '@/contexts/JobsContext';

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
  const listSectionTitles = new Set(['Responsibilities', 'Requirements', 'Nice to Have']);
  const roleSections = selectedJob
    ? [
        {
          title: 'Job Description',
          content: selectedJob.jobDesc,
          className: 'lg:col-span-2',
        },
        {
          title: 'Responsibilities',
          content: selectedJob.responsibilities,
        },
        {
          title: 'Requirements',
          content: selectedJob.requirements,
        },
        {
          title: 'Nice to Have',
          content: selectedJob.nice2have,
        },
        {
          title: 'About',
          content: selectedJob.about,
        },
        {
          title: 'Equal Opportunity',
          content: selectedJob.eoeStatement,
          muted: true,
          className: 'lg:col-span-2',
        },
      ].filter((section) => section.content)
    : [];

  return (
    <>
      <div>
        <h1 className="sr-only">
          {selectedJob ? `${selectedJob.position} job details` : 'Job details'}
        </h1>
        <div className="error">
          {error && (
            <p className="error-text text-center text-destructive" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && !selectedJob && (
            <p className="no-jobs text-center text-lg text-destructive" role="alert">
              Oops! Seems the details of this job are lost, like our keys. Check back later.
            </p>
          )}
        </div>

        {loading ? (
          <div
            className="skeleton divide-y divide-border"
            role="status"
            aria-live="polite"
            aria-label="Loading job details"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-full max-w" />
              </div>
            ))}
          </div>
        ) : (
          <div className="job-details-container">
            {selectedJob && (
              <section className="space-y-4" aria-labelledby="job-summary-title">
                <div>
                  <BackButton />
                </div>
                <Heading hLevel={2} id="job-summary-title" className="sr-only">
                  Job summary
                </Heading>
                <JobCard
                  job={selectedJob}
                  isBookmarked={bookmarksState.isBookmarked(selectedJob.id)}
                  addBookmark={bookmarksState.addBookmark}
                  removeBookmark={bookmarksState.removeBookmark}
                />
              </section>
            )}
          </div>
        )}
        <div className="mt-6 sm:mt-8">
          {selectedJob && (
            <section
              className="mx-auto max-w-6xl space-y-4 sm:space-y-5 lg:space-y-6"
              aria-labelledby="role-overview-title"
            >
              <Card className="rounded-2xl border-border/70 shadow-sm">
                <CardHeader className="gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Role overview
                  </p>
                </CardHeader>

                <CardContent className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                  {roleSections.map((section) => (
                    <article
                      key={section.title}
                      className={`rounded-xl border border-border/70 bg-accent/30 p-5 sm:p-6 ${section.className ?? ''}`}
                    >
                      <Heading hLevel={3} className="text-lg tracking-tight text-foreground">
                        {section.title}
                      </Heading>
                      {listSectionTitles.has(section.title) ? (
                        <ul
                          className={`mt-3 list-disc space-y-2 pl-5 text-sm leading-7 sm:text-base ${
                            section.muted ? 'text-muted-foreground' : 'text-foreground/90'
                          }`}
                        >
                          {section.content
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => (
                              <li key={`${section.title}-${line}`}>{line}</li>
                            ))}
                        </ul>
                      ) : (
                        <p
                          className={`mt-3 whitespace-pre-line text-sm leading-7 sm:text-base ${
                            section.muted ? 'text-muted-foreground' : 'text-foreground/90'
                          }`}
                        >
                          {section.content}
                        </p>
                      )}
                    </article>
                  ))}
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
