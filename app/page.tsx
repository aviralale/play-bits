"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  const eyeX = useSpring(0, { stiffness: 200, damping: 20 });
  const eyeY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mascot = document.getElementById("doodle-mascot");
      if (mascot) {
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(
          Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 60,
          4
        );

        eyeX.set(Math.cos(angle) * distance);
        eyeY.set(Math.sin(angle) * distance);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeX, eyeY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotate: -2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
    },
  };

  const games = [
    {
      id: "guess-price",
      title: "Guess the Price",
      emoji: "💰",
      borderColor: "#10b981",
      rotation: 1,
      active: true,
      path: "/games/guess-the-price",
      badge: "35+ items",
    },
    {
      id: "budget-master",
      title: "Budget Master",
      emoji: "📊",
      borderColor: "#3b82f6",
      rotation: -1.5,
      active: false,
    },
    {
      id: "market-trends",
      title: "Market Trends",
      emoji: "📈",
      borderColor: "#f97316",
      rotation: 0.5,
      active: false,
    },
    {
      id: "shopping-challenge",
      title: "Shopping Challenge",
      emoji: "🛍️",
      borderColor: "#ec4899",
      rotation: -1,
      active: false,
    },
    {
      id: "price-memory",
      title: "Price Memory",
      emoji: "🧠",
      borderColor: "#8b5cf6",
      rotation: 1.5,
      active: false,
    },
    {
      id: "haggle-master",
      title: "Haggle Master",
      emoji: "🤝",
      borderColor: "#f59e0b",
      rotation: -0.5,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scattered Dots */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Doodled Mascot */}
      <motion.div
        id="doodle-mascot"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
        className="fixed top-12 right-8 z-50 pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            className="drop-shadow-lg"
          >
            {/* Cape - rough doodle */}
            <motion.path
              d="M 70 35 Q 60 40 58 55 L 55 85 Q 55 92 60 95 L 65 60 Z"
              stroke="#2563eb"
              strokeWidth="2.5"
              fill="#93c5fd"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "url(#roughen)",
              }}
              animate={{
                d: [
                  "M 70 35 Q 60 40 58 55 L 55 85 Q 55 92 60 95 L 65 60 Z",
                  "M 70 35 Q 58 42 56 57 L 53 87 Q 53 94 58 97 L 65 60 Z",
                  "M 70 35 Q 60 40 58 55 L 55 85 Q 55 92 60 95 L 65 60 Z",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Body - sketchy rectangle */}
            <path
              d="M 55 60 L 85 60 L 85 95 L 55 95 Z"
              stroke="#1e40af"
              strokeWidth="3"
              fill="#3b82f6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: "1, 2",
              }}
            />

            {/* Arms - simple lines */}
            <motion.path
              d="M 55 65 L 45 75 L 40 85"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "55px 65px" }}
            />
            <motion.path
              d="M 85 65 L 95 75 L 100 85"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{ transformOrigin: "85px 65px" }}
            />

            {/* Legs - rough lines */}
            <path
              d="M 60 95 L 60 115"
              stroke="#1e3a8a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 80 95 L 80 115"
              stroke="#1e3a8a"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Feet - circles */}
            <circle cx="60" cy="118" r="6" fill="#0f172a" />
            <circle cx="80" cy="118" r="6" fill="#0f172a" />

            {/* Head - wobbly circle */}
            <circle
              cx="70"
              cy="40"
              r="20"
              stroke="#d97706"
              strokeWidth="3"
              fill="#f59e0b"
              style={{
                strokeDasharray: "2, 1",
              }}
            />

            {/* Hair - scribbled lines */}
            <path
              d="M 52 28 Q 50 20 54 18 M 58 24 Q 56 16 60 14 M 70 22 Q 70 14 74 14 M 82 24 Q 84 16 88 18"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Mask - rough shape */}
            <ellipse
              cx="70"
              cy="40"
              rx="22"
              ry="8"
              fill="#2563eb"
              opacity="0.9"
            />

            {/* Eyes */}
            <g>
              {/* Left eye */}
              <circle
                cx="62"
                cy="40"
                r="5"
                fill="white"
                stroke="#000"
                strokeWidth="2"
              />
              <motion.circle
                cx="62"
                cy="40"
                r="2.5"
                fill="#0f172a"
                style={{ x: eyeX, y: eyeY }}
              />

              {/* Right eye */}
              <circle
                cx="78"
                cy="40"
                r="5"
                fill="white"
                stroke="#000"
                strokeWidth="2"
              />
              <motion.circle
                cx="78"
                cy="40"
                r="2.5"
                fill="#0f172a"
                style={{ x: eyeX, y: eyeY }}
              />
            </g>

            {/* Smile - simple arc */}
            <path
              d="M 60 48 Q 70 52 80 48"
              stroke="#0f172a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Belt - dashed line */}
            <path
              d="M 55 78 L 85 78"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.path
              d="M1007.55,452.69c.36-.03.72-.03,1.07-.02,26.47,1.08,45.89.47,64.87,3.06,26.73,3.64,53.35,8.74,79.62,14.95,36.53,8.63,71.54,21.94,104.81,39.45,63.93,33.63,116.91,79.33,153.55,142.26,19.49,33.48,32.45,69.46,35.46,108.48.99,12.83,2.29,25.7,2.23,38.54-.24,53.1-14.89,101.77-46.02,145.12-3.95,5.5-8.06,10.98-12.79,15.79-4.65,4.73-2.5,7.24,1.31,10.9,10.94,10.5,21.93,21,32.09,32.24,27.86,30.85,48.15,66.15,60.54,105.9,7.6,24.38,11.3,49.33,13.71,74.79,2.2,23.17.42,45.94-2.78,68.49-4.18,29.44-13.95,57.53-27.65,84.11-37.25,72.28-93.58,125-165.66,161.49-41.16,20.84-84.79,33.78-130.3,41.35-43.56,7.25-87.35,8.76-131.23,7.18-70.77-2.55-139.56-15.73-205.32-42.65-88.9-36.39-163.3-92.22-222.01-168.29-43.67-56.59-74.82-119.58-92.61-189-7.68-29.96-12.86-60.27-15.91-91.12-3.19-32.24-3.82-64.46-3.36-96.73.38-26.74,3.18-53.3,7.07-79.82,4.75-32.34,12.65-63.77,23.4-94.56,15.73-45.05,37.53-87,64.7-126.21,31.23-45.06,69.13-83.45,114.17-114.72,41.95-29.13,87.56-50.66,136.32-65.81,29.31-9.11,59.14-15.96,89.51-19.64,25.96-3.14,52.18-4.15,71.23-5.54ZM929.24,1050.65c-4.97-2.33-19.46-9.39-27.29-25.18-14.08-28.35,4.36-62.65,20-79.53,7.13-7.69,13.87-11.98,26.12-19.76,5.62-3.57,22.27-13.78,48.94-23.06,28.87-10.04,51.68-12.66,78.35-16,30.02-3.76,49.28-3.49,55.29-3.35,11.24.25,26.1,1.73,45.57,4.1,22.76,2.77,45.3,6.19,67.34,12.29,7.13,1.97,12.19.82,17.55-3.96,31.09-27.73,47.52-62.5,48.44-103.93.99-44.91-16.08-83.43-46.62-115.55-57.47-60.44-130.46-89.19-211.68-96.84-46.22-4.35-92.71-.9-138.29,10.8-50.46,12.95-96.76,34.27-137.34,66.87-46.61,37.44-80.92,84.75-106.5,138.53-17.46,36.71-27.4,75.71-32.83,115.73-2.98,21.99-3.71,44.35-4.41,66.57-1.32,42.41,3.01,84.24,13.68,125.47,13.17,50.88,34.77,97.77,64.99,140.63,56.81,80.58,133.6,132.47,228.66,157.6,28.06,7.42,56.56,13.12,85.63,14.15,31.29,1.11,62.72,2.57,93.93.85,34.54-1.9,67.98-10.96,100.02-24.4,36.81-15.44,69.52-37.06,96.81-66.24,36.47-39,53.38-84.95,48.96-138.81-3.73-45.49-22.77-82.67-56.44-112.92-38.35-34.46-84.65-49.98-134.72-55.02-25.3-2.55-50.91-2.18-76.39-2.55-11.38-.17-27.41.6-46.7,5.56-4.51,1.16-8.09,2.28-9.65,2.78-17.49,5.6-27.06,11.67-41.65,19.06h0c-3.51,2.14-36.76,21.63-69.76,6.12Z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="8"
              transform="translate(-1035, -450) scale(0.035)"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "70px 74px" }}
            />

            {/* Roughen filter for hand-drawn effect */}
            <defs>
              <filter id="roughen">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.05"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
              </filter>
            </defs>
          </svg>

          {/* Doodled speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -left-28 top-8"
          >
            <div
              className="relative bg-white border-3 border-gray-800 rounded-2xl px-3 py-2 shadow-sm"
              style={{
                transform: "rotate(-2deg)",
                borderRadius: "20px 20px 20px 4px",
              }}
            >
              <p className="text-xs font-bold text-gray-800">Hey! 👋</p>
              {/* Tail */}
              <div
                className="absolute -right-1.5 bottom-2.5 w-0 h-0"
                style={{
                  borderLeft: "10px solid white",
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Header */}
      <header className="relative border-b-3 border-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight flex justify-center items-center"
                style={{
                  fontFamily: "Comic Sans MS, cursive, sans-serif",
                  textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                }}
              >
                Play
                <span
                  className="inline-block"
                  style={{ transform: "rotate(5deg)" }}
                >
                  <Image
                    src="/favicon.svg"
                    alt="Logo"
                    width={128}
                    height={128}
                  />
                </span>
                Bits
              </motion.h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              whileHover={{
                scale: game.active ? 1.02 : 1,
                rotate: game.active ? game.rotation + 1 : game.rotation,
              }}
              className="relative"
              style={{ transform: `rotate(${game.rotation}deg)` }}
            >
              <div
                onClick={() =>
                  game.active && router.push(game.path ? game.path : "/")
                }
                className={`
                  relative h-36 bg-white border-3 border-gray-900 rounded-xl
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  overflow-hidden transition-all
                  ${
                    game.active
                      ? "cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                      : "opacity-60 cursor-not-allowed"
                  }
                `}
              >
                {/* Hand-drawn squiggle decoration */}
                <svg
                  className="absolute top-0 left-0 w-full h-full opacity-5"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    d="M 0 20 Q 30 10 60 20 T 120 20 T 180 20"
                    stroke={game.borderColor}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>

                {/* Content */}
                <div className="relative h-full p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.span
                      className="text-5xl"
                      animate={{
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {game.emoji}
                    </motion.span>
                    <div>
                      <h3
                        className="text-xl font-black text-gray-900"
                        style={{
                          fontFamily: "Comic Sans MS, cursive, sans-serif",
                        }}
                      >
                        {game.title}
                      </h3>
                      {game.badge && (
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs font-bold border-2 border-gray-900"
                          style={{ transform: "rotate(-1deg)" }}
                        >
                          {game.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {!game.active && <Lock className="w-6 h-6 text-gray-500" />}

                  {game.active && (
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Corner accent - hand-drawn style */}
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: game.borderColor }}
                />

                {/* Active indicator - doodle style */}
                {game.active && (
                  <motion.div
                    className="absolute bottom-2 right-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </motion.div>
                )}
              </div>

              {/* Scattered dots around card */}
              {game.active && (
                <>
                  <div className="absolute -top-2 -left-2 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="absolute top-1/2 -right-3 w-1 h-1 bg-gray-400 rounded-full" />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section - Doodle Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="bg-white border-3 border-gray-900 rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <p
              className="text-gray-700 text-lg leading-relaxed mb-6"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
              }}
            >
              Hi! 👋 This is where I make fun games about life in Nepal. Test
              your knowledge of prices, culture, and more!
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button
                variant="outline"
                className="border-2 border-gray-900 hover:bg-gray-100 font-bold"
                style={{ transform: "rotate(1deg)" }}
              >
                📧 Newsletter
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-900 hover:bg-gray-100 font-bold"
                style={{ transform: "rotate(-1deg)" }}
              >
                🐦 Twitter
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-900 hover:bg-gray-100 font-bold"
                style={{ transform: "rotate(0.5deg)" }}
              >
                ☕ Support
              </Button>
            </div>

            {/* Hand-drawn divider */}
            <div className="relative h-0.5 bg-gray-300 my-6">
              <div
                className="absolute inset-0 bg-gray-400"
                style={{
                  clipPath:
                    "polygon(0 50%, 2% 40%, 4% 60%, 6% 45%, 8% 55%, 10% 50%, 12% 40%, 14% 60%, 16% 45%, 18% 55%, 20% 50%, 100% 50%, 100% 100%, 0 100%)",
                }}
              />
            </div>

            <div className="text-center">
              <p className="text-gray-600 font-bold">
                ✉️ playbits@ctrlbits.com
              </p>
              <button className="text-sm text-gray-500 hover:text-gray-900 mt-2 underline">
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Doodle decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8">
            <svg viewBox="0 0 40 40">
              <path
                d="M 5 20 Q 20 5 35 20 Q 20 35 5 20"
                stroke="#fbbf24"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6">
            <svg viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
