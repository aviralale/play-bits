"use client";

import { motion } from "framer-motion";
import { Trophy, Home, RotateCcw, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { TrendGameState } from "@/types";

interface TrendGameOverScreenProps {
  gameState: TrendGameState;
  onRestart: () => void;
}

export default function TrendGameOverScreen({
  gameState,
  onRestart,
}: TrendGameOverScreenProps) {
  const router = useRouter();

  const averageScore =
    gameState.results.reduce((sum, result) => sum + result.points, 0) /
    gameState.results.length;

  const getRank = (score: number): string => {
    const averageScore = score / gameState.totalRounds;
    if (averageScore >= 700) return "Trend Master! 🏆";
    if (averageScore >= 550) return "Market Analyst! 🌟";
    if (averageScore >= 400) return "Price Predictor! 💎";
    if (averageScore >= 250) return "Trend Learner! 📊";
    return "Future Forecaster! 🔮";
  };

  const maxPossibleScore = gameState.totalRounds * 1200; // Approximate max score per round

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white relative flex items-center justify-center p-4"
    >
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
        {[...Array(50)].map((_, i) => (
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white border-3 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-8 text-center"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        {/* Trophy Animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-6"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black text-gray-900 mb-2"
          style={{
            fontFamily: "Comic Sans MS, cursive, sans-serif",
            textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
          }}
        >
          Game Complete!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 font-medium mb-8"
        >
          Market Trends Challenge
        </motion.p>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="text-6xl font-black text-orange-600 mb-2">
            {gameState.score.toLocaleString()}
          </div>
          <p className="text-gray-600 font-bold">Total Points</p>
        </motion.div>

        {/* Rank */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <div className="inline-block bg-yellow-100 border-3 border-yellow-500 rounded-xl px-6 py-3">
            <p className="text-yellow-800 font-black text-lg">
              {getRank(gameState.score)}
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gray-50 border-2 border-gray-900 rounded-lg p-4">
            <div className="text-2xl font-black text-gray-900">
              {gameState.totalRounds}
            </div>
            <p className="text-xs text-gray-600 font-bold">Predictions</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-900 rounded-lg p-4">
            <div className="text-2xl font-black text-green-600">
              {Math.round(averageScore)}
            </div>
            <p className="text-xs text-gray-600 font-bold">Avg Score</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-900 rounded-lg p-4">
            <div className="text-2xl font-black text-purple-600">
              {Math.round((gameState.score / maxPossibleScore) * 100)}%
            </div>
            <p className="text-xs text-gray-600 font-bold">Accuracy</p>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mb-8"
        >
          <h3 className="font-black text-gray-900 mb-4">Prediction Results</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {gameState.results.map((result, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 border-2 border-gray-200 rounded-lg p-3"
              >
                <span className="font-bold text-gray-900 truncate flex-1 text-left">
                  {result.itemName}
                </span>
                <span className="font-black text-orange-600 ml-4">
                  {result.points} pts
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex gap-4"
        >
          <button
            onClick={() => router.push("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 font-black py-4 px-6 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white font-black py-4 px-6 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </motion.div>

        {/* Decorations */}
        <div className="absolute -top-4 -left-4 w-8 h-8">
          <svg viewBox="0 0 40 40">
            <path
              d="M 5 20 Q 20 5 35 20 Q 20 35 5 20"
              stroke="#f97316"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6">
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
        <div className="absolute top-1/2 -right-6 w-4 h-4">
          <svg viewBox="0 0 40 40">
            <rect
              x="10"
              y="10"
              width="20"
              height="20"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
