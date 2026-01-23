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
      className="text-primary hover:underline-offset-4 cursor-pointer"
    >
      Clear
    </Button>
  );
}

export default ClearBtn;
