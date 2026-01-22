"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendItem } from "@/types";
import { formatPrice } from "@/lib/tools";

interface TrendPredictionInputProps {
  item: TrendItem;
  onSubmit: (price: number, confidence: "low" | "medium" | "high") => void;
  disabled?: boolean;
}

export default function TrendPredictionInput({
  item,
  onSubmit,
  disabled = false,
}: TrendPredictionInputProps) {
  const [predictedPrice, setPredictedPrice] = useState<number>(
    item.priceHistory[item.priceHistory.length - 1].price,
  );
  const [confidence, setConfidence] = useState<"low" | "medium" | "high">(
    "medium",
  );

  const latestPrice = item.priceHistory[item.priceHistory.length - 1].price;
  const minReasonablePrice = Math.max(1, latestPrice * 0.5);
  const maxReasonablePrice = latestPrice * 2;

  const handleSubmit = () => {
    if (predictedPrice > 0) {
      onSubmit(predictedPrice, confidence);
    }
  };

  const confidenceOptions = [
    {
      value: "low" as const,
      label: "Low Confidence",
      description: "Just a guess",
      color: "bg-red-100 border-red-500 text-red-800",
    },
    {
      value: "medium" as const,
      label: "Medium Confidence",
      description: "Somewhat sure",
      color: "bg-yellow-100 border-yellow-500 text-yellow-800",
    },
    {
      value: "high" as const,
      label: "High Confidence",
      description: "Very sure",
      color: "bg-green-100 border-green-500 text-green-800",
    },
  ];

  return (
    <div className="bg-white border-3 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-xl font-black text-gray-900 mb-4 text-center">
        Predict July Price for {item.name}
      </h3>

      <div className="space-y-6">
        {/* Current Price Reference */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-bold">
              Current Price (June)
            </p>
            <p className="text-2xl font-black text-gray-900">
              {formatPrice(latestPrice)}
            </p>
            <p className="text-xs text-gray-500 mt-1">per {item.unit}</p>
          </div>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Your Prediction for July
          </label>
          <div className="relative">
            <input
              type="number"
              value={predictedPrice}
              onChange={(e) =>
                setPredictedPrice(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-full text-center text-2xl font-black py-4 px-6 border-3 border-gray-900 rounded-xl bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              placeholder="Enter price in NPR"
              min={minReasonablePrice}
              max={maxReasonablePrice}
              disabled={disabled}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-bold">
              NPR
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Reasonable range: {formatPrice(minReasonablePrice)} -{" "}
            {formatPrice(maxReasonablePrice)}
          </p>
        </div>

        {/* Quick Prediction Buttons */}
        <div>
          <p className="text-sm font-bold text-gray-900 mb-3">
            Quick Predictions:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPredictedPrice(Math.round(latestPrice * 0.9))}
              disabled={disabled}
              className="px-3 py-2 bg-red-100 border-2 border-red-300 rounded-lg text-red-800 text-xs font-bold hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              -10%
            </button>
            <button
              onClick={() => setPredictedPrice(latestPrice)}
              disabled={disabled}
              className="px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-800 text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Same
            </button>
            <button
              onClick={() => setPredictedPrice(Math.round(latestPrice * 1.1))}
              disabled={disabled}
              className="px-3 py-2 bg-green-100 border-2 border-green-300 rounded-lg text-green-800 text-xs font-bold hover:bg-green-200 transition-colors disabled:opacity-50"
            >
              +10%
            </button>
          </div>
        </div>

        {/* Confidence Level */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            How confident are you?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {confidenceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setConfidence(option.value)}
                disabled={disabled}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  confidence === option.value
                    ? `${option.color} border-opacity-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]`
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                } disabled:opacity-50`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{option.label}</p>
                    <p className="text-xs opacity-75">{option.description}</p>
                  </div>
                  {confidence === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 bg-current rounded-full opacity-50"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || predictedPrice <= 0}
          className="w-full bg-gray-900 text-white font-black py-4 px-6 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "Comic Sans MS, cursive, sans-serif",
            transform: "rotate(-0.5deg)",
          }}
        >
          Submit Prediction! 📊
        </button>
      </div>
    </div>
  );
}
