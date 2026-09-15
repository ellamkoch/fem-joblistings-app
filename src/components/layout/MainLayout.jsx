//MainLayout.jsx
//Wraps pages with a shared header and footer to create the app shell.

import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

/**
 * Main application layout shell with header, main content area, and footer.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Page content to render in the main area.
 * @returns {JSX.Element} App shell layout with navigation and footer.
 */
function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
