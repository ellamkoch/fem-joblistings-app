/**
 * JobListPage.jsx
 *
 * Main dashboard page displaying all job listings with filtering capabilities.
 *
 * Features:
 * - Displays a filterable list of all job postings
 * - Allows filtering by role, level, languages, and tools
 * - Shows active filters with individual and bulk removal options
 * - Each job links to a detail page for more information
 * - Integrated with bookmarks functionality for saving jobs
 */
import JobList from "@/components/jobs/JobList";
import ProtectedPageHeader from "@/components/auth/ProtectedPageHeader";

/**
 * Main jobs listing and filtering page for authenticated users.
 *
 * @returns {JSX.Element} Jobs dashboard with job list and filtering.
 */
function JobListPage() {
  return (
    <div>
      <h1 className="hidden">Job Listings</h1>
      <ProtectedPageHeader compact>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Job Listings
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse, filter, and save current openings.
            </p>
          </div>
        </div>
      </ProtectedPageHeader>
      <JobList />
    </div>
  );
}

export default JobListPage;
