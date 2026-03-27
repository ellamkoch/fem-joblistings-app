// JobsProvider.jsx
// Owns the single jobs fetch and shares that state with any page that needs it.

import useJobs from "@/hooks/useJobs";
import { JobsContext } from "@/contexts/JobsContext";

/**
 * Provides shared jobs state so the app only calls useJobs once.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Descendant UI that needs jobs state.
 * @returns {JSX.Element} The jobs context provider.
 */
export function JobsProvider({ children }) {
  const jobsState = useJobs();

  return (
    <JobsContext.Provider value={jobsState}>
      {children}
    </JobsContext.Provider>
  );
}
