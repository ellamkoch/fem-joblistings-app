//MainLayout
//This file wraps pages with a shared header and footer
import Header from "@components/layout/Header";
import Footer from"@components/layout/Footer";

function MainLayout ({ children }) {
    return (
      <div className="app-shell">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
        </main>
        <Footer />
      </div>
    );
}

export default MainLayout;
