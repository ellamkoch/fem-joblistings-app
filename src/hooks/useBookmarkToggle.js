//useBookmarkToggle.js
//This file keeps the bookmark toggle request logic out of the UI button component.

import { useCallback, useState } from 'react';

/**
 * Provides the async toggle action and pending state for a job bookmark button.
 *
 * @param {object} params - Toggle dependencies.
 * @param {object} params.job - Normalized job object for the card.
 * @param {boolean} params.isBookmarked - Whether the job is already saved.
 * @param {"toggle" | "remove"} [params.mode="toggle"] - Whether the control can toggle or only remove.
 * @param {(job: object) => Promise<void>} [params.addBookmark] - Saves a job bookmark when toggle mode is used.
 * @param {(jobId: string) => Promise<void>} params.removeBookmark - Removes a job bookmark.
 * @returns {{isBookmarked: boolean, pending: boolean, handleBookmarkAction: () => Promise<void>}} Pending state and action handler.
 */
function useBookmarkToggle({ job, isBookmarked, addBookmark, removeBookmark, mode = 'toggle' }) {
  const [pending, setPending] = useState(false);

  // guards double-clicks while the request is in flight, then routes to the right bookmark action
  const handleBookmarkAction = useCallback(async () => {
    if (!job?.id || pending) {
      return;
    }

    setPending(true);

    try {
      if (mode === 'remove' || isBookmarked) {
        await removeBookmark(job.id);
        return;
      }

      await addBookmark(job);
    } finally {
      setPending(false);
    }
  }, [addBookmark, isBookmarked, job, mode, pending, removeBookmark]);

  return {
    isBookmarked,
    pending,
    handleBookmarkAction,
  };
}

export default useBookmarkToggle;
