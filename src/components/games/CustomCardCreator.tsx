"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { GameCard, CardPack } from "@/types";
import { saveCustomPack } from "@/lib/storage";
import { showToast } from "@/components/ui/Toast";

export function CustomCardCreator({ onClose }: { onClose: () => void }) {
  const { addPlayer } = useGameStore();
  const [packName, setPackName] = useState("");
  const [packDesc, setPackDesc] = useState("");
  const [cards, setCards] = useState<GameCard[]>([]);
  const [editing, setEditing] = useState(false);

  // New card form
  const [newType, setNewType] = useState<GameCard["type"]>("truth");
  const [newText, setNewText] = useState("");
  const [newLevel, setNewLevel] = useState<GameCard["level"]>("tease");
  const [newOptionA, setNewOptionA] = useState("");
  const [newOptionB, setNewOptionB] = useState("");
  const [newPoints, setNewPoints] = useState(10);

  const handleAddCard = () => {
    if (!newText.trim()) return;
    const card: GameCard = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: newType,
      level: newLevel,
      text: newText.trim(),
      tags: ["custom"],
      points: newPoints,
      ...(newType === "would-you-rather" || newType === "this-or-that" || newType === "most-likely-to"
        ? { optionA: newOptionA, optionB: newOptionB }
        : {}),
    };
    setCards((prev) => [...prev, card]);
    setNewText("");
    setNewOptionA("");
    setNewOptionB("");
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSavePack = () => {
    if (!packName.trim() || cards.length === 0) return;
    const pack: CardPack = {
      id: `custom-${Date.now()}`,
      name: packName.trim(),
      description: packDesc.trim() || "Custom card pack",
      author: "You",
      version: "1.0",
      cards,
      isOfficial: false,
      tags: ["custom"],
    };

    saveCustomPack(pack);
    showToast({
      emoji: "🎨",
      title: "Pack Created!",
      message: `"${pack.name}" saved with ${cards.length} cards`,
      type: "info",
    });
    onClose();
  };

  const types: GameCard["type"][] = ["truth", "dare", "wild", "would-you-rather", "this-or-that", "most-likely-to", "charades", "drinking", "challenge"];
  const levels: GameCard["level"][] = ["tease", "sensual", "dirty", "filthy", "depraved"];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-white">Create Custom Pack</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
      </div>

      {/* Pack Info */}
      <div className="space-y-3">
        <input
          type="text"
          value={packName}
          onChange={(e) => setPackName(e.target.value)}
          placeholder="Pack name..."
          className="w-full bg-blood-800/50 border border-blood-700/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 transition-colors min-h-[44px]"
        />
        <input
          type="text"
          value={packDesc}
          onChange={(e) => setPackDesc(e.target.value)}
          placeholder="Description (optional)..."
          className="w-full bg-blood-800/50 border border-blood-700/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 transition-colors min-h-[44px]"
        />
      </div>

      {/* New Card Form */}
      <Card variant="elevated" className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-white/60">Add a Card</h3>

        {/* Type & Level */}
        <div className="flex gap-2">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as GameCard["type"])}
            className="flex-1 bg-blood-800/50 border border-blood-700/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-none min-h-[40px]"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t.replace(/-/g, " ").toUpperCase()}</option>
            ))}
          </select>
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value as GameCard["level"])}
            className="flex-1 bg-blood-800/50 border border-blood-700/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-none min-h-[40px]"
          >
            {levels.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Card Text */}
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Card text..."
          rows={3}
          className="w-full bg-blood-800/50 border border-blood-700/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-pink/50 transition-colors resize-none"
        />

        {/* Options for choice-based cards */}
        {(newType === "would-you-rather" || newType === "this-or-that" || newType === "most-likely-to") && (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newOptionA}
              onChange={(e) => setNewOptionA(e.target.value)}
              placeholder="Option A..."
              className="bg-blood-800/50 border border-blood-700/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-none min-h-[40px]"
            />
            <input
              type="text"
              value={newOptionB}
              onChange={(e) => setNewOptionB(e.target.value)}
              placeholder="Option B..."
              className="bg-blood-800/50 border border-blood-700/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-none min-h-[40px]"
            />
          </div>
        )}

        {/* Points */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40">Points:</span>
          <input
            type="number"
            value={newPoints}
            onChange={(e) => setNewPoints(parseInt(e.target.value) || 10)}
            min={5}
            max={100}
            className="w-16 bg-blood-800/50 border border-blood-700/30 rounded-lg px-2 py-1 text-white text-xs text-center focus:outline-none min-h-[36px]"
          />
        </div>

        <Button onClick={handleAddCard} variant="secondary" className="w-full min-h-[44px]">
          + Add Card
        </Button>
      </Card>

      {/* Cards List */}
      {cards.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/40">{cards.length} Cards</h3>
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-blood-800/30 rounded-xl p-3 flex items-start gap-2"
            >
              <span className="text-sm">{
                card.type === "truth" ? "💋" :
                card.type === "dare" ? "🔥" :
                card.type === "wild" ? "⚡" :
                card.type === "would-you-rather" ? "🤔" :
                card.type === "this-or-that" ? "⚖️" :
                card.type === "most-likely-to" ? "👉" :
                card.type === "charades" ? "🎭" :
                card.type === "drinking" ? "🍺" : "🏆"
              }</span>
              <p className="flex-1 text-xs text-white/80 line-clamp-2">{card.text}</p>
              <button
                onClick={() => handleRemoveCard(card.id)}
                className="text-white/30 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Save */}
      <Button
        onClick={handleSavePack}
        variant="primary"
        className="w-full min-h-[48px]"
        disabled={!packName.trim() || cards.length === 0}
      >
        💾 Save Pack ({cards.length} cards)
      </Button>
    </div>
  );
}
