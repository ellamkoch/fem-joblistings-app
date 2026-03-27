//BookmarksPage.jsx
//This page shows the user's saved jobs, lets them manage the list, and keeps the protected dashboard header layout.

import { useMemo } from "react";

import ProtectedPageHeader from "@/features/auth/components/ProtectedPageHeader";
import ProtectedPageNav from "@/features/auth/components/ProtectedPageNav";
import BookmarksList from "@/features/bookmarks/components/BookmarksList";
import { useBookmarksContext } from "@/features/bookmarks/context/BookmarksContext";

/**
 * Saved jobs page for authenticated users.
 *
 * @returns {JSX.Element} The bookmarks dashboard view.
 */
function BookmarksPage() {
  const { bookmarks, loading, error, removeBookmark } = useBookmarksContext();

  // keeps the header copy readable for singular vs plural bookmark counts
  const bookmarkCountLabel = useMemo(() => {
    if (bookmarks.length === 1) {
      return "1 saved job";
    }

    return `${bookmarks.length} saved jobs`;
  }, [bookmarks.length]);

  return (
    <div>
      <h1 className="hidden">Saved Jobs</h1>
      <ProtectedPageHeader compact>
        <div className="space-y-3">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Dashboard
            </p>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Saved Jobs
              </h2>
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading saved jobs..." : `Review and manage ${bookmarkCountLabel}.`}
              </p>
            </div>
          </div>
          <ProtectedPageNav />
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
