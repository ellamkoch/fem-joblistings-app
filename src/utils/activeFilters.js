/**activeFilter.js
This file has helpers for managing the logic of the active job badges/tags for the filter
  * if a badge already exists it removes it, otherwise it adds to the filter
  * remove removes badge that is toggled on X button
  * clear removes all tags
 when toggling a badge, we return a new array*/

function normalizeBadge(badge) {
    //"normalizes" the text to trim off anything extra and makes the text lowercase if its written in caps for consistency
  return String(badge).trim().toLowerCase();
}
//toggles the tags on/off in the active badge array
function toggleFilter(activeBadges, badge) {
    //variable to save the /badge that we've normalized in the filter
    const normalizedBadge = normalizeBadge(badge);

    //finds the index of the matching badges/tags and compares what's been clicked to the normalized one
     const existingIndex = activeBadges.findIndex(
    (b) => normalizeBadge(b) === normalizedBadge
  );

     // slice copies the array to preserve it from the activeBadges, nextBadges is the new array
    const nextBadges = activeBadges.slice();

    if (existingIndex !== -1) {
    // if a Badge exists, it removes it
    nextBadges.splice(existingIndex, 1);//this mutates the copied array, not the original.
    return nextBadges;
  }

    // If a Badge doesn't exist, it adds it as originally provided
    nextBadges.push(String(badge).trim());
    return nextBadges;
    }
//Removes a badge
function removeFilter(activeBadges, badge) {
  const normalizedBadge = normalizeBadge(badge);

  return activeBadges.filter(
    (b) => normalizeBadge(b) !== normalizedBadge
  );
}
//clears all badges/tags and returns an empty array
function clearFilter() {
  return [];
}


export {
  normalizeBadge,
  toggleFilter,
  removeFilter,
  clearFilter,
};
