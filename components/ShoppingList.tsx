"use client";

import { motion } from "framer-motion";
import { ShoppingChallenge } from "@/types";
import { formatPrice } from "@/lib/tools";
import ShoppingItemCard from "./ShoppingItemCard";

interface ShoppingListProps {
  challenge: ShoppingChallenge;
  quantities: { [itemId: string]: number };
  onQuantityChange: (itemId: string, quantity: number) => void;
  disabled?: boolean;
}

export default function ShoppingList({
  challenge,
  quantities,
  onQuantityChange,
  disabled = false,
}: ShoppingListProps) {
  const selectedItems = challenge.items.filter(
    (item) => (quantities[item.id] || 0) > 0,
  );
  const totalSpent = selectedItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 0),
    0,
  );
  const remainingBudget = challenge.budget - totalSpent;
  const isOverBudget = totalSpent > challenge.budget;

  return (
    <div className="space-y-6">
      {/* Budget Summary */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-3 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={{ transform: "rotate(0.5deg)" }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black text-gray-900">Shopping Budget</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-bold">Total Budget</p>
              <p className="text-xl font-black text-gray-900">
                {formatPrice(challenge.budget)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-bold">Spent</p>
              <p
                className={`text-xl font-black ${
                  isOverBudget ? "text-red-600" : "text-green-600"
                }`}
              >
                {formatPrice(totalSpent)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-bold">Remaining</p>
              <p
                className={`text-xl font-black ${
                  remainingBudget < 0 ? "text-red-600" : "text-blue-600"
                }`}
              >
                {formatPrice(Math.abs(remainingBudget))}
              </p>
            </div>
          </div>
          {isOverBudget && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-100 border-2 border-red-300 rounded-lg p-3"
            >
              <p className="text-red-800 font-bold text-sm">
                ⚠️ You're over budget! Remove some items to continue.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenge.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ShoppingItemCard
              item={item}
              quantity={quantities[item.id] || 0}
              onQuantityChange={onQuantityChange}
              disabled={disabled}
            />
          </motion.div>
        ))}
      </div>

      {/* Priority Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4"
      >
        <h3 className="font-bold text-gray-900 mb-3 text-center">
          Priority Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔴</span>
            <div>
              <p className="font-bold text-gray-900">Essential</p>
              <p className="text-gray-600">Must-have items for basic needs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🟠</span>
            <div>
              <p className="font-bold text-gray-900">Important</p>
              <p className="text-gray-600">Recommended for better living</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🟢</span>
            <div>
              <p className="font-bold text-gray-900">Optional</p>
              <p className="text-gray-600">Nice-to-have luxury items</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
