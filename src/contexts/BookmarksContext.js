// BookmarksContext.js
// Centralized bookmarks context used by the list, detail, and bookmarks pages.

import { createContext, useContext } from "react";

export const BookmarksContext = createContext(null);

/**
 * Reads the shared bookmarks state from context.
 *
 * @returns {{
 *   bookmarks: Array<object>,
 *   loading: boolean,
 *   error: string | null,
 *   addBookmark: (job: object) => Promise<void>,
 *   removeBookmark: (jobId: string) => Promise<void>,
 *   loadBookmarks: () => Promise<void>,
 *   isBookmarked: (jobId: string) => boolean
 * }} Shared bookmarks state.
 * @throws {Error} When called outside of BookmarksProvider.
 */
export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error("useBookmarksContext must be used within a BookmarksProvider.");
  }

  return context;
}
