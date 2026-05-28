# Job Listings App (Full Stack)

This project is a full stack job listings application built as my CodeX Level 4 capstone. It began as a Frontend Mentor challenge and was expanded into a multi-page React application with a backend API, authentication, and persistent data.

The goal of this project is to demonstrate a complete frontend → API → database flow, along with clear architecture, maintainable code, and real-world patterns.

---

## Project Overview

The application allows users to:

- Browse and filter job listings using AND-based tag filtering
- View detailed job information
- Create an account and authenticate
- Save and manage bookmarked jobs
- Navigate protected routes based on authentication state
- Switch between light, dark, contrast, and system themes

This project focuses on clarity, structure, and explainable data flow rather than pixel-perfect styling.

---

## Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- shadcn/ui
- React Router

**Backend**

- Express API
- Prisma ORM

**Database**

- PostgreSQL (currently hosted via Supabase)

**Deployment**

- Backend: Render
- Frontend: previously deployed to AWS S3 + CloudFront

---

## Deployment Notes

This project was originally deployed using AWS S3 and CloudFront for the frontend, with SPA routing configured to serve `index.html` for unknown routes.

The backend API is currently deployed on Render and remains active.

The database is currently hosted on Supabase (PostgreSQL). Because this is a free-tier service, it may spin down after periods of inactivity, which can cause temporary delays when reconnecting.

### Planned Improvement

The database will be migrated to a standalone PostgreSQL setup in the future. This will remove the dependency on Supabase while keeping the same relational data structure.

---

## Running the Project Locally

### 1. Clone the repository

<pre class="overflow-visible! px-0!" data-start="2364" data-end="2461"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">git</span><span> clone https://github.com/ellamkoch/fem-joblistings-app.git</span><br/><span class="ͼs">cd</span><span> fem-joblistings-app</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 2. Install dependencies

<pre class="overflow-visible! px-0!" data-start="2497" data-end="2520"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">npm</span><span> install</span></code></pre></div></div></div></div></div></div></div></div></div></div></div></div></pre>

### 3. Configure environment variables

Create a `.env` file in the root of the project:

<pre class="overflow-visible! px-0!" data-start="2617" data-end="2667"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>VITE_API_BASE_URL=http://localhost:3005</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

If using the deployed backend:

<pre class="overflow-visible! px-0!" data-start="2701" data-end="2761"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>VITE_API_BASE_URL=https://your-render-backend-url</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 4. Start the development server

<pre class="overflow-visible! px-0!" data-start="2805" data-end="2828"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">npm</span><span> run dev</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

The app will run at:

<pre class="overflow-visible! px-0!" data-start="2852" data-end="2881"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>http://localhost:5173</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## Backend Connection

The frontend connects to the backend through a centralized API client.

You can run the app using:

- a local backend instance, or
- the deployed Render backend

All API requests use the `VITE_API_BASE_URL` environment variable.

---

## Architecture Overview

Frontend data flow:

<pre class="overflow-visible! px-0!" data-start="3196" data-end="3261"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>React → API client → Express routes → Prisma → PostgreSQL</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Key patterns implemented:

- Centralized API client for all requests
- Data normalization before rendering
- Custom hooks for jobs and bookmarks
- Context-based state for shared data
- Protected routes for authenticated access

---

## Features

- Job listing retrieval from backend API
- AND-based filtering using tags
- Job detail pages with direct routing support
- Bookmark system with shared state across pages
- Authentication flow (register, login, logout)
- Persistent auth state using JWT
- Theme system (light, dark, contrast, system)
- Responsive layout and UI states

---

## Authentication Flow

- Users register or log in through the frontend
- JWT is returned from the backend and stored locally
- Token is attached to API requests via the API client
- Protected routes require authentication
- Unauthorized responses trigger automatic logout

---

## Theme System

The application includes a global theme system with:

- Light mode
- Dark mode
- High contrast mode
- System preference detection

Themes are implemented using CSS variables and applied at the root level, allowing components to remain theme-agnostic.

---

## Testing

Backend functionality was verified using Postman, including:

- Authentication
- Protected routes
- Job retrieval
- Bookmark creation and deletion
- Data persistence

Frontend tests were created earlier in development and are planned to be updated to reflect the current API-based data layer.

---

## Known Limitations

- Supabase free-tier database may spin down after inactivity
- Some frontend tests need to be updated after API refactor
- Seed data is limited and may not cover all UI edge cases

---

## Future Improvements

- Migrate database from Supabase to standalone PostgreSQL
- Expand test coverage (frontend and backend)
- Improve accessibility and contrast validation
- Refactor job detail data fetching into a dedicated hook
- Expand seed data for better UI state coverage
