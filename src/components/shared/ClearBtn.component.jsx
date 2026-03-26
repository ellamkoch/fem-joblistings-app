//ClearButton.component
//This file clears out the FilterBar of all the Active Badges/Tags used for filtering the joblist with one click.
//shadcn imports
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
