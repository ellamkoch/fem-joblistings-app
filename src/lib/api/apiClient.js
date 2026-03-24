import axios from "axios";


const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiClientTimeout = import.meta.env.VITE_API_CLIENT_TIMEOUT;

if(!baseURL) {
    console.error("VITE_API_BASE_URL is not set. API calls will likely fail.");
}

export const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: apiClientTimeout ? Number(apiClientTimeout) : 30_000,
});

// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error?.response?.status === 401) {
//             await handleUnauthorized();
//         }

//         const apiError = error?. response?.data?.error;
//         if(apiError) {
//             return Promise.reject(new Error(apiError.message ?? "Request failed."));
//         }
//         return Promise.reject(error);
//     }
// )

