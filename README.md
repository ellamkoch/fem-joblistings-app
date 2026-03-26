# FEM Job Listings App with Filtering

This is the frontend repository for my CodeX Level 4 capstone project. This app is actively being developed as part of my CodeX Level 4 capstone.

## Links

Live Site:
Repository: [https://github.com/ellamkoch/fem-joblistings-app](https://github.com/ellamkoch/fem-joblistings-app)

## Setup & Running the Project

1. Clone the repository
2. Install dependencies:
   npm install
3. Create a `.env` file with the following variable:
   `VITE_API_BASE_URL=http://localhost:3005`
4. Make sure the backend API is running locally
5. Start the development server:
   `npm run dev`

## Environment Variables

This project uses Vite environment variables for the frontend API connection:

`VITE_API_BASE_URL`

This value should point to the backend API base URL during local development.

Example:
VITE_API_BASE_URL=http://localhost:3005

These values are required to run the app locally and should not be committed to the repository.

The focus is on **correct architecture, clarity, testability, and maintainability**, not pixel-perfect styling.

## Troubleshooting

### Jobs request is hitting localhost:5173 instead of the backend

Make sure `VITE_API_BASE_URL` is set correctly in the frontend `.env` file and restart the Vite dev server after changing env vars.

### API calls return 404 from the frontend

Confirm the backend server is running on the expected port and that `VITE_API_BASE_URL` points to that backend base URL, not the frontend dev server.

### CORS errors in development

Confirm the backend CORS configuration allows `http://localhost:5173`.

### Job detail page does not load correctly by route param

The frontend is being updated from numeric-ID assumptions to backend UUID-based job IDs. Route-param lookup logic should compare string IDs rather than using numeric parsing.

## Project Overview & Capstone Goals

This project implements the **Frontend Mentor – Job Listings with Filtering** challenge as my **CodeX Level 4 capstone frontend**.

The application is being expanded from a static/frontend-focused project into a multi-page React app with real backend integration.

The current goals are to build a frontend that:

* Fetches job listing data from my Express API
* Displays listings with interactive, AND-based tag filtering
* Supports job detail views
* Supports user-specific bookmarks with save/remove toggle behavior, shared state across pages, and a dedicated saved jobs dashboard
* Demonstrates a real frontend → API → database flow
* Meets loading, error, validation, and protected-route requirements for the capstone
* Implements authentication flows for register, login, and logout
* Includes responsive layout, theme switching (light, dark, contrast, system), and UI states for filtering and interactions

The focus is on **clear architecture, real API integration, maintainability, and explainable data flow**.

## My Process

I originally built this project as a frontend-focused job listings application using a direct Supabase data flow.

For the Level 4 capstone, I am now refactoring that architecture so the frontend no longer reads directly from the database. Instead, the React app calls my Express backend API, which uses Prisma to communicate with the database.

I kept the existing UI structure where possible, then began replacing the old data-fetching layer with a backend-backed API client and resource-based request helpers. The first completed frontend refactor was the jobs list flow, which now loads from the backend API and still supports the existing badge-based filtering behavior.

Filtering remains React-state driven. Active filters are stored locally in the list view, while the visible job list is derived from the full jobs array using `useMemo` and array helpers. This preserves the original filtering behavior while allowing the data source to change underneath it.

Additional frontend work is now focused on refining the bookmarks feature, and completing deployment-ready documentation.

## Architecture Overview

* **Frontend:** React + Vite
* **Backend API:** Express
* **ORM:** Prisma
* **Database:** Postgres (Supabase-hosted)
* **Frontend Data Flow:** React → API client → backend routes → Prisma → database

### Frontend Data Layer

* `apiClient.js`

  * Central axios client for backend requests
  * Uses `VITE_API_BASE_URL` from Vite env vars
* `jobs.js`

  * Contains frontend job request helpers
  * Unwraps API responses
  * Normalizes backend job data into the shape expected by the existing UI
  * Supports both jobs list requests and single-job detail requests
* `useJobs`

  * Loads jobs through the API layer
  * Manages loading and error state
  * Acts as the frontend source of truth for job list data
* Job detail page fetches a single job by ID through the API layer
* This supports direct navigation and page refresh without requiring the full jobs list first
* `bookmarks.js`

  * Contains frontend bookmark request helpers
  * Reuses shared API response unwrapping logic
  * Reuses job normalization to convert bookmark results into UI-ready job objects
  * Supports bookmark list, create, and delete actions
* `useBookmarks`

  * Loads bookmarks through the API layer
  * Manages shared bookmark state via context/provider
  * Handles loading and error state
  * Exposes add/remove bookmark actions
  * Provides `isBookmarked` helper for UI components
* `useBookmarkToggle`

  * Handles per-job bookmark toggle behavior
  * Prevents duplicate requests with a pending state
  * Supports both toggle and remove-only interaction modes
* `ThemeProvider`

  * Manages global theme state across the application
  * Applies theme classes to the root document element (`<html>`)
  * Supports `light`, `dark`, `contrast`, and `system` themes
  * Persists user preference in localStorage
  * Resolves system theme using `prefers-color-scheme`
* `useTheme`

  * Provides access to current theme and resolved theme
  * Exposes `setTheme` for updating user preference
  * Allows UI components to react to theme changes without direct DOM manipulation
* `formatDate`

  * Utility helper for converting backend `postedAt` timestamps into human-readable relative time (e.g., "3 days ago", "2 weeks ago")
  * Uses `Intl.RelativeTimeFormat` for built-in pluralization and natural language formatting
  * Supports day, week, and month ranges for simplified UI display
  * Safely handles missing or invalid date values

### Bookmark Feature Notes

The bookmarks feature is implemented as a user-specific relationship between users and jobs, with shared frontend state to keep UI interactions consistent across pages.

On the frontend:

* Bookmark data is managed through a shared `BookmarksProvider` and `useBookmarks` hook
* This ensures bookmarks are loaded once and reused across the app (avoiding duplicate API calls)
* Bookmark list responses are transformed into normalized job objects
* This allows the bookmarks page to reuse the existing `JobCard` component without introducing a separate bookmark-specific UI model

Bookmark interactions are split into two responsibilities:

* **Collection state (useBookmarks)**

  * Loads and stores the full list of saved jobs
  * Handles initial loading and error state
  * Provides helper functions for add/remove actions
  * Provides `isBookmarked(jobId)` for UI state checks
* **Per-job toggle behavior (useBookmarkToggle)**

  * Handles save/remove logic for individual jobs
  * Prevents duplicate requests using a `pending` state
  * Supports both toggle mode (job list, detail page) and remove-only mode (bookmarks page)

UX behavior:

* Saving/removing a bookmark updates local state immediately (no full refetch required)
* The bookmarks page reuses normalized job data and existing UI components
* Loading state is limited to the initial bookmark fetch to prevent UI flicker during individual actions
* Bookmark state remains consistent across pages through shared context

Edge case handling:

* Bookmark list loads only after authentication is available
* Duplicate bookmark attempts trigger a resync to correct local state
* Bookmark state is cleared on logout

### Theme System

The application includes a global theme system designed for consistency, accessibility, and user preference persistence.

Theme state is managed through a dedicated `ThemeProvider`, which centralizes all theme-related logic and ensures consistent styling across the application.

Key implementation details:

* Theme is applied by toggling class names on the root `<html>` element
* Styling is driven by CSS custom properties (variables), allowing components to remain theme-agnostic
* Supports multiple theme modes:
  * `light`
  * `dark`
  * `contrast` (high-contrast accessibility mode)
  * `system` (automatically matches the user's OS preference)
* User-selected theme is persisted in localStorage and restored on page load
* System theme changes are detected using the `prefers-color-scheme` media query

UX considerations:

* Theme changes apply instantly without requiring a page reload
* The selected theme is consistent across all pages and components
* High-contrast mode improves accessibility for users who need stronger visual distinction

Architecture notes:

* Theme logic is centralized in the provider rather than scattered across components
* Components rely on CSS variables instead of conditional inline styles
* This approach keeps UI components simple and scalable as additional themes or tokens are introduced

### Authentication Flow

The frontend implements JWT-based authentication using the backend API.

* Users are redirected to `/login` when attempting to access protected routes
* Users can create an account via the `/register` page
* The register form submits user data to the backend auth endpoint
* If the backend returns a token, the user is automatically logged in after registration
* If no token is returned, the user is redirected to `/login`
* The login form submits credentials to the backend auth endpoint
* On success, the returned JWT is stored in local storage
* The token is automatically attached to API requests via the centralized axios client
* Auth state is managed through an `AuthProvider` and accessed via a custom `useAuth` hook
* Auth state persists across page refresh using stored token restoration
* Users can log out from protected pages, which clears local auth state and redirects to `/login`
* Unauthorized responses (401) trigger automatic logout and token clearing

### State

* Filter state is stored locally in React
* No URL query syncing is currently used
* Active filters are derived against normalized job data

### Derived Data

* `visibleJobs` is computed from the jobs array and active filters using `useMemo`

### Filtering Logic

* AND-based badge filtering is preserved from the original frontend implementation
* Active filters are stored as user-facing display values (e.g., "Git", "JavaScript")
* For comparison, both filter values and job data are normalized to a consistent lowercase format

Normalization approach:

* A shared `normalizeBadge` helper trims and lowercases values for reliable comparison
* This allows display formatting (capitalization) to remain separate from filtering logic
* Ensures filters continue to work even when UI labels are formatted differently from raw data

Matching behavior:

* Each job must match **all active filters** (AND-based filtering)
* A job matches a filter if the normalized filter value is found within:
  * `role`
  * `level`
  * `languages`
  * `tools`

Implementation notes:

* Filtering logic uses `reduce` to evaluate whether a job satisfies all active badges
* Comparisons use normalized values on both sides to prevent mismatches caused by capitalization
* String-based matching (`includes`) is used for flexible matching across tag fields

### Date Formatting

Job posting dates are converted from backend timestamps into human-readable relative time strings for improved UI clarity.

Implementation details:

* A reusable `formatDate` utility handles all date formatting logic
* Uses JavaScript's built-in `Intl.RelativeTimeFormat` for natural language output and correct pluralization
* Converts timestamps into:
  * days ("3 days ago")
  * weeks ("2 weeks ago")
  * months ("1 month ago")
* Keeps formatting logic separate from UI components to maintain clean and declarative JSX

Design considerations:

* Avoids over-granularity (minutes/hours) to keep the UI simple and scannable
* Ensures consistent formatting across all views that display job metadata
* Allows future extension without modifying component-level logic

## Routes

* **`/login` — Login Page**

  * Allows users to authenticate via the backend API
  * Redirects authenticated users to protected routes
* **Protected Routes**

  * `/` (Job List) and `/jobs/:id` require authentication
  * Unauthenticated users are redirected to `/login`
* **`/bookmarks` — Saved Jobs Page**

  * Displays all bookmarked jobs for the authenticated user
  * Reuses the `JobCard` component for consistent UI
  * Allows users to remove saved jobs from their collection
  * Shares state with the jobs list via the bookmarks context
* **`/jobs/:id` — Job Detail Page**

  * * Loads job data from the backend-backed job list
    * Matches jobs using UUID-based IDs
    * Displays full job details including description, responsibilities, and requirements
    * Handles missing or incomplete data gracefully
* **`*` — Not Found Page**

  * Catches invalid routes
  * Displays one of three predefined messages
  * Message is selected once on mount and remains stable across re-renders

## Database Schema

The backend uses Prisma with a Postgres database. The current core models are:

### User

* `id`
* `email`
* `name`
* `passwordHash`
* `createdAt`

### Job

* `id`
* `company`
* `position`
* `role`
* `level`
* `contract`
* `languages`
* `tools`
* `logoUrl`
* `location`
* `jobDesc`
* `responsibilities`
* `nice2have`
* `about`
* `eoeStatement`
* `requirements`
* `authorId`
* `isNew`
* `isFeatured`
* `postedAt`
* `createdAt`
* `updatedAt`

### Bookmark

* `id`
* `jobId`
* `userId`
* `createdAt`

### RevokedToken

* `id`
* `tokenHash`
* `userId`
* `expiresAt`
* `revokedAt`

## Accessibility Notes

Accessibility considerations are included throughout the UI:

* Semantic HTML structure is used where possible
* Interactive elements include appropriate `aria-labels`
* Clickable badges and buttons are keyboard accessible
* Focus states and hover states are preserved for usability
* Empty and error states provide clear user feedback
* Project codebase is now lint-clean and ready for deployment and test branch creation

## Testing

### Backend Integration Testing

Although this is the frontend repository, the application depends on a working backend API. Backend functionality was verified using **Postman** to ensure the required flows work correctly.

Validated behaviors:

* Authentication (register/login)
* Protected route access with JWT
* Jobs resource (list and detail endpoints)
* Bookmarks resource (create, list, delete) with user-specific persistence
* Data persistence after refresh
* Error handling for invalid input and unauthorized requests

A Postman collection is available (or will be included) to demonstrate these flows.

### Frontend Testing

Vitest-based tests were created during the initial frontend build on a separate branch.

These tests focus on UI behavior and filtering logic.

As part of the Level 4 refactor, the data layer has changed from direct Supabase access to a backend API. Existing tests will be reviewed and updated to mock the API layer where needed.

### Future Testing

Planned improvements:

* Add or restore Vitest-based frontend tests
* Test filtering logic and derived state
* Test UI states such as loading, error, and empty states

## Project Status

### Frontend foundation already in place

* Project scaffolded with Vite + React
* Tailwind CSS installed and configured
* shadcn/ui components installed and available for UI primitives
* Global layout implemented with shared header and footer
* Routing structure established for job list, job detail, and not found pages
* Existing job listings UI, filtering UI, and job detail UI reused from the earlier version of the project
* Complete deployment notes, env examples, and final README updates

### Frontend refactor to backend API — in progress

* Removed direct frontend dependency on Supabase for the jobs list flow
* Added a centralized frontend API client for backend requests
* Added a frontend jobs API module to:

  * request jobs from the backend
  * unwrap the API response envelope
  * normalize backend job fields into the shape expected by the existing UI
* Updated `useJobs` to load jobs from the backend API instead of querying Supabase directly
* Confirmed the job list now loads from the backend API successfully
* Confirmed existing badge-based filtering still works with backend-loaded job data
* Implemented job detail page using backend-loaded job data
* Confirmed routing from list → detail works with UUID-based IDs
* Verified full frontend → backend → database data flow
* Implemented complete frontend authentication flow:

  * Login and register pages built using shadcn/ui
  * JWT storage and persistence across refresh
  * Auth context/provider for frontend auth state
  * Axios client configured with bearer token
  * Protected routes using `ProtectedRoute`
  * Logout functionality with resilient local state clearing
* Implemented relative date formatting for job postings using a reusable utility helper

### Current next steps

* Refine backend bookmark response fields for improved frontend consistency
* Complete deployment notes and final README polish
* Expand seed data to better test UI states and edge cases (date ranges, filters, badges)
* Refine conditional rendering for optional fields

## Future Ideas

As the backend integration matures, the job detail page could be refactored to fetch an individual job directly rather than depending on the full job list already being present in memory. A dedicated `useJob(id)` hook or job-detail API helper would reduce unnecessary list-level dependency and better support direct navigation and refresh behavior.

Additional potential enhancements include:

* Introducing a prop-based option on the `JobCard` component to disable navigation links when reused within the Job Detail page
* Refactoring long-form job text sections into smaller, presentational-only components to improve readability and maintainability
* Enhancing semantic structure on the Job Detail page (e.g., converting multiline text fields into structured lists where appropriate)
* Adding typography refinements to improve content hierarchy once core functionality is complete
* Implementing memoized selectors or derived helpers for job lookup logic as data volume increases
* Expanding accessibility considerations for long-form content (e.g., landmark regions and improved heading structure)

## Resources

* [React Router Docs](https://reactrouter.com/home)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [MDN Array Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [MDN Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
* [BrowserStack: CSS Breakpoints Guide](https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints)
* [ MDN Intl.RelativeTimeFormat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
