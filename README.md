# Job Listings App (Full Stack)

A full-stack job listings application originally built as my CodeX Academy Level 4 capstone and further developed as a portfolio project. It began as a Frontend Mentor challenge and was expanded into a multi-page React application with a backend API, authentication, persistent data, protected routes, and saved-job functionality.

The project demonstrates a complete frontend → API → database flow with an emphasis on clear architecture, maintainable code, and explainable data flow.

## Live Application

**Live Site:** https://femjoblistings.netlify.app/

The frontend is deployed on Netlify and communicates with a Node.js/Express API hosted on Render. The application uses PostgreSQL hosted through Supabase.

> **Note:** The backend uses Render's free tier and may take a short time to wake after a period of inactivity.

## Demo Account

You can create your own account, or use the demo account below to explore the authenticated experience with saved jobs already in place.

**Email:** `user3@example.com`

**Password:** `Password1!Password1!`

The demo account includes saved jobs so you can test filtering, saving and removing jobs, and the authenticated dashboard.

## Key Features

- Browse and filter job listings using AND-based tag filtering
- View individual job details with direct URL routing
- Register, log in, and access protected routes
- Save and manage bookmarked jobs with persistent data
- Maintain authentication using JWT-based authorization
- Switch between light, dark, high-contrast, and system themes
- Use the application across responsive screen sizes

---

## Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- shadcn/ui
- React Router
- JavaScript (ES6+)

**Backend**

- Express API
- Prisma ORM

**Database**

- PostgreSQL (currently hosted via Supabase)

**Deployment**

- **Frontend:** Netlify with continuous deployment from the `dev` branch
- **Backend:** Node.js/Express API hosted on Render
- **Database:** Supabase PostgreSQL accessed through Prisma
- **Previous deployment:** AWS S3 and CloudFront

The Netlify deployment includes an SPA fallback that serves `index.html` for application routes, allowing React Router to handle direct navigation and the application's custom 404 page.

The project was previously deployed using AWS S3 and CloudFront, including SPA routing configured to serve `index.html` for unknown routes.

Because the backend uses Render's free tier, it may spin down after inactivity and require a short startup period. Supabase free-tier projects may also pause after extended inactivity and require manual reactivation by the project owner.

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

## Running the Project Locally

### 1. Clone the repository

<pre class="overflow-visible! px-0!" data-start="2364" data-end="2461"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">git</span><span> clone https://github.com/ellamkoch/fem-joblistings-app.git</span><br/><span class="ͼs">cd</span><span> fem-joblistings-app</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 2. Install dependencies

<pre class="overflow-visible! px-0!" data-start="2497" data-end="2520"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">npm</span><span> install</span></code></pre></div></div></div></div></div></div></div></div></div></div></div></div></pre>

---

### 3. Configure environment variables

Create a `.env` file in the root of the project:

<pre class="overflow-visible! px-0!" data-start="2617" data-end="2667"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>VITE_API_BASE_URL=http://localhost:3005</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

If using the deployed backend:

<pre class="overflow-visible! px-0!" data-start="2701" data-end="2761"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>VITE_API_BASE_URL=https://your-render-backend-url</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

The frontend uses `VITE_API_BASE_URL` through a centralized API client, allowing it to connect to either a local backend instance or the deployed Render API.

---

### 4. Start the development server

<pre class="overflow-visible! px-0!" data-start="2805" data-end="2828"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼs">npm</span><span> run dev</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

The app will run at:

<pre class="overflow-visible! px-0!" data-start="2852" data-end="2881"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼk ͼy"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>http://localhost:5173</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

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

- Render free-tier services may spin down after inactivity and require a short startup period when accessed again
- Supabase free-tier projects may be paused after extended inactivity and require manual reactivation by the project owner
- Some frontend tests need to be updated after API refactor
- Seed data is limited and may not cover all UI edge cases

---

## Future Improvements

- Migrate database from Supabase to standalone PostgreSQL
- Expand test coverage (frontend and backend)
- Improve accessibility and contrast validation
- Refactor job detail data fetching into a dedicated hook
- Expand seed data for better UI state coverage
