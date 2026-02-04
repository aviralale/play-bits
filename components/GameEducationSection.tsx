"use client";

import { motion } from "framer-motion";

interface GameEducationSectionProps {
  title: string;
  description: string;
  learningOutcomes: string[];
  targetAudience: string;
  mechanics: string;
  keywords: string[];
}

export default function GameEducationSection({
  title,
  description,
  learningOutcomes,
  targetAudience,
  mechanics,
  keywords,
}: GameEducationSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 border-t-4 border-gray-200 rounded-xl my-12"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning Outcomes</h3>
            <ul className="space-y-3">
              {learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Game</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900 mb-2">Target Audience</p>
                <p className="text-gray-700">{targetAudience}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">Game Mechanics</p>
                <p className="text-gray-700">{mechanics}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Keywords</h3>
          <div className="flex flex-wrap gap-3">
            {keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
