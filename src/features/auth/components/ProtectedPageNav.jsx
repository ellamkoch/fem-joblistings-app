//ProtectedPageNav.jsx
//This file adds the small authenticated navigation between the jobs list and bookmarks page.

import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";

const LINKS = [
  { to: "/", label: "Jobs", end: true },
  { to: "/bookmarks", label: "Saved Jobs" },
];

/**
 * Shared nav used across protected pages so related views stay connected.
 *
 * @returns {JSX.Element} Protected page nav links.
 */
function ProtectedPageNav() {
  const location = useLocation();

  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-2">
      {LINKS.map((link) => (
        <Button
          key={link.to}
          asChild
          variant={
            location.pathname === link.to ||
            (!link.end && location.pathname.startsWith(link.to))
              ? "default"
              : "outline"
          }
          size="sm"
          className="h-8 rounded-full px-3 text-xs uppercase tracking-[0.12em]"
        >
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}

export default ProtectedPageNav;
