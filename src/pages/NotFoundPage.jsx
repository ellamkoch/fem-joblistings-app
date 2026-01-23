//NotFoundPage.jsx
//shows a random not found title and msg from the notFoundMsg.js array file.
//Set up so it doesn't re-render with the theme change
//Logic for the notfoundmsg is in the getRandomNotFoundMsg.js file.

import { useState } from "react";

import getRandomNotFoundMsg from "@/utils/getRandomNotFoundMsg";
import { Card } from "@components/ui/card";
import Title from "@/components/shared/Heading.component";

function NotFoundPage() {
    //holds the current 404 msg in state in case of theme changes so it doesn't change
    const [message] = useState(() => getRandomNotFoundMsg());

    return (
        <Card className="mt-6 rounded-lg shadow-lg">
            <Title>
                {message.title}
            </Title>
            <p>
                {message.body}
            </p>
        </Card>
    );
}

export default NotFoundPage;
