import { apiClient } from "./apiClient";

function unwrapData(payload) {
    if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data;
    }
    return payload;
}

function unwrapJobList(payload) {
    const data = unwrapData(payload);

    if (Array.isArray(data)) {
        return data;
    }
    if (data && typeof data === "object" && Array.isArray(data.jobs)) {
        return data.jobs;
    }
    return [];
}

function normalizeJob(job) {
    return {
      id: String(job?.id ?? ""),
      company: String(job?.company ?? ""),
      position: String(job?.position ?? ""),
      role: String(job?.role ?? ""),
      level: String(job?.level ?? ""),
      contract: String(job?.contract ?? ""),
      languages: String(job?.languages ?? ""),
      logo_url: String(job?.logoUrl ?? ""),
      location: String(job?.location ?? ""),
      jobDesc: String(job?.jobDesc ?? ""),
      responsibilities: String(job?.responsibilities ?? ""),
      nice2have: String(job?.nice2have ?? ""),
      about: String(job?.about ?? ""),
      eoeStatement: String(job?.eoeStatement ?? ""),
      requirements: String(job?.requirements ?? ""),
      is_new: Boolean(job?.isNew),
      is_featured: Boolean(job?.isFeatured),
      posted_at: String(job?.postedAt ?? ""),//change to date later
    };
}

export async function listJobs(options = {}) {
    const res = await apiClient.get('/jobs', options);
    return unwrapJobList(res.data).map(normalizeJob);
}

