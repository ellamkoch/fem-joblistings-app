//HeroBackground.jsx
//Renders the decorative hero background image used on all pages.

import '@styles/_hero.scss';

/**
 * Displays the hero background image that appears consistently across all pages.
 *
 * @returns {JSX.Element} Hero background container with styling.
 */
export default function HeroBackground() {
  return (
    <div className="hero-container h-full w-full object-contain">
      <div className="hero-img"> </div>
    </div>
  );
}
