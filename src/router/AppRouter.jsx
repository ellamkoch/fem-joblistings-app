//This file does the routing for the pages in the App
//imports
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "@pages/NotFoundPage";
import JobDetailPage from "@pages/JobDetailPage";
import JobListPage from "@pages/JobListPage";

function AppRouter() {
    return (
       <Routes>
            <Route path="/" element={<JobListPage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    );
}
export default AppRouter;
