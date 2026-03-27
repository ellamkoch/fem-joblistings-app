/*
 * Renders the main jobs feed, pulls shared jobs state, and keeps
 * badge-filtering interactions local to the page.
 *
 * Filtering behavior:
 * - No active filters shows all jobs.
 * - Active filters are combined with AND semantics (job must match every badge).
 * - Badges are matched against role, level, languages, and tools for each job.
 */

import { useMemo, useState } from "react";
import { Skeleton } from "@components/ui/skeleton";
import JobCard from "@/features/jobs/components/JobCard";
import FilterBar from "@/features/jobs/components/FilterBar";
import { cn } from "@/lib/utils";
import {
  normalizeBadge,
  toggleFilter,
  removeFilter,
  clearFilter,
} from "@/features/jobs/utils/activeFilters";
import { useBookmarksContext } from "@/features/bookmarks/context/BookmarksContext";
import { useJobsContext } from "@/features/jobs/context/JobsContext";

/**
 * Renders the main jobs feed and keeps badge filtering local to the page.
 *
 * @returns {JSX.Element} Filterable job list.
 */
function JobList() {
  // Start with no active filters.
  const [filter, setFilter] = useState([]);
  // jobs data is shared app-wide so the fetch only happens once
  const { jobs, loading, error } = useJobsContext();

  const bookmarksState = useBookmarksContext();
  // normalized ids make it easy for each card to know whether it is already saved
  const bookmarkedJobIds = useMemo(
    () => new Set(bookmarksState.bookmarks.map((bookmark) => bookmark.id)),
    [bookmarksState.bookmarks],
  );

  /**
   * Toggle one badge in the active filter set.
   * @param {string} badge - Raw badge text clicked by the user.
   */
  const handleFilterBadge = (badge) => {
    const cleanBadge = normalizeBadge(badge);
    setFilter((prevBadges) => toggleFilter(prevBadges, cleanBadge));
  };

  /**
   * Remove a single badge from the active filter set.
   * @param {string} badge - Raw badge text to remove.
   */
  const handleRemoveFilter = (badge) => {
    const cleanBadge = normalizeBadge(badge);
    setFilter((prevBadges) => removeFilter(prevBadges, cleanBadge));
  };

  /**
   * Clear the entire filter set.
   * @returns {void}
   */
  const handleClearFilter = () => {
    setFilter(clearFilter());
  };

  const visibleJobs = useMemo(
    () =>
      jobs.filter((job) => {
        // if no filters show everything
        if (filter.length === 0) return true;

        // reduce filters down to one boolean: does job match ALL badges?
        return filter.reduce((matchingBadges, badge) => {
          if (!matchingBadges) return false;

          const normalizeFilterBadge = normalizeBadge(badge);

          if (
            job.role &&
            normalizeBadge(job.role).includes(normalizeFilterBadge)
          )
            return true;
          if (
            job.level &&
            normalizeBadge(job.level).includes(normalizeFilterBadge)
          )
            return true;
          if (
            job.languages &&
            normalizeBadge(job.languages).includes(normalizeFilterBadge)
          )
            return true;
          if (
            job.tools &&
            normalizeBadge(job.tools).includes(normalizeFilterBadge)
          )
            return true;

          return false;
        }, true);
      }),
    [jobs, filter],
  );

  return (
    <>
      <section>
        <div className="error">
          {error && (
            <p className="error-text text-destructive text-center">{error}</p>
          )}

          {!loading && !error && jobs.length === 0 && (
            <p className="no-jobs text-center text-lg">
              All jobs have been filled at this time. Check back later.
            </p>
          )}
        </div>
        <FilterBar
          badges={filter}
          removeFilter={handleRemoveFilter}
          clearFilter={handleClearFilter}
        />

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
          <div
            className={cn(
              "job-list flex flex-col gap-y-4",
              filter.length === 0 && "mt-16 sm:mt-0 gap-y-4",
            )}
          >
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onToggleTag={handleFilterBadge}
                isBookmarked={bookmarkedJobIds.has(job.id)}
                addBookmark={bookmarksState.addBookmark}
                removeBookmark={bookmarksState.removeBookmark}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default JobList;
