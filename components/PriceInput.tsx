"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PriceInputProps {
  onSubmit: (price: number) => void;
  disabled?: boolean;
}

export default function PriceInput({
  onSubmit,
  disabled = false,
}: PriceInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(inputValue);

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setError("");
    onSubmit(price);
    setInputValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-md mx-auto mt-8"
    >
      <div
        className="bg-white border-3 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <span className="text-gray-900 font-black text-lg">NPR</span>
            </div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter price..."
              disabled={disabled}
              className="w-full pl-20 pr-4 py-4 text-xl font-black bg-yellow-50 border-3 border-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-opacity-20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
              }}
              step="0.01"
              min="0"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-600 rounded-xl px-4 py-2"
            >
              <p className="text-red-600 text-sm font-bold text-center">
                {error}
              </p>
            </motion.div>
          )}

          <button
            onClick={handleSubmit}
            disabled={disabled || !inputValue}
            className="w-full bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              transform: "rotate(0.5deg)",
            }}
          >
            Submit Guess! 🎯
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-gray-900" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-400 rounded-full border-2 border-gray-900" />
      </div>

      {/* Floating doodle */}
      <motion.div
        className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M 10 30 Q 20 10 40 20 T 50 40"
            stroke="#fbbf24"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="15" cy="25" r="3" fill="#fbbf24" />
          <circle cx="45" cy="35" r="3" fill="#fbbf24" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
