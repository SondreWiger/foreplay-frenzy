"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Toast {
  id: string;
  emoji: string;
  title: string;
  message: string;
  type: "achievement" | "level" | "info";
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(toast: Omit<Toast, "id">) {
  const t: Toast = { ...toast, id: Date.now().toString() };
  toastListeners.forEach((fn) => fn(t));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== listener);
    };
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-80 z-[100] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <div
              onClick={() => dismiss(toast.id)}
              className={`cursor-pointer rounded-xl p-3 sm:p-4 shadow-2xl border backdrop-blur-sm ${
                toast.type === "achievement"
                  ? "bg-blood-900/95 border-neon-pink/40 shadow-neon-pink/20"
                  : toast.type === "level"
                  ? "bg-blood-900/95 border-amber-500/40 shadow-amber-500/20"
                  : "bg-blood-900/95 border-blood-600/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{toast.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white">{toast.title}</p>
                  <p className="text-[10px] sm:text-xs text-white/50 truncate">{toast.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
