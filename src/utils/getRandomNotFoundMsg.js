//getRandomNotFoundMsg.js
//This file selects a random msg to show on the Not Found Page from the notFoundMsgArr.js

import { messages } from '@utils/notFoundMsgs';

function getRandomNotFoundMsg() {
    //Get the random index in the array
    const randomIndex = Math.floor(Math.random() * messages.length);

    //Get the random object from the array
    const randomMsg = messages[randomIndex];

    //Destructure the array items needed
    const { title, body } = randomMsg;

    return { title, body };

}

export default getRandomNotFoundMsg;
