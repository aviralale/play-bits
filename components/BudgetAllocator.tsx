"use client";

import { motion } from "framer-motion";
import { BudgetCategory } from "@/types";
import { formatPrice } from "@/lib/tools";

interface BudgetAllocatorProps {
  categories: BudgetCategory[];
  allocations: { [categoryId: string]: number };
  totalIncome: number;
  onAllocationChange: (categoryId: string, amount: number) => void;
}

export default function BudgetAllocator({
  categories,
  allocations,
  totalIncome,
  onAllocationChange,
}: BudgetAllocatorProps) {
  const totalAllocated = Object.values(allocations).reduce(
    (sum, amount) => sum + amount,
    0,
  );
  const remaining = totalIncome - totalAllocated;

  return (
    <div className="space-y-6">
      {/* Budget Summary */}
      <div className="bg-white border-3 border-gray-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600 font-bold">Monthly Income</p>
            <p className="text-lg font-black text-green-600">
              {formatPrice(totalIncome)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-bold">Allocated</p>
            <p
              className={`text-lg font-black ${totalAllocated > totalIncome ? "text-red-600" : "text-blue-600"}`}
            >
              {formatPrice(totalAllocated)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-bold">Remaining</p>
            <p
              className={`text-lg font-black ${remaining < 0 ? "text-red-600" : "text-gray-600"}`}
            >
              {formatPrice(Math.abs(remaining))}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-gray-900">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                totalAllocated > totalIncome ? "bg-red-500" : "bg-blue-500"
              }`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((totalAllocated / totalIncome) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-center mt-1 text-gray-600 font-bold">
            {((totalAllocated / totalIncome) * 100).toFixed(1)}% allocated
          </p>
        </div>
      </div>

      {/* Category Allocation Cards */}
      <div className="grid gap-4">
        {categories.map((category, index) => {
          const allocatedAmount = allocations[category.id] || 0;
          const percentage = (allocatedAmount / totalIncome) * 100;
          const recommendedAmount =
            (category.recommendedPercentage / 100) * totalIncome;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-3 border-gray-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 0.5}deg)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 text-lg">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {formatPrice(allocatedAmount)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Recommended Range */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Recommended: {category.recommendedPercentage}%</span>
                  <span>{formatPrice(recommendedAmount)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Range: {category.minPercentage}% - {category.maxPercentage}%
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={totalIncome}
                  step="100"
                  value={allocatedAmount}
                  onChange={(e) =>
                    onAllocationChange(category.id, parseInt(e.target.value))
                  }
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(allocatedAmount / totalIncome) * 100}%, #e5e7eb ${(allocatedAmount / totalIncome) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>NPR 0</span>
                  <span>{formatPrice(totalIncome)}</span>
                </div>
              </div>

              {/* Quick Allocation Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    onAllocationChange(category.id, recommendedAmount)
                  }
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold border-2 border-blue-300 hover:bg-blue-200 transition-colors"
                >
                  Recommended
                </button>
                <button
                  onClick={() =>
                    onAllocationChange(
                      category.id,
                      (category.minPercentage / 100) * totalIncome,
                    )
                  }
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  Min
                </button>
                <button
                  onClick={() =>
                    onAllocationChange(
                      category.id,
                      (category.maxPercentage / 100) * totalIncome,
                    )
                  }
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  Max
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Warning for over-budget */}
      {remaining < 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-3 border-red-500 rounded-xl p-4 text-center"
        >
          <p className="text-red-800 font-black">⚠️ You're over budget!</p>
          <p className="text-red-600 text-sm">
            Reduce allocations in some categories.
          </p>
        </motion.div>
      )}
    </div>
  );
}
