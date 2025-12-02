"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Award, ArrowRight } from "lucide-react";
import { GameResult } from "@/types";
import { formatPrice } from "@/lib/tools";

interface ResultModalProps {
  isOpen: boolean;
  result: GameResult | null;
  onClose: () => void;
  onNext: () => void;
  isLastRound: boolean;
}

export default function ResultModal({
  isOpen,
  result,
  onClose,
  onNext,
  isLastRound,
}: ResultModalProps) {
  if (!result) return null;

  const getAccuracyMessage = (percentageError: number): string => {
    if (percentageError === 0) return "Perfect! 🎯";
    if (percentageError <= 5) return "Excellent! 🌟";
    if (percentageError <= 10) return "Great Job! 👍";
    if (percentageError <= 20) return "Good! 👌";
    if (percentageError <= 30) return "Not Bad! 😊";
    if (percentageError <= 50) return "Keep Trying! 😅";
    return "Nice Try! 💪";
  };

  const getPointsColor = (points: number): string => {
    if (points >= 800) return "text-green-600";
    if (points >= 600) return "text-blue-600";
    if (points >= 400) return "text-yellow-600";
    if (points >= 200) return "text-orange-600";
    return "text-red-600";
  };

  const isHigher = result.guessedPrice > result.actualPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-3 border-gray-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full relative"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-6">
              {/* Award Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-gray-900 border-3 border-gray-900 rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Award className="w-10 h-10 text-yellow-400" />
              </motion.div>

              {/* Title */}
              <div>
                <h3
                  className="text-3xl font-black text-gray-900 mb-2"
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                  }}
                >
                  {getAccuracyMessage(result.percentageError)}
                </h3>
                <p className="text-gray-600 font-bold">{result.itemName}</p>
              </div>

              {/* Results Box */}
              <div
                className="bg-yellow-50 border-3 border-gray-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4 text-left"
                style={{ transform: "rotate(0.5deg)" }}
              >
                {/* Your Guess */}
                <div className="flex justify-between items-center pb-3 border-b-2 border-dashed border-gray-300">
                  <span className="text-gray-700 font-bold">Your Guess:</span>
                  <span className="font-black text-lg flex items-center gap-2">
                    {formatPrice(result.guessedPrice)}
                    {isHigher ? (
                      <TrendingUp className="w-5 h-5 text-red-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-green-500" />
                    )}
                  </span>
                </div>

                {/* Actual Price */}
                <div className="flex justify-between items-center pb-3 border-b-2 border-dashed border-gray-300">
                  <span className="text-gray-700 font-bold">Actual Price:</span>
                  <span className="font-black text-lg text-blue-600">
                    {formatPrice(result.actualPrice)}
                  </span>
                </div>

                {/* Difference */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold">Difference:</span>
                  <span className="font-black text-lg text-gray-900">
                    {formatPrice(result.difference)}
                  </span>
                </div>

                {/* Error */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold">Error:</span>
                  <span className="font-black text-lg text-gray-900">
                    {result.percentageError.toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold">Data Quality:</span>
                  <span className="font-black text-lg text-gray-900">
                    {result.dataQuality}
                  </span>
                </div>

                {/* Points - Big and bold */}
                <div
                  className="mt-4 pt-4 border-t-3 border-gray-900"
                  style={{ transform: "rotate(-0.5deg)" }}
                >
                  <div className="flex justify-between items-center bg-white border-2 border-gray-900 rounded-xl px-4 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-gray-900 font-black text-lg">
                      Points:
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className={`font-black text-3xl ${getPointsColor(
                        result.points
                      )}`}
                      style={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                      }}
                    >
                      +{result.points}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={onNext}
                className="w-full bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  transform: "rotate(-0.5deg)",
                }}
              >
                {isLastRound ? "See Final Score! 🏆" : "Next Item! →"}
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 border-2 border-gray-900 rounded-full" />
            <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-blue-400 border-2 border-gray-900 rounded-full" />

            {/* Floating stars */}
            <motion.div
              className="absolute -top-8 -right-8"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path
                  d="M 20 5 L 22 15 L 35 20 L 22 25 L 20 35 L 18 25 L 5 20 L 18 15 Z"
                  fill="#fbbf24"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
