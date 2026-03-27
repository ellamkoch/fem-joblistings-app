/* Renders the bookmark action control used on job cards and job details. */

import { Bookmark, BookmarkX } from "lucide-react";
import useBookmarkToggle from "@/hooks/useBookmarkToggle";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Bookmark action control for a single job.
 *
 * @param {object} props - Component props.
 * @param {object} props.job - Normalized job object for the current card.
 * @param {boolean} props.isBookmarked - Whether the job is already in the saved list.
 * @param {"toggle" | "remove"} [props.mode="toggle"] - Whether the control toggles save state or only removes.
 * @param {(job: object) => Promise<void>} [props.addBookmark] - Saves the current job.
 * @param {(jobId: string) => Promise<void>} props.removeBookmark - Removes the current job.
 * @param {string} [props.className] - Optional extra classes.
 * @param {boolean} [props.showLabel=true] - Whether to show text beside the icon.
 * @returns {JSX.Element} Bookmark action control with tooltip.
 */
function BookmarkButton({
  job,
  isBookmarked,
  mode = "toggle",
  addBookmark,
  removeBookmark,
  className,
  showLabel = true,
}) {
  const { pending, handleBookmarkAction } = useBookmarkToggle({
    job,
    isBookmarked,
    mode,
    addBookmark,
    removeBookmark,
  });

  const isRemoveMode = mode === "remove";
  const tooltipLabel = isRemoveMode
    ? "Remove saved job"
    : isBookmarked
      ? "Remove saved job"
      : "Save job";
  const buttonLabel = isRemoveMode ? "Remove"
    : isBookmarked
    ? "Saved"
    :"Save Job";

  if (isRemoveMode) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={handleBookmarkAction}
            aria-label={tooltipLabel}
            className={cn(
              "shrink-0 rounded-full px-3 text-sm font-semibold text-destructive hover:text-destructive",
              showLabel && "gap-1.5",
              className,
            )}
          >
            <BookmarkX aria-hidden="true" className="size-4" />
            {showLabel ? <span>{buttonLabel}</span> : <span className="sr-only">{tooltipLabel}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8}>
          {tooltipLabel}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          variant="outline"
          size="sm"
          pressed={isBookmarked}
          disabled={pending}
          onClick={handleBookmarkAction}
          aria-label={buttonLabel}
          className={cn(
            "shrink-0 rounded-full px-3 text-sm font-semibold",
            showLabel && "gap-1.5",
            className,
          )}
        >
          <Bookmark
            aria-hidden="true"
            className={cn(
              "size-4 transition-colors",
              isBookmarked && "fill-current",
            )}
          />
          {showLabel ? <span>{buttonLabel}</span> : <span className="sr-only">{tooltipLabel}</span>}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {tooltipLabel}
      </TooltipContent>
    </Tooltip>
  );
}

export default BookmarkButton;
