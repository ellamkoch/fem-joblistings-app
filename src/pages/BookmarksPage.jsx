//BookmarksPage.jsx
//Dashboard page for viewing, managing, and interacting with saved job bookmarks.
//Displays the user's bookmark collection and provides job removal functionality.

import { useMemo } from 'react';

import ProtectedPageHeader from '@/features/auth/components/ProtectedPageHeader';
import BookmarksList from '@/features/bookmarks/components/BookmarksList';
import { useBookmarksContext } from '@/features/bookmarks/context/BookmarksContext';

/**
 * Saved jobs dashboard for authenticated users.
 *
 * Displays:
 * - Count of saved jobs (singular/plural formatting)
 * - List of bookmarked jobs with full card layout
 * - Loading states and error messages
 * - Empty state messaging when no jobs are saved
 * - Individual job removal controls
 *
 * @returns {JSX.Element} Bookmarks dashboard view.
 */
function BookmarksPage() {
  const { bookmarks, loading, error, removeBookmark } = useBookmarksContext();

  // Keeps the header copy readable for singular vs plural bookmark counts
  const bookmarkCountLabel = useMemo(() => {
    if (bookmarks.length === 1) {
      return '1 saved job';
    }

    return `${bookmarks.length} saved jobs`;
  }, [bookmarks.length]);

  return (
    <div>
      <h1 className="hidden">Saved Jobs</h1>
      <ProtectedPageHeader compact>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <div className="space-y-0.5">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Saved Jobs
              </h2>
              <p className="text-sm text-muted-foreground">
                {loading ? 'Loading saved jobs...' : `Review and manage ${bookmarkCountLabel}.`}
              </p>
            </div>
          </div>
        </div>
      </ProtectedPageHeader>

      <BookmarksList
        bookmarks={bookmarks}
        loading={loading}
        error={error}
        removeBookmark={removeBookmark}
      />
    </div>
  );
}

export default BookmarksPage;
