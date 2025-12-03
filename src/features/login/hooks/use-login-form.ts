import {
  LoginCredentials,
  loginCredentialsSchema,
} from "@/features/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const formLogin = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (data: LoginCredentials) => {
    toast.info("Logging in... (This is a demo)");
  }, []);

  const handleSocialLogin = useCallback((provider: string) => {
    toast.info(`Social login with ${provider} clicked (This is a demo)`);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return {
    formLogin,
    isLoading,
    error,
    showPassword,
    onSubmit,
    handleSocialLogin,
    togglePasswordVisibility,
  };
}
