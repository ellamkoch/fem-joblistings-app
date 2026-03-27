// RegisterPage.jsx
// Renders the registration form and connects it to the auth API flow.

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { getAuthToken } from "@/utils/getAuthToken";
import AuthPageShell from "@/components/auth/AuthPageShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/api/auth";

/**
 * Displays the registration form and handles post-submit auth behavior.
 *
 * @returns {JSX.Element} The register page.
 */
function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation(); //fallback in case users come here from a protected route. it redirects them back after register
  const { login: saveAuthToken } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    form.clearErrors("root");

    try {
      const response = await register(values);
      const token = getAuthToken(response);

      if (token) {
        saveAuthToken(token);

        const redirectTo = location.state?.from?.pathname ?? "/";
        navigate(redirectTo, { replace: true });
        return;
      }

      navigate("/login", {
        replace: true,
        state: {
          registeredEmail: values.email,
          message: "Account created. Sign in with your new credentials.",
        },
      });
    } catch (error) {
      form.setError("root", {
        type: "server",
        message:
          error.message || "Unable to create your account right now. Please try again.",
      });
    }
  }

  return (
    <AuthPageShell
      eyebrow="Create account"
      title="Register"
      description="Set up your account to manage job listings and keep your search organized."
    >
      <Card className="rounded-2xl border-border/70 shadow-xl">
        <CardHeader className="gap-1.5">
          <CardTitle className="text-2xl">Set up your account</CardTitle>
          <CardDescription className="text-base">
            Enter your details below to get started.
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
                name="name"
                rules={{
                  required: "Name is required.",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        placeholder="Jane Doe"
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
                        autoComplete="new-password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormMessage>{form.formState.errors.root?.message}</FormMessage>

              <div className="space-y-3">
                <Button
                  className="h-11 w-full text-sm font-semibold"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? "Creating account..." : "Create account"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already registered?{" "}
                  <Button
                    asChild
                    className="h-auto px-0 py-0 text-sm font-semibold"
                    variant="link"
                  >
                    <Link to="/login">Log in</Link>
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

export default RegisterPage;
