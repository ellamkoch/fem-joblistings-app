/*
 * Renders the active filter bar, including filter badges, remove buttons,
 * and the clear-all action. Filtering behavior itself lives in JobList.
 */
import { Card } from "@components/ui/card";

import ClearBtn from "@components/shared/ClearBtn.component";
import XBtn from "@components/shared/XBtn.component";
import FilterBadge from "@components/shared/FilterBadge.component";

  function FilterBar( {badges, removeFilter, clearFilter }) {
    // Do not render when there are no active filters.
    if (!badges || badges.length === 0) {
        return null;
    }

    return (
        <div className="filter-bar-container -mt-20 mb-15 relative z-20" aria-label="Active filters">
            <Card className="filter-card rounded-lg shadow-md px-6 mt-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3 flex-1">
                        {badges.map((tag) => (
                            <div
                                key={tag}
                                className="flex items-stretch overflow-hidden rounded-md ">
                                <FilterBadge
                                label={tag}/>
                                <XBtn label={tag}
                                removeFilter={removeFilter}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="shrink-0">
                    <ClearBtn
                        clearFilter={clearFilter} />
                        </div>
                </div>
            </Card>
        </div>
    );
  }

export default FilterBar;
