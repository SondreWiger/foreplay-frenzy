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
    const variants = {
      default: "bg-blood-900/80 border-blood-700/50",
      elevated: "bg-blood-900/90 border-blood-600/50 shadow-xl shadow-blood-900/50",
      glow: "bg-blood-900/90 border-blood-500/50 shadow-xl shadow-blood-500/30 animate-pulse-glow",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={onClick ? { scale: 1.02 } : undefined}
        className={cn(
          "rounded-2xl border backdrop-blur-sm",
          variants[variant],
          onClick && "cursor-pointer",
          className
        )}
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
