// LoginPage.jsx
// Renders the sign-in form and connects it to the existing auth/token flow.

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/auth/useAuth";

/**
 * Extracts an auth token from the supported backend response shapes.
 *
 * @param {unknown} payload - Raw login response payload.
 * @returns {string | null} The auth token when present.
 */
function getAuthToken(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  if (typeof payload.token === "string" && payload.token) {
    return payload.token;
  }

  if (typeof payload.accessToken === "string" && payload.accessToken) {
    return payload.accessToken;
  }

  if (
    payload.data &&
    typeof payload.data === "object" &&
    typeof payload.data.token === "string" &&
    payload.data.token
  ) {
    return payload.data.token;
  }

  if (
    payload.data &&
    typeof payload.data === "object" &&
    typeof payload.data.accessToken === "string" &&
    payload.data.accessToken
  ) {
    return payload.data.accessToken;
  }

  return null;
}

/**
 * Displays the login form and stores the returned auth token on success.
 *
 * @returns {JSX.Element} The login page.
 */
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: saveAuthToken } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    form.clearErrors("root");

    try {
      const response = await login(values);
      const token = getAuthToken(response);

      if (!token) {
        throw new Error("Login succeeded, but no auth token was returned.");
      }

      saveAuthToken(token);

      // Send the user back to the page that triggered the login redirect.
      const redirectTo = location.state?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      form.setError("root", {
        type: "server",
        message: error.message || "Unable to log in right now. Please try again.",
      });
    }
  }

  return (
    <section className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
      <div className="space-y-2 px-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Login
        </h1>
        <p className="text-base text-muted-foreground">
          Sign in to continue managing job listings.
        </p>
      </div>

      <Card className="rounded-lg border-border shadow-lg">
        <CardHeader className="gap-1.5">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-base">
            Enter your email and password below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required.",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required.",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormMessage>{form.formState.errors.root?.message}</FormMessage>

              <Button
                className="h-11 w-full text-sm font-semibold"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default LoginPage;
