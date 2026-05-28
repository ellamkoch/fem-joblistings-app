import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
        'relative',
        compact ? 'z-10 -mt-45 mb-3 sm:-mt-35 lg:-mt-[7.5rem]' : 'z-10 -mt-20 mb-6 lg:-mt-[4.5rem]',
        className,
      )}
    >
      <Card className="rounded-lg border-border/70 shadow-md">
        <CardContent
          className={cn('flex', compact ? 'items-start gap-3 px-4 py-0.5 sm:px-5' : 'px-6 py-5')}
        >
          <div className={cn('min-w-0', compact && 'pr-1')}>{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProtectedPageHeader;
