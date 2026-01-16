//MainLayout
//This file wraps pages with a shared header and footer
import Header from "@components/layout/Header";
import Footer from"@components/layout/Footer";

function MainLayout ({ children }) {
    return (
        <div className="app-shell">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
