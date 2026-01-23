//FilterBar
// This file renders the filter bar and the following styled components:
//  * Filter Badges,
//  * X Button
//  * ClearBtn.
//Filter logic will be pulled into the JobList

import ClearBtn from "@components/shared/ClearBtn";
import XBtn from "@components/shared/XBtn.component";
import FilterBadge from "@components/shared/FilterBadge.component";

  function FilterBar( {activeTags, removeFilter, clearFilter }) {
    //Guard so it doesn't render if there are no active filters running
    if (!activeTags || activeTags.length === 0) {
        return null;
    }

    return (
        <div className="filter-bar-container">
            <div className="filter-card ">
                <div className="flex flex-wrap gap-3">
                    {activeTags.map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center ">
                            <FilterBadge
                            label={tag}/>
                            <XBtn label={tag}
                            removeFilter={removeFilter}
                            />
                        </div>
                    ))}
                </div>
                    <ClearBtn
                        clearFilter={clearFilter} />
            </div>
        </div>
    );
  }

export default FilterBar;
