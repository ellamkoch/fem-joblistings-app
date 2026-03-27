//BackButton.jsx
//Navigation button that returns users to the main job listings page.

import { Link } from 'react-router';
import { Button } from '@components/ui/button';

/**
 * Renders a back-to-jobs navigation button for detail pages.
 *
 * @returns {JSX.Element} Back navigation button.
 */
function BackButton() {
  return (
    <Button asChild variant="default" className="hover:bg-secondary text-base">
      <Link to="/">Back to all jobs</Link>
    </Button>
  );
}
export default BackButton;
