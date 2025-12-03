"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface SocialLoginButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const SocialLoginButton = forwardRef<HTMLButtonElement, SocialLoginButtonProps>(
  ({ label, icon: Icon, onClick, variant = "outline", size = "default", className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        type="button"
        onClick={onClick}
        className={cn("w-full gap-2", className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    );
  }
);

SocialLoginButton.displayName = "SocialLoginButton";