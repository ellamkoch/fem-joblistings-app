// LoginPage.jsx
// Renders the sign-in form and connects it to the existing auth/token flow.

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthPageShell from "@/components/auth/AuthPageShell";
import { getAuthToken } from "@/utils/getAuthToken";
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
import { login } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";

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
      email: location.state?.registeredEmail ?? "",
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
    <AuthPageShell
      title="Log in"
      description="Continue the search for your next opportunity."
    >
      <Card className="rounded-2xl border-border/70 shadow-xl pt-5">
      
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-5 gap-1.5"
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

              {location.state?.message ? (
                <p className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
                  {location.state.message}
                </p>
              ) : null}

              <FormMessage>{form.formState.errors.root?.message}</FormMessage>

              <div className="space-y-3">
                <Button
                  className="h-11 w-full text-sm font-semibold text-primary-foreground"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Need an account?{" "}
                  <Button
                    asChild
                    className="h-auto px-0 py-0 text-sm font-semibold"
                    variant="link"
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthPageShell>
  );
}

export default LoginPage;
