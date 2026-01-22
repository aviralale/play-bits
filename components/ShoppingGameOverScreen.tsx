"use client";

import { motion } from "framer-motion";
import { ShoppingGameState } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShoppingGameOverScreenProps {
  gameState: ShoppingGameState;
  onRestart: () => void;
}

export default function ShoppingGameOverScreen({
  gameState,
  onRestart,
}: ShoppingGameOverScreenProps) {
  const router = useRouter();

  const getPerformanceMessage = (score: number) => {
    if (score >= 2000) return "🏆 Budget Master!";
    if (score >= 1500) return "💰 Smart Shopper!";
    if (score >= 1000) return "🛒 Good Planner!";
    if (score >= 500) return "📊 Learning Fast!";
    return "🎯 Keep Practicing!";
  };

  const getPerformanceDescription = (score: number) => {
    if (score >= 2000)
      return "You're a shopping expert! You mastered budget allocation and made excellent choices.";
    if (score >= 1500)
      return "Great job! You understand the importance of balancing needs and budget.";
    if (score >= 1000)
      return "Good work! You're getting better at making smart shopping decisions.";
    if (score >= 500)
      return "Keep practicing! Every shopping trip is a learning opportunity.";
    return "Don't worry! Shopping smart takes practice. Try again to improve your skills.";
  };

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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-4 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-8 text-center relative"
        style={{ transform: "rotate(1deg)" }}
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          style={{ transform: "rotate(-1deg)" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-8xl mb-6"
        >
          🛒
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1
            className="text-4xl font-black text-gray-900 mb-4"
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
            }}
          >
            Game Complete!
          </h1>

          <div className="text-6xl mb-4">
            {getPerformanceMessage(gameState.score)}
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-bold mb-2">
                Final Score
              </p>
              <p className="text-4xl font-black text-gray-900 mb-2">
                {gameState.score}
              </p>
              <p className="text-sm text-gray-600">
                Completed {gameState.results.length} challenge
                {gameState.results.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <p className="text-gray-700 font-medium mb-8 leading-relaxed">
            {getPerformanceDescription(gameState.score)}
          </p>

          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="w-full bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                transform: "rotate(-0.5deg)",
              }}
            >
              Play Again 🛒
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full bg-white text-gray-900 font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                transform: "rotate(0.5deg)",
              }}
            >
              Back to Games 🏠
            </button>
          </div>
        </motion.div>

        {/* Doodle decorations */}
        <div className="absolute -top-4 -left-4 w-8 h-8">
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
        <div className="absolute -bottom-4 -right-4 w-6 h-6">
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
