"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BudgetGameResult, BudgetScenario } from "@/types";
import { formatPrice } from "@/lib/tools";

interface BudgetResultModalProps {
  isOpen: boolean;
  result: BudgetGameResult | null;
  scenario: BudgetScenario | null;
  onClose: () => void;
  onNext: () => void;
  isLastRound: boolean;
}

export default function BudgetResultModal({
  isOpen,
  result,
  scenario,
  onClose,
  onNext,
  isLastRound,
}: BudgetResultModalProps) {
  if (!result || !scenario) return null;

  const getScoreColor = (score: number) => {
    if (score >= 600) return "text-green-600";
    if (score >= 450) return "text-blue-600";
    if (score >= 300) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 600) return "🌟";
    if (score >= 450) return "💪";
    if (score >= 300) return "👍";
    return "📚";
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
                  className="text-6xl mb-4"
                >
                  {getScoreEmoji(result.score)}
                </motion.div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Budget Results
                </h2>
                <p className="text-gray-600 font-medium">
                  {result.scenarioTitle}
                </p>
              </div>
            </div>

            {/* Score */}
            <div className="p-6 bg-gray-50 border-b-2 border-gray-200">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className={`text-5xl font-black ${getScoreColor(result.score)}`}
                >
                  {result.score}
                </motion.div>
                <p className="text-gray-600 font-bold mt-2">Points Earned</p>
                <p className="text-gray-700 mt-3 font-medium">
                  {result.feedback}
                </p>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Budget Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold">Income</p>
                  <p className="text-lg font-black text-green-600">
                    {formatPrice(result.totalIncome)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold">Allocated</p>
                  <p className="text-lg font-black text-blue-600">
                    {formatPrice(result.totalAllocated)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-bold">Remaining</p>
                  <p
                    className={`text-lg font-black ${result.remaining < 0 ? "text-red-600" : "text-gray-600"}`}
                  >
                    {formatPrice(Math.abs(result.remaining))}
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3">
                <h4 className="font-black text-gray-900">Category Breakdown</h4>
                {result.allocations.map((allocation) => {
                  const category = scenario.categories.find(
                    (cat) => cat.id === allocation.categoryId,
                  );
                  if (!category) return null;

                  const recommendedAmount =
                    (category.recommendedPercentage / 100) * result.totalIncome;
                  const difference = Math.abs(
                    allocation.amount - recommendedAmount,
                  );
                  const isClose = difference <= recommendedAmount * 0.15;

                  return (
                    <div
                      key={allocation.categoryId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Recommended: {formatPrice(recommendedAmount)} (
                            {category.recommendedPercentage}%)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${isClose ? "text-green-600" : "text-gray-900"}`}
                        >
                          {formatPrice(allocation.amount)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {allocation.percentage.toFixed(1)}%
                        </p>
                        <p className="text-xs font-medium">
                          {result.categoryFeedback[allocation.categoryId]}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
                  {isLastRound ? "Finish Game" : "Next Scenario"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
