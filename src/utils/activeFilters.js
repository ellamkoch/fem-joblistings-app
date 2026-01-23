//activeFilter.js
//This file has helpers for managing the logic of the active job badges/tags for the filter
//  * if a badge already exists it removes it, otherwise it adds to the filter
//  * remove removes tag that is toggled on X button
//  * clear removes all tags
// when toggling a badge, we return a new array

function normalizeTag(tag) {
    //"normalizes" the text to trim off anything extra and makes the text lowercase if its written in caps for consistency
  return String(tag).trim().toLowerCase();
}
//toggles the tags on/off in the active tag array
function toggleFilter(activeTags, tag) {
    //variable to save the tag/badge that we've normalized in the filter
    const normalizedTag = normalizeTag(tag);

    //finds the index of the matching tags and compares what's been clicked to the normalized one
     const existingIndex = activeTags.findIndex(
    (t) => normalizeTag(t) === normalizedTag
  );

     // slice copies the array to preserve it from the activeTags, nextTags is the new array
    const nextTags = activeTags.slice();

    if (existingIndex !== -1) {
    // if a Tag exists, it removes it
    nextTags.splice(existingIndex, 1);//this mutates the copied array, not the original. 
    return nextTags;
  }

    // If a Tag doesn't exist, it adds it as originally provided
    nextTags.push(String(tag).trim());
    return nextTags;
    }
//Removes a tag
function removeFilter(activeTags, tag) {
  const normalizedTag = normalizeTag(tag);

  return activeTags.filter(
    (t) => normalizeTag(t) !== normalizedTag
  );
}
//clears all tags and returns an empty array
function clearFilter() {
  return [];
}


export {
  normalizeTag,
  toggleFilter,
  removeFilter,
  clearFilter,
};
