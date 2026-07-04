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
        "bg-blood-600 hover:bg-blood-500 text-white border border-blood-500/50 shadow-lg shadow-blood-500/20",
      secondary:
        "bg-leather-600 hover:bg-leather-500 text-white border border-leather-400/30",
      danger:
        "bg-red-700 hover:bg-red-600 text-white border border-red-500/50 shadow-lg shadow-red-500/20",
      ghost:
        "bg-transparent hover:bg-white/10 text-white/70 hover:text-white border border-transparent",
      neon:
        "bg-neon-pink/20 hover:bg-neon-pink/30 text-neon-pink border border-neon-pink/50 shadow-lg shadow-neon-pink/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg",
      md: "px-4 py-2 text-sm rounded-xl",
      lg: "px-6 py-3 text-base rounded-xl",
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
        disabled={disabled}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
