"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Difficulty } from "@/types";
import { useBudgetGameEngine } from "@/hooks/useBudgetGameEngine";
import BudgetAllocator from "@/components/BudgetAllocator";
import BudgetResultModal from "@/components/BudgetResultModal";
import ScoreTracker from "@/components/ScoreTracker";
import DifficultySelector from "@/components/DifficultySelector";
import BudgetGameOverScreen from "@/components/BudgetGameOverScreen";
import GameEducationSection from "@/components/GameEducationSection";

export default function BudgetMasterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Budget Master: Monthly Expense Simulator",
    url: "https://www.playbits.online/games/budget-master",
    description:
      "A realistic financial literacy simulation where players manage a monthly household budget. Learn the 50/30/20 budgeting rule by allocating expenses across categories. Free online game for students and educators.",
    genre: ["Educational", "Simulation", "Strategy"],
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: "Ctrl Bits",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "High School Students",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    isAccessibleForFree: true,
  };

  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    undefined,
  );
  const [hasStarted, setHasStarted] = useState(false);

  const {
    gameState,
    startGame,
    updateAllocation,
    submitBudget,
    nextRound,
    resetGame,
  } = useBudgetGameEngine({
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

  const handleAllocationChange = (categoryId: string, amount: number) => {
    updateAllocation(categoryId, amount);
  };

  const handleSubmitBudget = () => {
    submitBudget();
  };

  const handleNextRound = () => {
    nextRound();
  };

  const currentResult = gameState.results[gameState.results.length - 1];

  if (gameState.isGameOver) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BudgetGameOverScreen gameState={gameState} onRestart={handleRestart} />
      </>
    );
  }

  if (!hasStarted) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              📊
            </motion.div>

            <div>
              <h1
                className="text-4xl font-black text-gray-900 mb-3"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                Budget Master
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
              className="bg-blue-50 border-2 border-gray-900 rounded-xl p-6 text-left space-y-3"
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
                  <span>Get a monthly income scenario</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">②</span>
                  <span>Allocate money to different categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">③</span>
                  <span>Stay within budget & match recommendations!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">④</span>
                  <span>Complete 3 scenarios & become a budget master!</span>
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
              Start Budgeting! 💰
            </button>
          </div>

          {/* Doodle decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6">
            <svg viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8">
            <svg viewBox="0 0 40 40">
              <path
                d="M 10 20 L 30 20 M 20 10 L 20 30"
                stroke="#10b981"
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
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
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

        <div className="max-w-4xl mx-auto relative">
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

        {gameState.currentScenario && (
          <>
            {/* Scenario Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-3 border-gray-900 rounded-xl p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  {gameState.currentScenario.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {gameState.currentScenario.description}
                </p>
                <div className="flex justify-center items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 font-bold">Monthly Income</p>
                    <p className="text-2xl font-black text-green-600">
                      NPR{" "}
                      {gameState.currentScenario.monthlyIncome.toLocaleString(
                        "en-NP",
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 font-bold">Family Size</p>
                    <p className="text-2xl font-black text-blue-600">
                      {gameState.currentScenario.familySize}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 font-bold">Location</p>
                    <p className="text-2xl font-black text-purple-600">
                      {gameState.currentScenario.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Budget Allocator */}
            <BudgetAllocator
              categories={gameState.currentScenario.categories}
              allocations={gameState.allocations}
              totalIncome={gameState.currentScenario.monthlyIncome}
              onAllocationChange={handleAllocationChange}
            />

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmitBudget}
                disabled={
                  Object.values(gameState.allocations).reduce(
                    (sum, amount) => sum + amount,
                    0,
                  ) === 0
                }
                className="bg-gray-900 text-white font-black py-4 px-8 rounded-xl text-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  transform: "rotate(-0.5deg)",
                }}
              >
                Submit Budget! 📊
              </button>
            </div>
          </>
        )}

        <BudgetResultModal
          isOpen={gameState.showResult}
          result={currentResult}
          scenario={gameState.currentScenario}
          onClose={() => {}}
          onNext={handleNextRound}
          isLastRound={gameState.currentRound >= gameState.totalRounds}
        />

        {/* Educational Content Section */}
        <GameEducationSection
          title="Master Monthly Budgeting & Financial Planning"
          description="Budget Master teaches the 50/30/20 budgeting rule through realistic household scenarios. Players manage real-world income and expense categories, learning how to allocate resources effectively across needs, wants, and savings. This game simulates the decision-making process families face when planning their monthly finances."
          learningOutcomes={[
            "Understand the 50/30/20 budgeting framework",
            "Allocate expenses across multiple categories",
            "Manage household budgets within income constraints",
            "Make informed financial decisions",
            "Plan for essential needs and discretionary spending",
          ]}
          targetAudience="High school students (grades 9-12)"
          mechanics="Each round presents a household scenario with monthly income and family details. Players allocate their income across categories (housing, food, utilities, education, entertainment, savings). The game provides feedback on how their allocation compares to the recommended 50/30/20 rule."
          keywords={[
            "budget simulator",
            "financial planning",
            "expense allocation",
            "budgeting game",
            "financial literacy",
          ]}
        />
      </div>
      </div>
    </>
  );
}
