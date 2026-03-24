import useJobs from "@hooks/useJobs";
import { JobsContext } from "@/contexts/JobsContext";

export function JobsProvider({ children }) {
  const jobsState = useJobs();

  return (
    <JobsContext.Provider value={jobsState}>
      {children}
    </JobsContext.Provider>
  );
}
