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

## Resources

* The Truth about CSS Breakpoints Most Teams Miss [https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints](https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints)
* Random string from an array ideas for random Not Found Msg [https://forum.freecodecamp.org/t/is-it-possible-to-get-a-random-letter-from-a-string-element-inside-an-array/319223](https://forum.freecodecamp.org/t/is-it-possible-to-get-a-random-letter-from-a-string-element-inside-an-array/319223), [https://teamtreehouse.com/community/how-do-i-use-mathrandom-on-an-array-of-questions](https://teamtreehouse.com/community/how-do-i-use-mathrandom-on-an-array-of-questions), [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#:~:text=Math.-,random(),getRandomValues()%20method.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#:~:text=Math.-,random(),getRandomValues()%20method.)
* React Router Docs [https://reactrouter.com/home](https://reactrouter.com/home)

