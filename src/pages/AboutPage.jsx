import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const builtWithItems = [
  "Frontend: React, Vite, Tailwind CSS, shadcn/ui",
  "State Management: React Context API, custom hooks",
  "Backend: Node.js, Express (serverless-ready architecture)",
  "Database & ORM: Supabase Postgres, Prisma ORM",
  "Authentication: JWT-based authentication with protected routes",
  "API: RESTful design with centralized API client and consistent responses",
];

const featureItems = [
  "User registration and login",
  "Protected routes and authenticated API access",
  "Job listings with filtering",
  "Bookmark and saved jobs functionality",
  "Relative date formatting",
  "Theme support (light, dark, system)",
];

const deploymentItems = [
  "Frontend: AWS S3 + CloudFront (SPA with routing support)",
  "Backend: Hosted API with environment-based configuration",
  "Database: Supabase Postgres connected via Prisma",
  "Secure environment variables for CORS, JWT, and database access",
];

const focusItems = [
  "End-to-end data flow (Frontend -> API -> Database -> Frontend)",
  "Feature-based frontend architecture",
  "Clean, reusable components and hooks",
  "Maintainable and scalable code structure",
  "Real-world deployment and environment configuration",
];

const learnedItems = [
  "Building and deploying a full-stack application",
  "Using Prisma with a hosted PostgreSQL database",
  "Managing authentication and protected routes",
  "Designing and consuming REST APIs",
  "Organizing frontend code by feature",
  "Debugging UI, state, and deployment issues",
];

function AboutPage() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-4 -mt-28 sm:-mt-32 lg:-mt-40">
      <div className="space-y-3 px-1 text-primary-foreground">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
          Project overview
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            About This Project
          </h1>

        </div>
      </div>

      <Card className="rounded-2xl border-border/70 shadow-xl">
        <CardHeader className="gap-3">
          <div className="space-y-2">

            <CardDescription className="max-w-3xl text-base leading-7">
              This is a full-stack job listings application built as part of my
              CodeX Academy Level 4 capstone. It demonstrates a complete
              frontend to backend to database flow with authentication,
              filtering, and saved jobs functionality.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pb-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-border/70 bg-accent/40 p-5">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Built With
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                {builtWithItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border/70 bg-accent/40 p-5">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Features
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                {featureItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <Separator />

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="space-y-6">
              <div className="rounded-xl border border-border/70 p-5">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Deployment
                </h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                  {deploymentItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border/70 p-5">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Project Focus
                </h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                  {focusItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-xl border border-border/70 p-5">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                What I Learned
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                {learnedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </CardContent>

      </Card>
    </section>
  );
}

export default AboutPage;
