import LogoutButton from "@/features/auth/components/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Shared page header for authenticated views.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Left-side header content.
 * @param {string} [props.className] - Optional wrapper class names.
 * @param {boolean} [props.compact=false] - Whether to use a denser layout.
 * @returns {JSX.Element} Protected page header.
 */
function ProtectedPageHeader({ children, className, compact = false }) {
  return (
    <div
      className={cn(
        "relative",
        compact ? "z-10 -mt-36 mb-3 lg:-mt-[7.5rem]" : "z-10 -mt-20 mb-6 lg:-mt-[4.5rem]",
        className,
      )}
    >
      <Card className="rounded-lg border-border/70 shadow-md">
        <CardContent
          className={cn(
            "flex flex-col sm:flex-row sm:items-center sm:justify-between",
            compact
              ? "flex-row items-start justify-between gap-3 px-4 py-0.5 sm:px-5"
              : "gap-4 px-6 py-5",
          )}
        >
          <div className={cn("min-w-0", compact && "pr-1")}>{children}</div>
          <LogoutButton
            className={cn(
              "sm:w-auto",
              compact ? "h-9 w-auto shrink-0 px-3 text-xs" : "w-full",
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProtectedPageHeader;
