"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePriceMemoryEngine } from "@/hooks/usePriceMemoryEngine";
import type { Difficulty } from "@/hooks/usePriceMemoryEngine";

const DIFFICULTIES: {
  level: Difficulty;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    level: "easy",
    label: "Easy",
    desc: "8 cards (4 pairs)\n2 minutes",
    icon: "🟢",
  },
  {
    level: "medium",
    label: "Medium",
    desc: "12 cards (6 pairs)\n3 minutes",
    icon: "🟡",
  },
  {
    level: "hard",
    label: "Hard",
    desc: "16 cards (8 pairs)\n4 minutes",
    icon: "🔴",
  },
];

export default function PriceMemoryPage() {
  const router = useRouter();
  const { gameState, flipCard, resetGame, initializeGame } =
    usePriceMemoryEngine();
  const [showInstructions, setShowInstructions] = useState(false);

  const handleCardClick = (cardId: string) => {
    const card = gameState.cards.find((c) => c.id === cardId);
    if (card) {
      flipCard(card);
    }
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    initializeGame(difficulty);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Difficulty Selection Screen
  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Grid Background */}
        <div
          className="fixed inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Scattered Dots */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-3 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-8"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 font-bold"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-7xl"
              >
                🧠
              </motion.div>

              <div>
                <h1
                  className="text-5xl font-black text-gray-900 mb-3"
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  Price Memory!
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-8 h-0.5 bg-gray-400"
                    style={{ transform: "rotate(-2deg)" }}
                  />
                  <p className="text-gray-600 font-medium">Nepal Edition</p>
                  <div
                    className="w-8 h-0.5 bg-gray-400"
                    style={{ transform: "rotate(2deg)" }}
                  />
                </div>
              </div>

              {/* How to Play Toggle */}
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="mx-auto text-purple-600 hover:text-purple-800 font-bold text-sm underline"
              >
                {showInstructions ? "Hide" : "Show"} How to Play
              </button>

              {/* Instructions Section */}
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-blue-50 border-2 border-gray-900 rounded-xl p-6 text-left space-y-4"
                  style={{ transform: "rotate(0.5deg)" }}
                >
                  <h3
                    className="font-black text-gray-900 text-lg"
                    style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                  >
                    📖 How to Play:
                  </h3>
                  <ul className="space-y-3 text-gray-700 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="text-xl font-black">①</span>
                      <span>
                        <strong>Pick a difficulty</strong> - Choose from Easy,
                        Medium, or Hard
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl font-black">②</span>
                      <span>
                        <strong>Flip cards</strong> - Click on cards to reveal
                        item names or prices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl font-black">③</span>
                      <span>
                        <strong>Find matches</strong> - Match each item name
                        with its correct price
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl font-black">④</span>
                      <span>
                        <strong>Beat the clock</strong> - Complete all pairs
                        before time runs out!
                      </span>
                    </li>
                  </ul>
                  <div className="bg-yellow-100 border border-gray-900 rounded-lg p-3 mt-4">
                    <p className="text-xs text-gray-800 font-bold">
                      💡 <strong>Pro Tip:</strong> Remember which items and
                      prices you've seen to make better matches!
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                <p
                  className="text-gray-800 font-black text-lg"
                  style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                >
                  Choose Your Challenge:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DIFFICULTIES.map((difficulty) => (
                    <motion.button
                      key={difficulty.level}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDifficultySelect(difficulty.level)}
                      className="bg-white border-3 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-center"
                      style={{ transform: "rotate(-1deg)" }}
                    >
                      <div className="text-5xl mb-3">{difficulty.icon}</div>
                      <h3 className="font-black text-xl text-gray-900 mb-2">
                        {difficulty.label}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium whitespace-pre-line">
                        {difficulty.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game Screen
  return (
    <div className="min-h-screen bg-white relative">
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scattered Dots */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative border-b-3 border-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-black text-gray-900 tracking-tight"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
              }}
            >
              🧠 Price Memory
            </motion.h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Game Stats */}
        {!gameState.gameEnded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-3 mb-8"
          >
            <div
              className={`bg-white border-3 border-gray-900 rounded-xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                gameState.timeLeft <= 30 ? "bg-red-100" : ""
              }`}
              style={{ transform: "rotate(-1deg)" }}
            >
              <p className="text-gray-500 text-xs font-bold mb-1">TIME LEFT</p>
              <p
                className={`text-3xl font-black ${gameState.timeLeft <= 30 ? "text-red-600" : "text-gray-900"}`}
              >
                {formatTime(gameState.timeLeft)}
              </p>
            </div>
            <div
              className="bg-white border-3 border-gray-900 rounded-xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: "rotate(1deg)" }}
            >
              <p className="text-gray-500 text-xs font-bold mb-1">MOVES</p>
              <p className="text-3xl font-black text-gray-900">
                {gameState.moves}
              </p>
            </div>
            <div
              className="bg-white border-3 border-gray-900 rounded-xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: "rotate(-1deg)" }}
            >
              <p className="text-gray-500 text-xs font-bold mb-1">PAIRS</p>
              <p className="text-3xl font-black text-purple-600">
                {gameState.matchedPairs}/
                {gameState.difficulty === "easy"
                  ? "4"
                  : gameState.difficulty === "medium"
                    ? "6"
                    : "8"}
              </p>
            </div>
            <div
              className="bg-white border-3 border-gray-900 rounded-xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: "rotate(1deg)" }}
            >
              <p className="text-gray-500 text-xs font-bold mb-1">SCORE</p>
              <p className="text-3xl font-black text-green-600">
                {gameState.score}
              </p>
            </div>
          </motion.div>
        )}

        {/* Game Board */}
        {!gameState.gameEnded ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-3 mb-8 ${
              gameState.difficulty === "easy"
                ? "grid-cols-4"
                : gameState.difficulty === "medium"
                  ? "grid-cols-4 sm:grid-cols-6"
                  : "grid-cols-4 sm:grid-cols-8"
            }`}
          >
            {gameState.cards.map((card) => (
              <motion.button
                key={card.id}
                variants={cardVariants}
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleCardClick(card.id)}
                disabled={gameState.isProcessing || card.isMatched}
                className="relative h-24 sm:h-28"
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: card.isFlipped ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-linear-to-br from-purple-500 to-purple-700 border-3 border-gray-900 rounded-lg flex items-center justify-center font-black text-3xl sm:text-4xl cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    ?
                  </div>

                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 border-3 rounded-lg flex flex-col items-center justify-center p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden ${
                      card.isMatched
                        ? "bg-linear-to-br from-green-300 to-green-500 border-green-900"
                        : "bg-linear-to-br from-blue-200 to-blue-400 border-gray-900"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {card.type === "name" ? (
                      <>
                        <p className="text-xs font-bold text-gray-700 mb-0.5">
                          ITEM
                        </p>
                        <p className="text-xs sm:text-sm font-black text-gray-900 text-center line-clamp-2 leading-tight">
                          {card.itemName}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-gray-700">PRICE</p>
                        <p className="text-lg sm:text-xl font-black text-gray-900">
                          ₹{card.price}
                        </p>
                        <p className="text-xs text-gray-700">{card.unit}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Game Over Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-3 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-12 text-center max-w-lg mx-auto"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {gameState.timeLeft > 0 ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl mb-6"
                >
                  🎉
                </motion.div>
                <h2
                  className="text-4xl font-black text-gray-900 mb-6"
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  You Won!
                </h2>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl mb-6"
                >
                  ⏰
                </motion.div>
                <h2
                  className="text-4xl font-black text-red-600 mb-6"
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  Time's Up!
                </h2>
              </>
            )}

            <div
              className="bg-yellow-100 border-2 border-gray-900 rounded-xl p-6 mb-8 text-left"
              style={{ transform: "rotate(1deg)" }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Pairs Found:</span>
                  <span className="text-2xl font-black text-gray-900">
                    {gameState.matchedPairs}/
                    {gameState.difficulty === "easy"
                      ? "4"
                      : gameState.difficulty === "medium"
                        ? "6"
                        : "8"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
                  <span className="font-bold text-gray-700">Total Moves:</span>
                  <span className="text-2xl font-black text-gray-900">
                    {gameState.moves}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
                  <span className="font-bold text-gray-700">Time Taken:</span>
                  <span className="text-2xl font-black text-gray-900">
                    {formatTime(gameState.timeTaken)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
                  <span className="font-bold text-gray-700">Final Score:</span>
                  <span className="text-3xl font-black text-green-600">
                    {gameState.score}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="flex-1 bg-white border-3 border-gray-900 text-gray-900 font-black py-3 px-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="flex-1 bg-linear-to-r from-purple-600 to-purple-800 text-white font-black py-3 px-6 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
