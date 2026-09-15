/**
 * getRandomNotFoundMsg.js
 *
 * Utility for selecting and persisting random 404 not-found messages.
 * Ensures the same humorous message displays for a given pathname across page refreshes and theme changes.
 */

//Selects a random msg to show on the Not Found Page from the notFoundMsgs.js

import { messages } from '@utils/notFoundMsgs';

const STORAGE_KEY = 'job-listings:not-found-messages';

/**
 * Selects a random 404 message from the available messages pool.
 *
 * @returns {{title: string, body: string}} Random message object with title and body.
 */
function getRandomNotFoundMsg() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMsg = messages[randomIndex];
  const { title, body } = randomMsg;

  return { title, body };
}

/**
 * Validates that a candidate message exists in the messages pool.
 * Used to ensure stored messages are still valid (e.g., hasn't been deleted from the pool).
 *
 * @param {unknown} candidate - Message object to validate.
 * @returns {boolean} True if the message exists in the pool.
 */
function isStoredMessageValid(candidate) {
  return messages.some(
    (message) => message.title === candidate?.title && message.body === candidate?.body,
  );
}

/**
 * Reads all persisted not-found messages from localStorage.
 * Uses a try-catch to gracefully handle storage access failures.
 *
 * @returns {object} Stored messages object ({pathname: message}) or empty object on failure.
 */
function readStoredMessages() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    const parsedValue = JSON.parse(storedValue);

    return parsedValue && typeof parsedValue === 'object' ? parsedValue : {};
  } catch {
    return {};
  }
}

/**
 * Persists all not-found messages to localStorage.
 * Uses a try-catch to gracefully handle storage write failures.
 *
 * @param {object} value - Messages object ({pathname: message}) to persist.
 * @returns {void}
 */
function writeStoredMessages(value) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures and fall back to a fresh random message.
  }
}

/**
 * Gets or generates a stable not-found message tied to a specific pathname.
 *
 * If a message was previously stored for this pathname and is still in the messages pool,
 * it returns the stored message. Otherwise, it generates a new random message and stores it.
 * This ensures consistent messaging across page refreshes and theme changes for the same broken route.
 *
 * @param {string} pathname - The URL pathname that was not found.
 * @returns {{title: string, body: string}} Stable message object (same for repeat pathnames).
 */
export function getStableNotFoundMsg(pathname) {
  const safePathname = pathname || '/';
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
