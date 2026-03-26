// useBookmarks.js
// Shared bookmark state for loading, saving, removing, and checking saved jobs.
// Bookmark data is tied to auth state so it loads after login and clears on logout.

import {
  listBookmarks,
  createBookmark,
  deleteBookmark,
} from "@/lib/api/bookmarks";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/auth/useAuth";

/**
 * Loads the authenticated user's saved jobs and exposes bookmark actions for the UI.
 *
 * @returns {{
 *   bookmarks: Array<object>,
 *   loading: boolean,
 *   error: string | null,
 *   addBookmark: (job: object) => Promise<void>,
 *   removeBookmark: (jobId: string) => Promise<void>,
 *   loadBookmarks: () => Promise<void>,
 *   isBookmarked: (jobId: string) => boolean
 * }} Bookmark state and actions.
 */
function useBookmarks() {
  const { isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // pulls the latest saved jobs from the API and stores them locally for the app
  const loadBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listBookmarks();
      setBookmarks(data);
    } catch (err) {
      setError("There's a problem loading the bookmark list: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      // clearing local bookmark state here prevents one user's saved jobs from lingering after logout
      setBookmarks([]);
      setError(null);
      setLoading(false);
      return;
    }

    loadBookmarks();
  }, [isAuthenticated, loadBookmarks]);

  // removes a saved job from the API and updates local state so the UI stays in sync
  const removeBookmark = useCallback(async (jobId) => {
    setError(null);

    try {
      await deleteBookmark(jobId);

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== jobId));
    } catch (err) {
      setError("There's a problem deleting the bookmark: " + err.message);
      throw err;
    }
  }, []);

  // saves a job and appends it locally; if the backend reports it already exists, resync from the source of truth
  const addBookmark = useCallback(async (job) => {
    setError(null);

    try {
      await createBookmark(job.id);

      setBookmarks((prev) => {
        const exists = prev.some((bookmark) => bookmark.id === job.id);
        return exists ? prev : [...prev, job];
      });
    } catch (err) {
      if (err.message?.toLowerCase().includes("already exists")) {
        await loadBookmarks();
        return;
      }

      setError("There's a problem saving the bookmark: " + err.message);
      throw err;
    }
  }, [loadBookmarks]);

  // quick lookup helper so cards and details pages can render the correct save state
  const isBookmarked = useCallback(
    (jobId) => bookmarks.some((bookmark) => bookmark.id === String(jobId)),
    [bookmarks],
  );

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    loadBookmarks,
    isBookmarked,
  };
}

export default useBookmarks;
