import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { logout as requestLogout } from '@/api/auth';

/**
 * Provides a resilient logout action that clears local auth even if the
 * backend logout request fails.
 *
 * @returns {{isLoggingOut: boolean, logout: () => Promise<void>}} Logout action state.
 */
export function useLogoutAction() {
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await requestLogout();
    } catch {
      // Always clear local auth so the user is not stranded in a broken session.
    } finally {
      clearAuth();
      navigate('/login', {
        replace: true,
        state: {
          message: 'You have been logged out.',
        },
      });
      setIsLoggingOut(false);
    }
  }

  return {
    isLoggingOut,
    logout,
  };
}
