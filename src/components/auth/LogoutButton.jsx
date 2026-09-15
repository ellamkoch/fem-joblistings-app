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
      className={className}
      disabled={isLoggingOut}
      onClick={logout}
      type="button"
      variant="outline"
    >
      <LogOut aria-hidden="true" className="size-4" />
      {isLoggingOut ? 'Logging out...' : 'Log out'}
    </Button>
  );
}

export default LogoutButton;
