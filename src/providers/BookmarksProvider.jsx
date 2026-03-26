// BookmarksProvider.jsx
// Owns the single bookmarks fetch and shares that state with any page that needs it.

import useBookmarks from "@hooks/useBookmarks";
import { BookmarksContext } from "@/contexts/BookmarksContext";

/**
 * Provides shared bookmarks state so the app only calls useBookmarks once.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Descendant UI that needs bookmarks state.
 * @returns {JSX.Element} The bookmarks context provider.
 */
export function BookmarksProvider({ children }) {
  const bookmarksState = useBookmarks();

  return (
    <BookmarksContext.Provider value={bookmarksState}>
      {children}
    </BookmarksContext.Provider>
  );
}
