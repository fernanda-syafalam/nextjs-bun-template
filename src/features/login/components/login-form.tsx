"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/features/login/hooks/use-login-form";
import { Form, FormField } from "@/components/ui/form";
import { FaApple, FaGoogle } from "react-icons/fa";
import { SocialLoginButton } from "@/features/login/components/social-login-button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    formLogin,
    onSubmit,
    isLoading,
    error,
    showPassword,
    handleSocialLogin,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field className="flex flex-col gap-3">
                  <SocialLoginButton
                    label="Continue with Apple"
                    icon={FaApple}
                    onClick={() => handleSocialLogin("Apple")}
                  />
                  <SocialLoginButton
                    label="Continue with Google"
                    icon={FaGoogle}
                    onClick={() => handleSocialLogin("Google")}
                  />
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with email
                </FieldSeparator>

                <FormField
                  control={formLogin.control}
                  name="email"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                      <FieldError
                        errors={
                          formLogin.formState.errors.email?.message
                            ? [
                                {
                                  message:
                                    formLogin.formState.errors.email.message,
                                },
                              ]
                            : []
                        }
                      />
                    </Field>
                  )}
                />

                <FormField
                  control={formLogin.control}
                  name="password"
                  render={({ field }) => (
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FieldError
                        errors={
                          formLogin.formState.errors.password?.message
                            ? [
                                {
                                  message:
                                    formLogin.formState.errors.password.message,
                                },
                              ]
                            : []
                        }
                      />
                    </Field>
                  )}
                />

                {error && <FieldError>{error}</FieldError>}

                <Field>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-sm">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
