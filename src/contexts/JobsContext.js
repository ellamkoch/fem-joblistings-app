// JobsContext.js
// Centralized jobs context used by the list and detail pages.

import { createContext, useContext } from "react";

export const JobsContext = createContext(null);

/**
 * Reads the shared jobs state from context.
 *
 * @returns {{jobs: Array, loading: boolean, error: string | null}} Shared jobs state.
 * @throws {Error} When called outside of JobsProvider.
 */
export function useJobsContext() {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobsContext must be used within a JobsProvider.");
  }

  return context;
}
