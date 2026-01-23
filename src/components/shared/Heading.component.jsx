// Title.component.jsx
//     * Style Component: Title
//     * A reusable title component for consistent styling of headings.

const Heading =( { children, hLevel = 1, className = "" }) => {
    const Tag =`h${hLevel}`;
    return (
        <Tag className={`font-bold ${className}`}>
            {children}
        </Tag>
    );
};

export default Heading;
