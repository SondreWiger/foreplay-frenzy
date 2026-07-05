"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glow";
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = "default", onClick, ...motionProps }, ref) => {
    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        backgroundColor: "var(--vibe-card)",
        borderColor: "var(--vibe-card-border)",
      },
      elevated: {
        backgroundColor: "var(--vibe-card-elevated)",
        borderColor: "var(--vibe-card-elevated-border)",
        boxShadow: `0 20px 40px var(--vibe-shadow)`,
      },
      glow: {
        backgroundColor: "var(--vibe-card-elevated)",
        borderColor: "var(--vibe-card-elevated-border)",
        boxShadow: `0 0 30px var(--vibe-glow)`,
        animation: "pulse-glow 2s ease-in-out infinite",
      },
    };

    return (
      <motion.div
        ref={ref}
        whileHover={onClick ? { scale: 1.02 } : undefined}
        className={cn(
          "rounded-2xl border backdrop-blur-sm",
          variant === "glow" && "animate-pulse-glow",
          onClick && "cursor-pointer",
          className
        )}
        style={variantStyles[variant]}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export { Card };
