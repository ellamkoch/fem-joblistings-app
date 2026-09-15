/* Custom hook for loading jobs used by the list and detail pages. */
import { useCallback, useEffect, useState } from 'react';
import { listJobs } from '@/api/jobs';

function useJobs() {
  // State owned by the hook.
  const [jobs, setJobs] = useState([]); //empty list of jobs
  const [loading, setLoading] = useState(false); //default loading state
  const [error, setError] = useState(null); //no error msg to start

  // Load jobs from the API and store them locally.
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listJobs();
      setJobs(data);
    } catch (err) {
      setError("There's a problem loading the job list: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load when the hook is first used.
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
  };
}

export default useJobs;
