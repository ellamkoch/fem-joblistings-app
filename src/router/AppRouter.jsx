// AppRouter.jsx
// Defines which pages are public and which routes require authentication.

import { Routes, Route } from "react-router-dom";

import AboutPage from "@pages/AboutPage";
import NotFoundPage from "@pages/NotFoundPage";
import BookmarksPage from "@pages/BookmarksPage";
import JobDetailPage from "@pages/JobDetailPage";
import JobListPage from "@pages/JobListPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

/**
 * Renders the app route tree.
 *
 * @returns {JSX.Element} The application routes.
 */
function AppRouter() {
    return (
       <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <JobListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/job/:id"
                element={
                    <ProtectedRoute>
                        <JobDetailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/bookmarks"
                element={
                    <ProtectedRoute>
                        <BookmarksPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    );
}
export default AppRouter;
