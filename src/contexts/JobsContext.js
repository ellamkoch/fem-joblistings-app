import { createContext, useContext } from "react";

export const JobsContext = createContext(null);

export function useJobsContext() {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobsContext must be used within a JobsProvider.");
  }

  return context;
}
