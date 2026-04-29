import { cn } from "@/lib/utils";

/**
 * Shared layout for authentication pages that float over the hero background.
 *
 * @param {object} props - Component props.
 * @param {string} props.eyebrow - Short supporting label above the title.
 * @param {string} props.title - Main page heading.
 * @param {string} props.description - Supporting copy under the title.
 * @param {import("react").ReactNode} props.children - Page-specific card content.
 * @param {string} [props.className] - Optional section class names.
 * @returns {JSX.Element} Auth page shell.
 */
function AuthPageShell({ title, description, children, className }) {
  return (
    <section
      className={cn(
        "relative z-10 mx-auto -mt-55 flex w-full max-w-md flex-col gap-4 lg:-mt-40",
        className,
      )}
    >
      <div className="space-y-3 px-1 text-background dark:text-foreground">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight ">
            {title}
          </h1>
          <p className="max-w-sm text-base opacity-80">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

export default AuthPageShell;
