import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Classroom Resources | Financial Literacy Games for Teachers",
  description:
    "Free educational games for teaching financial literacy, budgeting, and economics. Perfect classroom resources for high school and college educators. No registration required.",
  keywords: [
    "classroom games",
    "financial literacy education",
    "free educational resources",
    "teacher resources",
    "economics curriculum",
    "budgeting simulation",
    "financial education games",
    "student engagement",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalResource",
  name: "PlayBits - Free Financial Literacy Games for Classroom",
  description:
    "Collection of 5 free interactive financial literacy games designed for classroom use and financial education.",
  author: {
    "@type": "Organization",
    name: "Ctrl Bits",
  },
  educationalLevel: ["High School", "College"],
  url: "https://www.playbits.online/teachers",
};

const games = [
  {
    id: 1,
    title: "Budget Master",
    description: "Teach the 50/30/20 budgeting rule with realistic family scenarios",
    path: "/games/budget-master",
    benefits: ["Budget allocation", "Expense management", "50/30/20 rule"],
    gradeLevel: "9-12",
    duration: "15-20 minutes",
  },
  {
    id: 2,
    title: "Guess the Price",
    description: "Build price awareness and inflation understanding",
    path: "/games/guess-the-price",
    benefits: ["Market awareness", "Price estimation", "Inflation concepts"],
    gradeLevel: "7-12",
    duration: "10-15 minutes",
  },
  {
    id: 3,
    title: "Market Trends",
    description: "Teach trend analysis and predictive thinking",
    path: "/games/market-trends",
    benefits: ["Trend analysis", "Prediction skills", "Market dynamics"],
    gradeLevel: "10-12",
    duration: "15-20 minutes",
  },
  {
    id: 4,
    title: "Shopping Challenge",
    description: "Practice smart shopping and budget optimization",
    path: "/games/shopping-challenge",
    benefits: ["Smart shopping", "Budget optimization", "Priority setting"],
    gradeLevel: "8-12",
    duration: "15-20 minutes",
  },
  {
    id: 5,
    title: "Price Memory",
    description: "Engage students with memory games while building price knowledge",
    path: "/games/price-memory",
    benefits: ["Memory skills", "Price associations", "Quick thinking"],
    gradeLevel: "7-10",
    duration: "5-10 minutes",
  },
];

export default function TeachersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white border-b-4 border-gray-900">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
                <h1 className="text-5xl font-black text-gray-900" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  Financial Literacy for Classrooms
                </h1>
              </div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Free, interactive games designed to teach financial literacy, budgeting, and economic concepts. 
                Perfect for engaging students and making financial education fun and practical.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="#games"
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                >
                  Explore Games <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Why PlayBits for Your Classroom?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎮",
                title: "100% Free",
                description: "No subscription, no registration, no ads interrupting lessons.",
              },
              {
                icon: "⏱️",
                title: "Quick Activities",
                description: "Games fit perfectly into 15-20 minute class periods.",
              },
              {
                icon: "📊",
                title: "Real Data",
                description: "Based on actual market prices and real-world scenarios.",
              },
              {
                icon: "👥",
                title: "Easy Setup",
                description: "Just click and play - works on any device with a browser.",
              },
              {
                icon: "📈",
                title: "Engaging",
                description: "Gamification increases student motivation and participation.",
              },
              {
                icon: "✅",
                title: "Measurable",
                description: "Score-based feedback shows learning outcomes.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 border-3 border-gray-900 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-black text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section id="games" className="max-w-7xl mx-auto px-4 py-16 border-t-4 border-gray-200">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            5 Interactive Financial Literacy Games
          </h2>

          <div className="grid gap-8">
            {games.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border-3 border-gray-900 rounded-xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-black text-gray-900 mb-3">{game.title}</h3>
                    <p className="text-gray-700 text-lg mb-6">{game.description}</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-bold text-gray-900">Learning Outcomes:</p>
                        <ul className="flex flex-wrap gap-2 mt-2">
                          {game.benefits.map((benefit, i) => (
                            <li
                              key={i}
                              className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-bold"
                            >
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-8 text-sm">
                        <p>
                          <span className="font-bold">Grade Level:</span> {game.gradeLevel}
                        </p>
                        <p>
                          <span className="font-bold">Duration:</span> {game.duration}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={game.path}
                      className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      Play Now →
                    </Link>
                  </div>
                  <div className="bg-blue-50 border-3 border-blue-200 rounded-xl p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-3">🎮</div>
                      <p className="font-bold text-gray-900">Ready to Play</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-gray-50 border-y-4 border-gray-900 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
              How to Use in Your Classroom
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Pick a Game",
                  description: "Select which financial concept you want to teach",
                },
                {
                  step: "2",
                  title: "Launch",
                  description: "Click play - no setup, registration, or downloads needed",
                },
                {
                  step: "3",
                  title: "Play Together",
                  description: "Students play individually or discuss strategy together",
                },
                {
                  step: "4",
                  title: "Discuss Results",
                  description: "Review scores and discuss real-world financial lessons",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-5xl font-black text-blue-600 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Ready to Engage Your Students?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Start using PlayBits in your classroom today. These games have been designed specifically 
              for educational impact and student engagement. Perfect for economics, business, and life skills classes.
            </p>
            <Link
              href="/"
              className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-xl text-lg border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Start Your Free Trial Now 🎮
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white border-t-4 border-gray-900 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-bold mb-2">PlayBits - Free Financial Literacy Games</p>
            <p className="text-gray-400">Made by Ctrl Bits | Designed for Educators</p>
          </div>
        </footer>
      </div>
    </>
  );
}
