"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types";
import { useTrendGameEngine } from "@/hooks/useTrendGameEngine";
import TrendChart from "@/components/TrendChart";
import TrendPredictionInput from "@/components/TrendPredictionInput";
import TrendResultModal from "@/components/TrendResultModal";
import ScoreTracker from "@/components/ScoreTracker";
import DifficultySelector from "@/components/DifficultySelector";
import TrendGameOverScreen from "@/components/TrendGameOverScreen";

export default function MarketTrendsPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    undefined,
  );
  const [hasStarted, setHasStarted] = useState(false);

  const { gameState, startGame, submitPrediction, nextRound, resetGame } =
    useTrendGameEngine({
      difficulty,
      numberOfRounds: 5,
    });

  const handleStartGame = () => {
    startGame();
    setHasStarted(true);
  };

  const handleRestart = () => {
    resetGame();
    setHasStarted(true);
  };

  const handlePrediction = (
    price: number,
    confidence: "low" | "medium" | "high",
  ) => {
    submitPrediction(price, confidence);
  };

  const handleNextRound = () => {
    nextRound();
  };

  const currentResult = gameState.results[gameState.results.length - 1];

  if (gameState.isGameOver) {
    return (
      <TrendGameOverScreen gameState={gameState} onRestart={handleRestart} />
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
              📈
            </motion.div>

            <div>
              <h1
                className="text-4xl font-black text-gray-900 mb-3"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                Market Trends
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
                  <span>Study the 6-month price history chart</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">②</span>
                  <span>Predict the price for next month</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">③</span>
                  <span>Choose your confidence level</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">④</span>
                  <span>Score points based on accuracy!</span>
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
              Start Predicting! 🔮
            </button>
          </div>

          {/* Doodle decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6">
            <svg viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#f97316"
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

        {gameState.currentItem && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Section */}
            <div>
              <TrendChart
                item={gameState.currentItem}
                showPrediction={gameState.showResult}
                predictedPrice={currentResult?.predictedPrice}
              />
            </div>

            {/* Prediction Section */}
            <div>
              <TrendPredictionInput
                item={gameState.currentItem}
                onSubmit={handlePrediction}
                disabled={gameState.showResult}
              />
            </div>
          </div>
        )}

        <TrendResultModal
          isOpen={gameState.showResult}
          result={currentResult}
          item={gameState.currentItem}
          onClose={() => {}}
          onNext={handleNextRound}
          isLastRound={gameState.currentRound >= gameState.totalRounds}
        />
      </div>
    </div>
  );
}
