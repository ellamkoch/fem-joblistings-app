/**
 * Reusable heading component that renders a semantic HTML heading tag.
 * Provides consistent title styling across the application.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Heading text content.
 * @param {number} [props.hLevel=1] - HTML heading level (1-6), determines the tag used (h1, h2, etc.).
 * @param {string} [props.className=""] - Additional CSS classes to apply.
 * @param {object} [props] - Additional HTML attributes passed to the heading tag.
 * @returns {JSX.Element} Semantic heading element with consistent styling.
 */
const Heading = ({ children, hLevel = 1, className = '', ...props }) => {
  const Tag = `h${hLevel}`;

  return (
    <Tag className={`font-bold ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
