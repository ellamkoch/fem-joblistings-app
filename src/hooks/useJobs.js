//useJobs.js
//This file is a custom hook file that handles the supabase logic to pull info from the table for the jobs list and the details pages.

//imports
import { useCallback, useEffect, useState } from "react";
import { listJobs } from "@/lib/api/jobs";

function useJobs() {
    //1st - Need to set states owned by the hook
    const [jobs, setJobs] = useState([]); //empty list of jobs
    const [loading, setLoading] = useState(false); //default loading state
    const [error, setError] = useState( null);//no error msg to start

    //2nd - Load jobs from Supabase and store in state

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

    // 3. Initial load when hook is first used
    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    return {
        jobs,
        loading,
        error
    };
}

export default useJobs;
