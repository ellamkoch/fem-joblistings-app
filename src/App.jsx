/* Decides what page content goes inside the shared layout. */
import AppRouter from "@router/AppRouter";
import MainLayout from "@components/layout/MainLayout.jsx";
import { JobsProvider } from "@/features/jobs/providers/JobsProvider";
import { BookmarksProvider } from "@/features/bookmarks/providers/BookmarksProvider";

/**
 * Root App component.
 *
 * @returns {JSX.Element} The App component.
 */
export default function App() {
  return (
    <JobsProvider>
      <BookmarksProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BookmarksProvider>
    </JobsProvider>
    );
}
