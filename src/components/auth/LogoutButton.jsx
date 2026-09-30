import { LogOut } from 'lucide-react';

import { useLogoutAction } from '@/hooks/useLogoutAction';
import { Button } from '@/components/ui/button';

/**
 * Shared logout button for authenticated pages.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional class names.
 * @returns {JSX.Element} Logout button.
 */
function LogoutButton({ className }) {
  const { isLoggingOut, logout } = useLogoutAction();

  return (
    <Button
      className={`
        bg-card text-foreground/95 border-0 shadow-none
        hover:bg-[color:var(--nav-hover-background)]
        hover:text-[color:var(--nav-hover-foreground)]
        hover:underline hover:underline-offset-4
        focus-visible:ring-2 focus-visible:ring-foreground
        ${className ?? ''}
      `}
      disabled={isLoggingOut}
      onClick={logout}
      type="button"
      variant="default"
    >
      <LogOut aria-hidden="true" className="size-4" />
      {isLoggingOut ? 'Logging out...' : 'Log out'}
    </Button>
  );
}

export default LogoutButton;
