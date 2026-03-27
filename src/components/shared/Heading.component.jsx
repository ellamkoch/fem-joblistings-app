/* Reusable heading component for consistent title styling. */

const Heading = ({ children, hLevel = 1, className = "", ...props }) => {
  const Tag = `h${hLevel}`;

  return (
    <Tag className={`font-bold ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
