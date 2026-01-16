//This file decides what page content goes inside the layout
import AppRouter from "@router/AppRouter";
import MainLayout from "@components/layout/MainLayout.jsx";//imports header/footer, hero, centering
// import JobList from "@components/jobs/JobList.jsx";//imports Jobs UI

/**
 * Root App component.
   * @returns {JSX.Element} The App component.
 */
export default function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
    );
}
