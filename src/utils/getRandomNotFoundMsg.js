//getRandomNotFoundMsg.js
//This file selects a random msg to show on the Not Found Page from the notFoundMsgs.js

import { messages } from "@utils/notFoundMsgs";

const STORAGE_KEY = "job-listings:not-found-messages";

function getRandomNotFoundMsg() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMsg = messages[randomIndex];
  const { title, body } = randomMsg;

  return { title, body };
}

function isStoredMessageValid(candidate) {
  return messages.some(
    (message) =>
      message.title === candidate?.title && message.body === candidate?.body,
  );
}

function readStoredMessages() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    const parsedValue = JSON.parse(storedValue);

    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
}

function writeStoredMessages(value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures and fall back to a fresh random message.
  }
}

export function getStableNotFoundMsg(pathname) {
  const safePathname = pathname || "/";
  const storedMessages = readStoredMessages();
  const storedMessage = storedMessages[safePathname];

  if (isStoredMessageValid(storedMessage)) {
    return storedMessage;
  }

  const nextMessage = getRandomNotFoundMsg();

  writeStoredMessages({
    ...storedMessages,
    [safePathname]: nextMessage,
  });

  return nextMessage;
}

export default getRandomNotFoundMsg;
