"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendGameResult, TrendItem } from "@/types";
import { formatPrice } from "@/lib/tools";

interface TrendResultModalProps {
  isOpen: boolean;
  result: TrendGameResult | null;
  item: TrendItem | null;
  onClose: () => void;
  onNext: () => void;
  isLastRound: boolean;
}

export default function TrendResultModal({
  isOpen,
  result,
  item,
  onClose,
  onNext,
  isLastRound,
}: TrendResultModalProps) {
  if (!result || !item) return null;

  const getAccuracyColor = (percentageError: number) => {
    if (percentageError <= 5) return "text-green-600";
    if (percentageError <= 15) return "text-blue-600";
    if (percentageError <= 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyEmoji = (percentageError: number) => {
    if (percentageError <= 5) return "🎯";
    if (percentageError <= 15) return "💪";
    if (percentageError <= 30) return "👍";
    return "📈";
  };

  const getConfidenceBonus = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "+20%";
      case "medium":
        return "+0%";
      case "low":
        return "-20%";
      default:
        return "+0%";
    }
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white border-3 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b-3 border-gray-900">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-5xl mb-4"
                >
                  {getAccuracyEmoji(result.percentageError)}
                </motion.div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Prediction Results
                </h2>
                <p className="text-gray-600 font-medium">{result.itemName}</p>
              </div>
            </div>

            {/* Results */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Your Prediction */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold mb-2">
                    YOUR PREDICTION
                  </p>
                  <p className="text-3xl font-black text-blue-600">
                    {formatPrice(result.predictedPrice)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">July Price</p>
                </div>

                {/* Actual Price */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold mb-2">
                    ACTUAL PRICE
                  </p>
                  <p className="text-3xl font-black text-green-600">
                    {formatPrice(result.actualPrice)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">July Price</p>
                </div>
              </div>

              {/* Accuracy */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold mb-2">
                    ACCURACY
                  </p>
                  <p
                    className={`text-4xl font-black ${getAccuracyColor(result.percentageError)}`}
                  >
                    {result.percentageError.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Off by {formatPrice(result.difference)}
                  </p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="font-black text-gray-900">Score Breakdown</h4>

                <div className="flex justify-between items-center p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <span className="font-bold text-blue-900">
                    Base Accuracy Score
                  </span>
                  <span className="font-black text-blue-600">
                    {Math.round(
                      result.points /
                        (result.confidence === "high"
                          ? 1.2
                          : result.confidence === "low"
                            ? 0.8
                            : 1.0),
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <span className="font-bold text-purple-900">
                    Confidence Bonus ({getConfidenceBonus(result.confidence)})
                  </span>
                  <span className="font-black text-purple-600">
                    {result.confidence === "high"
                      ? "+20%"
                      : result.confidence === "low"
                        ? "-20%"
                        : "+0%"}
                  </span>
                </div>

                {(result.trend === "increasing" &&
                  result.predictedPrice >
                    item.priceHistory[item.priceHistory.length - 1].price) ||
                (result.trend === "decreasing" &&
                  result.predictedPrice <
                    item.priceHistory[item.priceHistory.length - 1].price) ? (
                  <div className="flex justify-between items-center p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                    <span className="font-bold text-green-900">
                      Trend Direction Bonus
                    </span>
                    <span className="font-black text-green-600">+100</span>
                  </div>
                ) : null}

                <div className="border-t-2 border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-gray-900">
                      TOTAL SCORE
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      {result.points}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <h4 className="font-black text-gray-900 mb-3">
                  Trend Analysis
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-bold">Market Trend</p>
                    <p
                      className={`font-bold ${
                        result.trend === "increasing"
                          ? "text-green-600"
                          : result.trend === "decreasing"
                            ? "text-red-600"
                            : result.trend === "stable"
                              ? "text-gray-600"
                              : "text-yellow-600"
                      }`}
                    >
                      {result.trend.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">Your Confidence</p>
                    <p
                      className={`font-bold ${
                        result.confidence === "high"
                          ? "text-green-600"
                          : result.confidence === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {result.confidence.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t-3 border-gray-900 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 font-black py-3 px-6 rounded-xl border-3 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Review
                </button>
                <button
                  onClick={onNext}
                  className="flex-1 bg-gray-900 text-white font-black py-3 px-6 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  {isLastRound ? "Finish Game" : "Next Prediction"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
