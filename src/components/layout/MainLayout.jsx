//MainLayout
//This file wraps pages with a shared header and footer
import Header from "@components/layout/Header";
import Footer from"@components/layout/Footer";

function MainLayout ({ children }) {
    return (
        <div className="app-shell">
            <Header />
                <main className="mx-auto max-w-full p-8">
                    {children}
                </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
