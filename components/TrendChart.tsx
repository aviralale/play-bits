"use client";

import { motion } from "framer-motion";
import { TrendItem } from "@/types";
import { formatPrice } from "@/lib/tools";

interface TrendChartProps {
  item: TrendItem;
  showPrediction?: boolean;
  predictedPrice?: number;
}

export default function TrendChart({
  item,
  showPrediction = false,
  predictedPrice,
}: TrendChartProps) {
  const prices = item.priceHistory.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices, predictedPrice || 0);
  const range = maxPrice - minPrice;

  const getY = (price: number) => {
    return ((maxPrice - price) / range) * 80 + 10; // 80% height + 10% margin
  };

  const getX = (index: number, total: number) => {
    return (index / (total - 1)) * 80 + 10; // 80% width + 10% margin
  };

  const pathData = item.priceHistory
    .map((point, index) => {
      const x = getX(index, item.priceHistory.length);
      const y = getY(point.price);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const trendColor = {
    increasing: "#10b981",
    decreasing: "#ef4444",
    stable: "#6b7280",
    volatile: "#f59e0b",
  }[item.trend];

  return (
    <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">Price History (Last 6 Months)</p>
        </div>
        <div className="text-right">
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${
              item.trend === "increasing"
                ? "bg-green-100 border-green-500 text-green-800"
                : item.trend === "decreasing"
                  ? "bg-red-100 border-red-500 text-red-800"
                  : item.trend === "stable"
                    ? "bg-gray-100 border-gray-500 text-gray-800"
                    : "bg-yellow-100 border-yellow-500 text-yellow-800"
            }`}
          >
            {item.trend.toUpperCase()} TREND
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Price line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={trendColor}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data points */}
          {item.priceHistory.map((point, index) => (
            <motion.circle
              key={index}
              cx={getX(index, item.priceHistory.length)}
              cy={getY(point.price)}
              r="1.5"
              fill={trendColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}

          {/* Prediction point */}
          {showPrediction && predictedPrice && (
            <motion.circle
              cx={getX(item.priceHistory.length, item.priceHistory.length + 1)}
              cy={getY(predictedPrice)}
              r="2"
              fill="#8b5cf6"
              stroke="#6d28d9"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
            />
          )}

          {/* Actual next price */}
          {showPrediction && (
            <motion.circle
              cx={getX(item.priceHistory.length, item.priceHistory.length + 1)}
              cy={getY(item.nextMonthPrice)}
              r="2"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
            />
          )}
        </svg>

        {/* Price labels */}
        <div className="absolute left-2 top-2 text-xs text-gray-600">
          <div>NPR {maxPrice.toLocaleString()}</div>
        </div>
        <div className="absolute left-2 bottom-2 text-xs text-gray-600">
          <div>NPR {minPrice.toLocaleString()}</div>
        </div>

        {/* Month labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {item.priceHistory.map((point, index) => (
            <span key={index} className="text-center">
              {point.month}
            </span>
          ))}
          {showPrediction && <span className="text-center font-bold">Jul</span>}
        </div>

        {/* Legend */}
        {showPrediction && (
          <div className="absolute top-2 right-2 flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Your Prediction</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Actual Price</span>
            </div>
          </div>
        )}
      </div>

      {/* Current stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600 font-bold">LATEST PRICE</p>
          <p className="text-lg font-black text-gray-900">
            {formatPrice(item.priceHistory[item.priceHistory.length - 1].price)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-bold">6-MONTH AVG</p>
          <p className="text-lg font-black text-gray-900">
            {formatPrice(
              Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
            )}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-bold">VOLATILITY</p>
          <p className="text-lg font-black text-gray-900">
            {Math.round(
              (range / (prices.reduce((a, b) => a + b, 0) / prices.length)) *
                100,
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
