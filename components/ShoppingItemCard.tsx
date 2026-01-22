"use client";

import { motion } from "framer-motion";
import { ShoppingItem } from "@/types";
import { formatPrice } from "@/lib/tools";

interface ShoppingItemCardProps {
  item: ShoppingItem;
  quantity: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
  disabled?: boolean;
}

export default function ShoppingItemCard({
  item,
  quantity,
  onQuantityChange,
  disabled = false,
}: ShoppingItemCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential":
        return "bg-red-100 border-red-300 text-red-800";
      case "important":
        return "bg-orange-100 border-orange-300 text-orange-800";
      case "optional":
        return "bg-green-100 border-green-300 text-green-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "essential":
        return "🔴";
      case "important":
        return "🟠";
      case "optional":
        return "🟢";
      default:
        return "⚪";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white border-3 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        cursor-pointer transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5
        ${quantity > 0 ? "ring-2 ring-blue-500 bg-blue-50" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      style={{ transform: "rotate(-0.5deg)" }}
      onClick={() =>
        !disabled && onQuantityChange(item.id, quantity > 0 ? 0 : 1)
      }
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-black text-gray-900 text-lg mb-1">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-xl text-gray-900">
              {formatPrice(item.price)}
            </span>
            <span className="text-gray-500">per {item.unit}</span>
          </div>
        </div>
        <div className="ml-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled && quantity > 0) {
                onQuantityChange(item.id, quantity - 1);
              }
            }}
            disabled={disabled || quantity <= 0}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700"
          >
            -
          </button>
          <input
            type="number"
            min="0"
            max="10"
            value={quantity}
            onChange={(e) => {
              const newQuantity = Math.max(
                0,
                Math.min(10, parseInt(e.target.value) || 0),
              );
              onQuantityChange(item.id, newQuantity);
            }}
            onClick={(e) => e.stopPropagation()}
            disabled={disabled}
            className="w-12 h-8 text-center border-2 border-gray-300 rounded font-bold text-gray-900"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled && quantity < 10) {
                onQuantityChange(item.id, quantity + 1);
              }
            }}
            disabled={disabled || quantity >= 10}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`
            inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border-2
            ${getPriorityColor(item.priority)}
          `}
        >
          {getPriorityIcon(item.priority)} {item.priority.toUpperCase()}
        </span>
        <span className="text-xs text-gray-500 font-medium">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}
