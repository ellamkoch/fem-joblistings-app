//BackButton.component.jsx
//This is a backbutton for the dynamic details page that takes them back to the job list.

import { Link } from "react-router";
import { Button } from "@components/ui/button";

function BackButton() {
  return (
    <Button asChild
    variant="default"
    className ="hover:bg-secondary text-base">
        <Link to="/">
        Back to all jobs
      </Link>
    </Button>
  );
}
export default BackButton;
