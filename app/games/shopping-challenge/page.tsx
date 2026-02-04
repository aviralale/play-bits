"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types";
import { useShoppingGameEngine } from "@/hooks/useShoppingGameEngine";
import ShoppingList from "@/components/ShoppingList";
import ShoppingResultModal from "@/components/ShoppingResultModal";
import ScoreTracker from "@/components/ScoreTracker";
import DifficultySelector from "@/components/DifficultySelector";
import ShoppingGameOverScreen from "@/components/ShoppingGameOverScreen";
import GameEducationSection from "@/components/GameEducationSection";

export default function ShoppingChallengePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Shopping Challenge: Smart Spender Simulator",
    url: "https://www.playbits.online/games/shopping-challenge",
    description:
      "Manage a tight shopping budget for realistic scenarios like 'Diwali Festival' or 'Student Monthly Needs'. Optimize your cart for value, nutrition, and budget. Free interactive game for learning smart shopping and financial decision-making.",
    genre: ["Simulation", "Educational", "Casual"],
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: "Ctrl Bits",
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
  };

  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    undefined,
  );
  const [hasStarted, setHasStarted] = useState(false);

  const {
    gameState,
    startGame,
    updateQuantity,
    submitShopping,
    nextRound,
    resetGame,
  } = useShoppingGameEngine({
    difficulty,
    numberOfRounds: 3,
  });

  const handleStartGame = () => {
    startGame();
    setHasStarted(true);
  };

  const handleRestart = () => {
    resetGame();
    setHasStarted(true);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleSubmitShopping = () => {
    submitShopping();
  };

  const handleNextRound = () => {
    nextRound();
  };

  const currentResult = gameState.results[gameState.results.length - 1];
  const selectedItemsCount = Object.values(gameState.quantities).filter(
    (quantity) => quantity > 0,
  ).length;
  const totalItems = gameState.currentChallenge?.items.length || 0;
  const selectedItems =
    gameState.currentChallenge?.items.filter(
      (item) => (gameState.quantities[item.id] || 0) > 0,
    ) || [];
  const totalSpent = selectedItems.reduce(
    (sum, item) => sum + item.price * (gameState.quantities[item.id] || 0),
    0,
  );
  const isOverBudget = gameState.currentChallenge
    ? totalSpent > gameState.currentChallenge.budget
    : false;

  if (gameState.isGameOver) {
    return (
      <ShoppingGameOverScreen gameState={gameState} onRestart={handleRestart} />
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-white relative flex items-center justify-center p-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-3 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-8"
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

          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-7xl mb-4"
            >
              🛒
            </motion.div>

            <div>
              <h1
                className="text-4xl font-black text-gray-900 mb-3"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                Shopping Challenge
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
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

            <div
              className="bg-orange-50 border-2 border-gray-900 rounded-xl p-6 text-left space-y-3"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <h3
                className="font-black text-gray-900 mb-4 text-lg"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                How to Play:
              </h3>
              <ul className="space-y-3 text-gray-700 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-xl">①</span>
                  <span>Review the shopping list and budget</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">②</span>
                  <span>Select items you want to buy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">③</span>
                  <span>Stay within budget and prioritize essentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">④</span>
                  <span>Score points for smart shopping choices!</span>
                </li>
              </ul>
            </div>

            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={setDifficulty}
            />

            <button
              onClick={handleStartGame}
              className="w-full bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                transform: "rotate(-1deg)",
              }}
            >
              Start Shopping! 🛒
            </button>
          </div>

          {/* Doodle decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6">
            <svg viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8">
            <svg viewBox="0 0 40 40">
              <path
                d="M 10 20 L 30 20 M 20 10 L 20 30"
                stroke="#f97316"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white relative py-8 px-4">
        {/* Grid Background */}
        <div
          className="fixed inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
        }}
      />

      {/* Scattered Dots */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      <div className="max-w-6xl mx-auto relative">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 font-bold"
          style={{ transform: "rotate(-0.5deg)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <ScoreTracker
          currentRound={gameState.currentRound}
          totalRounds={gameState.totalRounds}
          score={gameState.score}
        />

        {gameState.currentChallenge && (
          <div className="space-y-6">
            {/* Challenge Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-3 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                {gameState.currentChallenge.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {gameState.currentChallenge.description}
              </p>
              <div className="flex justify-center items-center gap-4 text-sm">
                <span className="bg-blue-100 border-2 border-blue-300 rounded-lg px-3 py-1 font-bold text-blue-800">
                  📍 {gameState.currentChallenge.location}
                </span>
                <span className="bg-green-100 border-2 border-green-300 rounded-lg px-3 py-1 font-bold text-green-800">
                  👨‍👩‍👧‍👦 Family of {gameState.currentChallenge.familySize}
                </span>
              </div>
            </motion.div>

            {/* Selection Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-900">
                  Selected: {selectedItemsCount} / {totalItems} items
                </span>
                <span
                  className={`font-bold ${isOverBudget ? "text-red-600" : "text-green-600"}`}
                >
                  Total: NPR {totalSpent.toLocaleString()}
                </span>
              </div>
            </motion.div>

            {/* Shopping List */}
            <ShoppingList
              challenge={gameState.currentChallenge}
              quantities={gameState.quantities}
              onQuantityChange={handleQuantityChange}
              disabled={gameState.showResult}
            />

            {/* Submit Button */}
            {!gameState.showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={handleSubmitShopping}
                  disabled={selectedItemsCount === 0 || isOverBudget}
                  className={`
                    px-8 py-4 rounded-xl text-lg font-black border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    transition-all hover:translate-x-0.5 hover:translate-y-0.5
                    ${
                      selectedItemsCount === 0 || isOverBudget
                        ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                        : "bg-gray-900 text-white border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }
                  `}
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    transform: "rotate(-0.5deg)",
                  }}
                >
                  {isOverBudget
                    ? "Over Budget! Remove Items"
                    : "Submit Shopping List 🛒"}
                </button>
              </motion.div>
            )}
          </div>
        )}

        <ShoppingResultModal
          isOpen={gameState.showResult}
          result={currentResult}
          onClose={() => {}}
          onNext={handleNextRound}
          isLastRound={gameState.currentRound >= gameState.totalRounds}
        />
      </div>

      <GameEducationSection
        title="Master Smart Shopping & Budget Optimization"
        description="This game simulates real-world shopping scenarios where you must make smart choices within a limited budget. You'll prioritize essential items, optimize for value, and make trade-offs - just like in real life. Perfect for learning practical money management."
        learningOutcomes={[
          "Identify essential vs. optional purchases",
          "Prioritize items based on needs and budget constraints",
          "Calculate total spending and track remaining budget",
          "Optimize value for money across different items",
          "Understand efficiency in real-world shopping",
          "Develop decision-making skills under financial constraints",
        ]}
        targetAudience="Ideal for middle school to high school students (8-12 grade), home economics classes, and anyone learning practical money management. Great for teaching budgeting concepts to young learners."
        mechanics="You receive a shopping budget and must select items from a list to complete a challenge (like 'Diwali Festival' or 'Student Monthly Needs'). Each item has a price and priority level. Your score is based on how efficiently you use your budget while getting essential items. 4 different scenarios with 3 rounds total."
        keywords={[
          "shopping simulator",
          "budget game",
          "grocery budget game",
          "smart shopping game",
          "money management game",
          "financial literacy",
          "budget optimization",
          "consumer education",
        ]}
      />
      </div>
    </>
  );
}
