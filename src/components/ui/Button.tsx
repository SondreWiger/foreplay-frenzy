"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends MotionProps {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "neon";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      disabled,
      onClick,
      ...motionProps
    },
    ref
  ) => {
    const variants = {
      primary:
        "text-white border shadow-lg",
      secondary:
        "bg-leather-600 hover:bg-leather-500 text-white border border-leather-400/30",
      danger:
        "text-white border shadow-lg",
      ghost:
        "bg-transparent hover:bg-white/10 text-white/70 hover:text-white border border-transparent",
      neon:
        "border shadow-lg",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg",
      md: "px-4 py-2 text-sm rounded-xl",
      lg: "px-6 py-3 text-base rounded-xl",
    };

    const getVariantStyle = (variant: string): React.CSSProperties => {
      switch (variant) {
        case "primary":
          return {
            backgroundColor: "var(--vibe-primary)",
            borderColor: "var(--vibe-primary-hover)",
            boxShadow: `0 4px 14px var(--vibe-button-shadow)`,
          };
        case "danger":
          return {
            backgroundColor: "var(--vibe-danger)",
            borderColor: "var(--vibe-danger-hover)",
            boxShadow: `0 4px 14px var(--vibe-button-shadow)`,
          };
        case "neon":
          return {
            backgroundColor: "var(--vibe-accent-dim)",
            color: "var(--vibe-accent)",
            borderColor: "color-mix(in srgb, var(--vibe-accent) 50%, transparent)",
            boxShadow: `0 4px 14px var(--vibe-neon-shadow)`,
          };
        default:
          return {};
      }
    };

    const getHoverStyle = (variant: string): React.CSSProperties => {
      switch (variant) {
        case "primary":
          return { backgroundColor: "var(--vibe-primary-hover)" };
        case "danger":
          return { backgroundColor: "var(--vibe-danger-hover)" };
        case "neon":
          return { backgroundColor: "color-mix(in srgb, var(--vibe-accent) 30%, transparent)" };
        default:
          return {};
      }
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          "font-semibold transition-all duration-200 cursor-pointer select-none",
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={getVariantStyle(variant)}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={(e) => {
          if (!disabled) Object.assign(e.currentTarget.style, getHoverStyle(variant));
        }}
        onMouseLeave={(e) => {
          if (!disabled) Object.assign(e.currentTarget.style, getVariantStyle(variant));
        }}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
