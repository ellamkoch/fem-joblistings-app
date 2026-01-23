# FEM Job Listings App with Filtering

This is the repo for my Capstone for Level 3 with CodeX. This app is still in progress.

## Project Overview & Capstone Goals

This project implements the **Frontend Mentor – Job Listings with Filtering** challenge as a CodeX Level 3 capstone.

The goal is to build a multi-page React application that:

* Fetches job listing data from Supabase
* Displays listings with interactive, AND-based tag filtering
* Supports job detail views and graceful 404 handling
* Uses modern component architecture, routing, and state management
* Meets accessibility and responsiveness requirements
* Includes component and logic testing using Vitest
* Demonstrates clean separation of layout, routing, UI components, and logic

The focus is on **correct architecture, clarity, testability, and maintainability** , not pixel-perfect styling.

Here's my Project Status.

## Project Status

* Project scaffolded with Vite + React
* Tailwind CSS installed and configured
* shadcn/ui components installed and available for UI primitives
* Supabase client configured with environment variables
* Global layout implemented with shared header and footer
* Header includes hero background and theme selector
* Hero background uses a scoped Sass partial for breakpoint-based image swapping
* Routing structure established for job list, job detail, and not found pages
* Page-level UI and data rendering in progress
* Theme context files added (ThemeProvider, useTheme, constants); wiring in progress
* Not Found page implemented with a stable randomly selected message that persists across re-renders
* Testing setup planned with Vitest per capstone requirements
* Implemented a custom `useJobs` hook to retrieve job listings from Supabase (read-only, ordered by posting date)
* Verified end-to-end data flow from Supabase through the hook and into the UI
* Wired `JobList` to consume `useJobs`, including loading, error, and empty states
* Confirmed loading skeleton renders during asynchronous data fetch
* Integrated an initial JobCard render to validate visible job data output
* Stabilized the baseline UI after resolving import/export mismatches and className issues
* Job listings now render dynamically as cards using live Supabase data
* Implemented JobCard component to display core job summary information
* Wired dynamic routing from job titles to individual job detail pages (`/jobs/:id`)
* Verified route parameter handling and successful navigation from list to detail view
* Job detail page now renders as a valid route and is ready for data integration
* Fully implemented and stabilized the `JobCard` component for the main job listings page
* Job cards now render consistently on the main page using live Supabase data
* Implemented status badge rendering for job listings (e.g., *New* and *Featured* ) with conditional logic based on database flags
* Implemented interactive job attribute badges (role, level, languages, tools) as reusable UI primitives
* Verified badge rendering across both the job list and job detail contexts
* Prepared job badges for future filter interactions (click handling wired, filtering logic to be added)
* Confirmed responsive JobCard layout behavior across mobile and desktop breakpoints
* Resolved earlier rendering and data-shape issues related to text-based fields by normalizing values at the UI layer
* Completed full Job Detail page data integration using the existing `useJobs` hook, selecting an individual job record by route parameter (`id`)
* Implemented defensive rendering patterns on the Job Detail page to safely handle loading, error, and “job not found” states
* Reused the existing `JobCard` component within the Job Detail page to ensure visual and structural consistency across routes
* Successfully rendered extended job information sections, including job description, responsibilities, requirements, preferred skills, company overview, and equal opportunity statement
* Preserved database-authored formatting in long-form text fields using whitespace-aware rendering for improved readability
* Added a reusable Back Button component (shadcn/ui) to support navigation from the Job Detail page back to the main job list
* Verified stable behavior for direct navigation to job detail routes (including page refreshes)
* Confirmed end-to-end data flow from Supabase → custom hook → routed detail view without schema changes
* Locked Job Detail page scope to functional completeness per capstone requirements (intentionally deferring visual polish)
* Implemented reusable filter utility helpers (`normalizeTag`, `toggleFilter`, `removeFilter`, `clearFilter`) to manage active job badge filters using immutable array patterns
* Incorporated `slice` and `splice` intentionally to demonstrate non-mutative state updates in filter logic (aligned with instructional guidance)
* Finalized normalization strategy to ensure consistent filter comparison while preserving original badge casing for display
* Built reusable UI components for filter interactions, including display-only Filter Badges, per-filter remove (X) button, and Clear Filters button using shadcn/ui primitives
* Scaffolded the FilterBar component to render active filters conditionally, deferring list-filtering logic to the Job List page
* Prepared the filtering UI architecture for final wiring without introducing schema changes or hook refactors

## Future Ideas

In the current implementation, the job detail page reuses the existing `useJobs` hook and selects a single job by ID. In a production setting, this could be refactored to fetch an individual job record directly (e.g., via a dedicated `useJob(id)` hook) to reduce data fetching and improve scalability.

Additional potential enhancements include:

* Introducing a prop-based option on the `JobCard` component to disable navigation links when reused within the Job Detail page
* Refactoring long-form job text sections into smaller, presentational-only components to improve readability and maintainability
* Enhancing semantic structure on the Job Detail page (e.g., converting multiline text fields into structured lists where appropriate)
* Adding typography refinements to improve content hierarchy once core functionality is complete
* Implementing memoized selectors or derived helpers for job lookup logic as data volume increases
* Expanding accessibility considerations for long-form content (e.g., landmark regions and improved heading structure)

## Resources

* The Truth about CSS Breakpoints Most Teams Miss [https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints](https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints)
* Random string from an array ideas for random Not Found Msg [https://forum.freecodecamp.org/t/is-it-possible-to-get-a-random-letter-from-a-string-element-inside-an-array/319223](https://forum.freecodecamp.org/t/is-it-possible-to-get-a-random-letter-from-a-string-element-inside-an-array/319223), [https://teamtreehouse.com/community/how-do-i-use-mathrandom-on-an-array-of-questions](https://teamtreehouse.com/community/how-do-i-use-mathrandom-on-an-array-of-questions), [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#:~:text=Math.-,random(),getRandomValues()%20method.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#:~:text=Math.-,random(),getRandomValues()%20method.)
* React Router Docs [https://reactrouter.com/home](https://reactrouter.com/home)
* MDN docs for Find(), splice(), slice(), filter(), reduce(), .findIndex, string normalization [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* TailwindCSS docs [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
*

