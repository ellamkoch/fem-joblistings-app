/* Reusable heading component for consistent title styling. */

const Heading =( { children, hLevel = 1, className = "" }) => {
    const Tag =`h${hLevel}`;
    return (
        <Tag className={`font-bold ${className}`}>
            {children}
        </Tag>
    );
};

export default Heading;
