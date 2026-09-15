// ProtectedRoute.jsx
// Guards routes that should only be reachable after a successful login.

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * Redirects unauthenticated users to the login page while preserving
 * the route they originally attempted to open.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Protected page content.
 * @returns {JSX.Element} The protected content or a redirect to login.
 */
export function ProtectedRoute({ children }) {
  const location = useLocation(); //useLocation gives the page access to the current React Router location object
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Preserve the attempted location so login can send the user back.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
