"use client";

import { motion } from "framer-motion";
import { Trophy, Home, RotateCcw, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameState } from "@/types";

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export default function GameOverScreen({
  gameState,
  onRestart,
}: GameOverScreenProps) {
  const router = useRouter();

  const averageAccuracy =
    gameState.results.reduce((sum, result) => sum + result.percentageError, 0) /
    gameState.results.length;

  const getRank = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "Price Master! 🏆";
    if (percentage >= 75) return "Market Expert! 🌟";
    if (percentage >= 60) return "Savvy Shopper! 💎";
    if (percentage >= 45) return "Price Detective! 🔍";
    if (percentage >= 30) return "Budget Learner! 📚";
    return "Beginner Buyer! 🎯";
  };

  const maxPossibleScore = gameState.totalRounds * 1000;

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

      {/* Confetti-like decorative elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-3 h-3 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ["#fbbf24", "#3b82f6", "#ef4444", "#10b981"][
              Math.floor(Math.random() * 4)
            ],
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.9, y: 20, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white border-3 border-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-8 relative"
        style={{ transform: "rotate(0.5deg)" }}
      >
        <div className="text-center space-y-8">
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-28 h-28 bg-gray-900 border-3 border-gray-900 rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Trophy className="w-14 h-14 text-yellow-400" />
          </motion.div>

          {/* Title */}
          <div>
            <h1
              className="text-5xl font-black text-gray-900 mb-3"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
              }}
            >
              Game Over!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="w-16 h-1 bg-gray-400"
                style={{ transform: "rotate(-2deg)" }}
              />
              <div
                className="w-16 h-1 bg-gray-400"
                style={{ transform: "rotate(2deg)" }}
              />
            </div>
            <p
              className="text-2xl font-bold text-gray-700"
              style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            >
              {getRank(gameState.score, maxPossibleScore)}
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border-3 border-blue-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
              style={{ transform: "rotate(-1deg)" }}
            >
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p
                className="text-4xl font-black text-blue-600 mb-1"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {gameState.score.toLocaleString()}
              </p>
              <p className="text-gray-700 text-sm font-bold">Total Score</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-orange-50 border-3 border-orange-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
              style={{ transform: "rotate(1deg)" }}
            >
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p
                className="text-4xl font-black text-orange-600 mb-1"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {averageAccuracy.toFixed(1)}%
              </p>
              <p className="text-gray-700 text-sm font-bold">Avg. Error</p>
            </motion.div>
          </div>

          {/* Round Breakdown */}
          <div
            className="bg-yellow-50 border-3 border-gray-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <h3
              className="font-black text-gray-900 mb-4 text-lg"
              style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            >
              Your Rounds 📊
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {gameState.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + 0.1 * index }}
                  className="flex justify-between items-center bg-white border-2 border-gray-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "0.5" : "-0.5"}deg)`,
                  }}
                >
                  <div className="text-left">
                    <p className="font-black text-gray-900 text-sm">
                      {result.itemName}
                    </p>
                    <p className="text-xs text-gray-600 font-bold">
                      {result.percentageError.toFixed(1)}% error
                    </p>
                  </div>
                  <span
                    className="font-black text-blue-600 text-lg"
                    style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                  >
                    +{result.points}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-white text-gray-900 font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                transform: "rotate(0.5deg)",
              }}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                transform: "rotate(-0.5deg)",
              }}
            >
              <RotateCcw className="w-5 h-5" />
              Play Again!
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 border-3 border-gray-900 rounded-full" />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-400 border-3 border-gray-900 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 border-3 border-gray-900 rounded-full" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-400 border-3 border-gray-900 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
