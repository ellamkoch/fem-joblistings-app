//XButton component
//This file is the styling for the X for the filter bar where we'll use it to remove a single filter.

import { Button } from "@/components/ui/button";

/**
 * Removes a single active filter from the filter bar.
 *
 * @param {object} props - Component props.
 * @param {(label: string) => void} props.removeFilter - Removes the selected filter.
 * @param {string} props.label - Filter label being removed.
 * @returns {JSX.Element} Remove-filter button.
 */
function XBtn({ removeFilter, label }) {
  return (
    <Button
      type="button"
      variant="default"
      aria-label={`Remove ${label} filter`}
      onClick={() => removeFilter(label)}
      className="
        h-8 w-8 p-0
        rounded-l-none rounded-r-xs
        bg-primary text-secondary font-semibold
        hover:bg-black"
    >
      X
    </Button>
  );
}

export default XBtn;
