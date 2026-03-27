import { apiClient } from "@/lib/api/apiClient";
import { unwrapData, normalizeJob } from "@/features/jobs/api/jobs";

//reusing unwrapData from the jobs.js since we need the same pattern in here otherwise as part of this functionality.
//takes the api response and returns an array of bookmarks
function unwrapBookmarkList(payload) {
    const data = unwrapData(payload);

    if (Array.isArray(data)) {
        return data;
    }

    return [];//returns an empty array instead of crashing the app if the data is not an array
}

//reusing the normalizeJob function here since bookmarks listed will essentially be a job card of the saved job
function normalizeBookmark(bookmark) {
    return normalizeJob(bookmark?.job ?? {});
}

export async function listBookmarks(options = {}) {
    const res = await apiClient.get('/me/bookmarks', options);
    return unwrapBookmarkList(res.data).map(normalizeBookmark);
}
//don't need to normalize bookmark within this since we're simply saving a job and marking it as true. don't need payload since we're using jobId in the url
export async function createBookmark(jobId, options = {}) {
    const res = await apiClient.post(`/jobs/${jobId}/bookmark`, {}, options);
    return unwrapData(res.data);
}

export async function deleteBookmark(jobId, options = {}) {
    const res = await apiClient.delete(`/jobs/${jobId}/bookmark`, options);
    return unwrapData(res.data);
}
