/**
 * NotFoundPage.jsx
 *
 * 404 page displayed when users navigate to non-existent routes.
 *
 * Features:
 * - Shows a stable not-found message (tied to pathname so it doesn't change on refresh)
 * - Provides context-aware navigation links based on auth state
 * - Maintains consistent styling with the rest of the application
 */

/*
 * Shows a stable not-found title and message.
 * The message stays tied to the missing pathname so refreshes/theme changes
 * do not reroll it, while a different bad route gets a new message.
 */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Title from '@/components/shared/Heading.component';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { getStableNotFoundMsg } from '@/utils/getRandomNotFoundMsg';

/**
 * Displays a 404 not found page with navigation options.
 *
 * @returns {JSX.Element} 404 error page with recovery options.
 */
function NotFoundPage() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState(() => getStableNotFoundMsg(pathname));

  useEffect(() => {
    setMessage(getStableNotFoundMsg(pathname));
  }, [pathname]);

  const primaryLink = isAuthenticated
    ? { to: '/', label: 'Browse jobs' }
    : { to: '/login', label: 'Go to login' };

  const secondaryLink = isAuthenticated
    ? { to: '/bookmarks', label: 'Saved jobs' }
    : { to: '/register', label: 'Create account' };

  return (
    <section
      className="relative z-10 mx-auto max-w-4xl -mt-28 sm:-mt-32 lg:-mt-[7.5rem]"
      aria-labelledby="not-found-title"
    >
      <Card className="rounded-lg border-border/70 shadow-md">
        <CardContent className="space-y-5 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="flex flex-wrap gap-2" aria-label="Page status">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              404
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
              Missing route
            </span>
          </div>

          <div className="space-y-3" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Routing</p>
            <Title
              hLevel={1}
              className="text-2xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
              id="not-found-title"
            >
              {message.title}
            </Title>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 lg:text-lg">
              {message.body}
            </p>
          </div>

          <div className="rounded-lg border border-border/70 bg-accent/60 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
              Requested path
            </p>
            <p className="mt-2 break-all text-sm font-medium text-foreground sm:text-base">
              <code>{pathname}</code>
            </p>
          </div>

          <nav
            aria-label="Not found page actions"
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button asChild className="w-full rounded-full px-5 sm:w-auto">
              <Link to={primaryLink.to}>{primaryLink.label}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full px-5 sm:w-auto">
              <Link to={secondaryLink.to}>{secondaryLink.label}</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </section>
  );
}

export default NotFoundPage;
