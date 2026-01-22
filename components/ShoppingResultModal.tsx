"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingGameResult } from "@/types";
import { formatPrice } from "@/lib/tools";

interface ShoppingResultModalProps {
  isOpen: boolean;
  result: ShoppingGameResult | null;
  onClose: () => void;
  onNext: () => void;
  isLastRound: boolean;
}

export default function ShoppingResultModal({
  isOpen,
  result,
  onClose,
  onNext,
  isLastRound,
}: ShoppingResultModalProps) {
  if (!result) return null;

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-green-600";
    if (score >= 600) return "text-blue-600";
    if (score >= 400) return "text-orange-600";
    return "text-red-600";
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600";
    if (efficiency >= 70) return "text-blue-600";
    if (efficiency >= 50) return "text-orange-600";
    return "text-red-600";
  };

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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white border-4 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ transform: "rotate(-1deg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {result.score >= 600
                    ? "🎉"
                    : result.score >= 400
                      ? "👍"
                      : "💪"}
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Shopping Results
                </h2>
                <p className="text-gray-600">{result.challengeTitle}</p>
              </div>

              {/* Score Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-bold">Score</p>
                  <p
                    className={`text-2xl font-black ${getScoreColor(result.score)}`}
                  >
                    {result.score}
                  </p>
                </div>
                <div className="text-center bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-bold">Spent</p>
                  <p className="text-2xl font-black text-gray-900">
                    {formatPrice(result.totalSpent)}
                  </p>
                </div>
                <div className="text-center bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-bold">Budget</p>
                  <p className="text-2xl font-black text-gray-900">
                    {formatPrice(result.budget)}
                  </p>
                </div>
                <div className="text-center bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-bold">Efficiency</p>
                  <p
                    className={`text-2xl font-black ${getEfficiencyColor(result.efficiency)}`}
                  >
                    {result.efficiency.toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-2">Feedback</h3>
                <p className="text-blue-800">{result.feedback}</p>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                {result.missedEssentials.length > 0 && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                    <h3 className="font-bold text-red-900 mb-2">
                      ⚠️ Missed Essentials
                    </h3>
                    <ul className="text-red-800 space-y-1">
                      {result.missedEssentials.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-sm">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.smartChoices.length > 0 && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-2">
                      ✅ Smart Choices
                    </h3>
                    <ul className="text-green-800 space-y-1">
                      {result.smartChoices.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-sm">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onNext}
                  className="flex-1 bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  style={{
                    fontFamily: "Comic Sans MS, cursive, sans-serif",
                    transform: "rotate(-0.5deg)",
                  }}
                >
                  {isLastRound ? "Finish Game" : "Next Challenge"} 🚀
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
