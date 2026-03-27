/* Clears all active filter badges from the filter bar in one click. */
import { Button } from "@components/ui/button";

function ClearBtn({ clearFilter }) {


  return (
    <Button
      type="button"
      variant="ghost"
      onClick={clearFilter}
      aria-label="Clear filters"
      className="text-primary hover:underline hover:underline-offset-4 cursor-pointer"
    >
      Clear filters
    </Button>
  );
}

export default ClearBtn;
