"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getCustomPacks, saveCustomPack, deleteCustomPack } from "@/lib/storage";
import { showToast } from "@/components/ui/Toast";
import type { CardPack } from "@/types";

// Premium packs available for purchase (placeholder for future IAP)
const premiumPacks: (CardPack & { price: string; popular?: boolean })[] = [
  {
    id: "premium-bdsm",
    name: "BDSM Starter Pack",
    description: "30 beginner-friendly BDSM prompts and challenges",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["bdsm", "beginner"],
    price: "$1.99",
    popular: true,
  },
  {
    id: "premium-roleplay-2",
    name: "Roleplay Vol. 2",
    description: "30 new fantasy scenarios from nurse to pirate",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["roleplay", "fantasy"],
    price: "$1.99",
  },
  {
    id: "premium-party-2",
    name: "Party Pack Vol. 2",
    description: "30 new SFW party games and challenges",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["party", "sfw"],
    price: "$0.99",
  },
  {
    id: "premium-spicy-2",
    name: "Spicy Truth or Dare",
    description: "30 extra spicy truths and dares",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["truth", "dare", "spicy"],
    price: "$1.99",
    popular: true,
  },
  {
    id: "premium-dice-2",
    name: "Fantasy Dice Vol. 2",
    description: "New dice tables with expanded actions and scenarios",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["dice", "fantasy"],
    price: "$1.49",
  },
  {
    id: "premium-drinking-2",
    name: "Ultimate Drinking Pack",
    description: "30 new drinking games and challenges",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: [],
    isOfficial: true,
    tags: ["drinking", "party"],
    price: "$0.99",
  },
];

interface PackStoreProps {
  onClose: () => void;
}

export function PackStore({ onClose }: PackStoreProps) {
  const [purchased, setPurchased] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"store" | "library">("store");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("ff-purchased-packs") || "[]");
      setPurchased(stored);
    } catch {
      setPurchased([]);
    }
  }, []);

  const handlePurchase = (packId: string) => {
    // In a real app, this would trigger IAP. For now, simulate purchase.
    const newPurchased = [...purchased, packId];
    setPurchased(newPurchased);
    localStorage.setItem("ff-purchased-packs", JSON.stringify(newPurchased));
    const pack = premiumPacks.find((p) => p.id === packId);
    showToast({
      emoji: "🎉",
      title: "Pack Purchased!",
      message: `"${pack?.name}" is now in your library`,
      type: "info",
    });
  };

  const handleDelete = (packId: string) => {
    deleteCustomPack(packId);
    showToast({
      emoji: "🗑️",
      title: "Pack Deleted",
      message: "Custom pack removed",
      type: "info",
    });
  };

  const customPacks = getCustomPacks();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-white">Card Packs</h2>
        <Button onClick={onClose} variant="ghost" size="sm">✕ Close</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["store", "library"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all min-h-[40px] capitalize"
            style={activeTab === tab
              ? { backgroundColor: "var(--vibe-accent-dim)", borderColor: "var(--vibe-accent)", color: "var(--vibe-accent)" }
              : { backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)", color: "rgba(255,255,255,0.4)" }
            }
          >
            {tab === "store" ? "🏪 Store" : "📚 My Packs"}
          </button>
        ))}
      </div>

      {/* Store */}
      {activeTab === "store" && (
        <div className="space-y-3">
          <p className="text-xs text-white/40">Premium packs coming soon. Create your own in the meantime!</p>
          {premiumPacks.map((pack, i) => {
            const isOwned = purchased.includes(pack.id);
            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border rounded-xl p-4"
                style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📦</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{pack.name}</p>
                      {pack.popular && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ backgroundColor: "var(--vibe-accent-dim)", color: "var(--vibe-accent)" }}>
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 mt-0.5">{pack.description}</p>
                    <div className="flex gap-1 mt-1.5">
                      {pack.tags.map((tag) => (
                        <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {isOwned ? (
                      <span className="text-[10px] font-bold text-green-400">✓ OWNED</span>
                    ) : (
                      <>
                        <p className="text-sm font-bold" style={{ color: "var(--vibe-accent)" }}>{pack.price}</p>
                        <Button onClick={() => handlePurchase(pack.id)} variant="ghost" size="sm" className="mt-1 text-[9px]">
                          Get Pack
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Library */}
      {activeTab === "library" && (
        <div className="space-y-3">
          {customPacks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-sm text-white/40">No custom packs yet.</p>
              <p className="text-xs text-white/30">Create your own in the Custom Cards section!</p>
            </div>
          ) : (
            customPacks.map((pack) => (
              <div
                key={pack.id}
                className="border rounded-xl p-3 flex items-center gap-3"
                style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}
              >
                <span className="text-xl">📦</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{pack.name}</p>
                  <p className="text-[10px] text-white/40">{pack.cards?.length || 0} cards</p>
                </div>
                <Button onClick={() => handleDelete(pack.id)} variant="ghost" size="sm" className="text-[9px]">
                  🗑️
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
