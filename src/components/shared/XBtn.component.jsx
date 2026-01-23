//XButton component
//This file is the styling for the X for the filter bar where we'll use it to remove a single filter.

import { Button } from "@/components/ui/button";

function XBtn({ removeFilter, label }) {
  return (
    <Button
      type="button"
      variant="default"
      aria-label={`Remove ${label} filter`}
      onClick={() => removeFilter(label)}
      className="
        h-4 w-4 p-0
        bg-primary text-white
        hover:bg-black"
    >✕
    </Button>
  );
}

export default XBtn;
