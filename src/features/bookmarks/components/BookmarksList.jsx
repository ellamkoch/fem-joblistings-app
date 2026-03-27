/* Renders the saved jobs page body for loading, empty, and populated states. */

import JobCard from "@/features/jobs/components/JobCard";
import { Card, CardContent } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

/**
 * Displays the user's bookmarked jobs using the shared job card layout.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.bookmarks - Saved jobs to render.
 * @param {boolean} props.loading - Whether bookmark data is loading.
 * @param {string | null} props.error - Bookmark load/remove error.
 * @param {(jobId: string) => Promise<void>} props.removeBookmark - Removes a job bookmark.
 * @returns {JSX.Element} Saved jobs content area.
 */
function BookmarksList({ bookmarks, loading, error, removeBookmark }) {
  return (
    <section>
      <div className="error">
        {error && (
          <p className="error-text text-center text-destructive">
            {error}
          </p>
        )}
      </div>

      {loading ? (
        <div className="skeleton divide-y divide-border">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-full max-w" />
            </div>
          ))}
        </div>
      ) : null}

      {!loading && !error && bookmarks.length === 0 ? (
        <Card className="border-dashed border-primary/30 bg-card/80">
          <CardContent className="space-y-2 px-6 py-8 text-center sm:px-8">
            <p className="text-lg font-semibold text-foreground">
              No saved jobs yet
            </p>
            <p className="text-sm text-muted-foreground">
              Save roles from the job list and they will show up here for quick access.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {!loading && bookmarks.length > 0 ? (
        <div className="job-list flex flex-col gap-y-4">
          {bookmarks.map((job) => (
            // bookmarks reuse the same job card so position links and metadata stay consistent
            <JobCard
              key={job.id}
              job={job}
              bookmarkMode="remove"
              removeBookmark={removeBookmark}
              isBookmarked
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default BookmarksList;
