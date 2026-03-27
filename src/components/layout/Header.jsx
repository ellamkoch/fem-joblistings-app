//Header.jsx
//Application header with navigation links and theme selector.
//Displays different navigation options based on authentication state.

import { Link, useLocation } from "react-router-dom";

import HeroBackground from "@components/layout/HeroBackground.jsx";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import ThemeSelect from "@/components/layout/ThemeSelect";

/**
 * Renders the application header with hero background, navigation, and theme selector.
 *
 * Navigation links vary based on auth state:
 * - Authenticated: Jobs, Saved Jobs, About, Logout
 * - Unauthenticated: About, Login, Register
 *
 * @returns {JSX.Element} Application header with navigation.
 */
function Header() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navLinks = isAuthenticated
    ? [
        { to: "/", label: "Jobs" },
        { to: "/bookmarks", label: "Saved Jobs" },
        { to: "/about", label: "About" },
      ]
    : [
        { to: "/about", label: "About" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <header className="header relative flex">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl justify-end px-4 pt-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-end gap-2">
          <nav
            aria-label="Header navigation"
            className="flex flex-wrap items-center justify-end gap-2"
          >
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.to ||
                (link.to !== "/" && location.pathname.startsWith(link.to));

              return (
                <Button
                  key={link.to}
                  asChild
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 rounded-full px-3 text-[11px] uppercase tracking-[0.12em] sm:h-9 sm:px-4 sm:text-xs"
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              );
            })}
          </nav>
          {isAuthenticated ? (
            <LogoutButton className="h-8 rounded-full px-3 text-[11px] uppercase tracking-[0.12em] sm:h-9 sm:px-4 sm:text-xs" />
          ) : null}
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
export default Header;
