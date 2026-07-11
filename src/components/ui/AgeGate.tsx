"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const AGE_GATE_KEY = "ff-age-confirmed";

export function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem(AGE_GATE_KEY);
    if (!confirmed) setShow(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(AGE_GATE_KEY, "true");
    setShow(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="max-w-sm w-full text-center space-y-6"
          >
            <div className="text-6xl sm:text-7xl">🔥</div>

            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blood-400 via-red-500 to-neon-pink">
              FOREPLAY FRENZY
            </h1>

            <div className="space-y-3">
              <p className="text-sm text-white/70">
                This app contains <span className="font-bold text-white">adult content</span> including
                sexual themes, explicit language, and NSFW material.
              </p>
              <p className="text-xs text-white/40">
                You must be <span className="font-bold text-white">18 years or older</span> to use this app.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleConfirm}
                variant="primary"
                size="lg"
                className="w-full min-h-[52px]"
              >
                I am 18+ — Enter
              </Button>
              <button
                onClick={handleDecline}
                className="w-full py-3 text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                I am under 18 — Exit
              </button>
            </div>

            <p className="text-[9px] text-white/20 leading-relaxed">
              By entering, you agree that you are of legal age in your jurisdiction.
              This app is intended for adults only.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
