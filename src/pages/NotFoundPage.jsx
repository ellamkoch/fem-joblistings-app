/*
 * Shows a random not-found title and message.
 * The message is captured once in state so theme changes do not reroll it.
 */

import { useState } from "react";

import getRandomNotFoundMsg from "@/utils/getRandomNotFoundMsg";
import { Card } from "@components/ui/card";
import Title from "@/components/shared/Heading.component";

function NotFoundPage() {
    // Hold the current 404 message steady across theme changes.
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
