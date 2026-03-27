/*
 * Displays a single job card for the list, detail, and bookmark views.
 *
 * - Company and position link to the job details page.
 * - Role/level/language/tool badges can trigger filtering via `onToggleTag`.
 */
import { Link } from "react-router";

import JobBadge from "@components/shared/JobBadge.component";
import StatusBadge from "@components/shared/StatusBadge.component";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import BookmarkButton from "@/components/jobs/BookmarkButton";
import { formatDate } from "@/utils/formatDate";
/**
 * Renders a single job card for the list, detail, and bookmarks views.
 *
 * @param {object} props - Component props.
 * @param {object} props.job - Normalized job object to display.
 * @param {(badge: string) => void} [props.onToggleTag] - Optional filter toggle callback for job badges.
 * @param {boolean} [props.isBookmarked=false] - Whether the current job is already saved.
 * @param {"toggle" | "remove"} [props.bookmarkMode="toggle"] - Whether the action toggles or only removes.
 * @param {(job: object) => Promise<void>} [props.addBookmark] - Optional save handler.
 * @param {(jobId: string) => Promise<void>} [props.removeBookmark] - Optional remove handler.
 * @returns {JSX.Element | null} Rendered job card or null when no job is provided.
 */
export default function JobCard({
  job,
  onToggleTag,
  isBookmarked = false,
  bookmarkMode = "toggle",
  addBookmark,
  removeBookmark,
}) {
  // Guard against missing job data.
  if (!job) {
    return null;
  }

  // Logo URLs are already normalized from the backend.
  const logoSrc = job.logo_url;

  // Normalize badge booleans for the conditional UI.
  const newJob = job.is_new;
  const featuredJob = job.is_featured;

  const relativePostDate = formatDate(job.posted_at);

  const selectedLanguages = Array.isArray(job.languages) ? job.languages : [];

  const selectedTools = Array.isArray(job.tools) ? job.tools : [];

  return (
    <Card className="job-card-container relative mb-10 flex flex-col gap-5 px-4 py-15 pb-8 text-lg sm:static sm:py-5 sm:pb-15 md:mb-5 md:flex-row md:items-center md:gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 ">
          <div className="logo w-auto h-auto absolute -top-12 px-0 sm:static shrink-0 ">
            {logoSrc && (
                <img className="job-card-__logo"
                src={logoSrc}
                alt={`${job.company} logo`}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
                />
              )}
          </div>
          <div className="top-line px-4 flex flex-col min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="min-w-0 truncate text-primary font-bold">
                  {job.company}
                </span>
                {(newJob || featuredJob) && (
                  <StatusBadge isNew={newJob} isFeatured={featuredJob} />
                )}
              </div>
              {removeBookmark ? (
                <BookmarkButton
                  job={job}
                  isBookmarked={isBookmarked}
                  mode={bookmarkMode}
                  addBookmark={addBookmark}
                  removeBookmark={removeBookmark}
                />
              ) : null}
            </div>
            <CardTitle className="position mt-3 hover:text-primary cursor-pointer text-lg">
              <Link to={`/job/${job.id}`}>{job.position}</Link>
            </CardTitle>
            <CardDescription className="metadata-list mt-3 text-lg tracking-wide ">
              {relativePostDate} &middot; {job.contract} &middot; {job.location}
            </CardDescription>
          </div>
        </div>
      </div>
      <Separator className="sm:hidden"></Separator>
      <div className="">
        <CardContent className="md:ml-auto md:self-center text-lg px-2">
          <div className="flex flex-wrap items-center gap-2 font-semibold">
            {job.role && <JobBadge label={job.role} onToggle={onToggleTag} />}
            {job.level && <JobBadge label={job.level} onToggle={onToggleTag} />}
            {selectedLanguages.map((lang) => (
              <JobBadge key={lang} label={lang} onToggle={onToggleTag} />
            ))}
            {selectedTools.map((tool) => (
              <JobBadge key={tool} label={tool} onToggle={onToggleTag} />
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
