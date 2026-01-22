import {
  Item,
  Difficulty,
  BudgetScenario,
  BudgetAllocation,
  BudgetGameResult,
  TrendItem,
  TrendGameResult,
  ShoppingChallenge,
  ShoppingGameResult,
} from "@/types";
import { MARKET_DATA } from "@/data/market-data";

/**
 * Get a random item from the dataset
 * @param difficulty - Optional difficulty filter (1-5)
 * @returns Random Item
 */
export function getRandomItem(difficulty?: Difficulty): Item {
  const filteredItems = difficulty
    ? MARKET_DATA.filter((item) => item.difficulty === difficulty)
    : MARKET_DATA;

  if (filteredItems.length === 0) {
    // Fallback to all items if no items match the difficulty
    const randomIndex = Math.floor(Math.random() * MARKET_DATA.length);
    return MARKET_DATA[randomIndex];
  }

  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  return filteredItems[randomIndex];
}

/**
 * Get all items by difficulty level
 * @param difficulty - Difficulty level (1-5)
 * @returns Array of Items
 */
export function getItemsByDifficulty(difficulty: Difficulty): Item[] {
  return MARKET_DATA.filter((item) => item.difficulty === difficulty);
}

/**
 * Format price in Nepali Rupees
 * @param price - Price number
 * @returns Formatted string
 */
export function formatPrice(price: number): string {
  return `NPR ${price.toLocaleString("en-NP")}`;
}

/**
 * Get random number from range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number within range
 */
export function randomFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate actual price for an item (random within current price range)
 * @param item - Item object
 * @returns Actual price
 */
export function getActualPrice(item: Item): number {
  const [min, max] = item.priceRange.current;
  return randomFromRange(min, max);
}

/**
 * Calculate score based on guess accuracy
 * @param actualPrice - Actual price
 * @param guessedPrice - User's guessed price
 * @returns Points earned (0-1000)
 */
export function calculateScore(
  actualPrice: number,
  guessedPrice: number,
): number {
  const difference = Math.abs(actualPrice - guessedPrice);
  const percentageError = (difference / actualPrice) * 100;

  // Perfect guess: 1000 points
  if (difference === 0) return 1000;

  // Within 5%: 800-900 points
  if (percentageError <= 5) return Math.floor(900 - percentageError * 20);

  // Within 10%: 600-800 points
  if (percentageError <= 10) return Math.floor(800 - percentageError * 20);

  // Within 20%: 400-600 points
  if (percentageError <= 20) return Math.floor(600 - percentageError * 10);

  // Within 30%: 200-400 points
  if (percentageError <= 30) return Math.floor(400 - percentageError * 6.67);

  // Within 50%: 100-200 points
  if (percentageError <= 50) return Math.floor(200 - percentageError * 2);

  // More than 50% off: 0-100 points
  if (percentageError <= 100) return Math.floor(100 - percentageError);

  // Way off: 0 points
  return 0;
}

/**
 * Get difficulty label
 * @param difficulty - Difficulty number (1-5)
 * @returns Difficulty label
 */
export function getDifficultyLabel(difficulty: Difficulty): string {
  const labels: Record<Difficulty, string> = {
    1: "Very Easy",
    2: "Easy",
    3: "Medium",
    4: "Hard",
    5: "Very Hard",
  };
  return labels[difficulty];
}

/**
 * Get category emoji
 * @param category - Category string
 * @returns Emoji representing category
 */
export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    grocery: "🛒",
    food: "🍽️",
    transport: "🚗",
    home: "🏠",
    services: "💼",
    health: "💪",
    stationery: "📝",
  };
  return emojis[category] || "📦";
}

/**
 * Shuffle array
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Budget Master Game Functions

/**
 * Get budget scenarios based on difficulty
 * @param difficulty - Difficulty level (1-5)
 * @returns Array of budget scenarios
 */
export function getBudgetScenarios(difficulty?: Difficulty): BudgetScenario[] {
  const scenarios: BudgetScenario[] = [
    {
      id: "middle-class-kathmandu",
      title: "Middle Class Family in Kathmandu",
      description:
        "A family of 4 in Kathmandu with a monthly income of NPR 75,000",
      monthlyIncome: 75000,
      familySize: 4,
      location: "Kathmandu",
      difficulty: 3,
      categories: [
        {
          id: "housing",
          name: "Housing & Rent",
          icon: "🏠",
          description: "Rent, maintenance, utilities",
          recommendedPercentage: 35,
          minPercentage: 25,
          maxPercentage: 45,
        },
        {
          id: "food",
          name: "Food & Groceries",
          icon: "🍽️",
          description: "Daily meals, groceries, dining out",
          recommendedPercentage: 25,
          minPercentage: 20,
          maxPercentage: 35,
        },
        {
          id: "transport",
          name: "Transportation",
          icon: "🚗",
          description: "Fuel, public transport, vehicle maintenance",
          recommendedPercentage: 15,
          minPercentage: 10,
          maxPercentage: 20,
        },
        {
          id: "education",
          name: "Education & Kids",
          icon: "📚",
          description: "School fees, books, activities",
          recommendedPercentage: 10,
          minPercentage: 5,
          maxPercentage: 15,
        },
        {
          id: "healthcare",
          name: "Healthcare",
          icon: "💊",
          description: "Medical expenses, insurance",
          recommendedPercentage: 5,
          minPercentage: 3,
          maxPercentage: 10,
        },
        {
          id: "entertainment",
          name: "Entertainment & Miscellaneous",
          icon: "🎬",
          description: "Movies, hobbies, personal care",
          recommendedPercentage: 5,
          minPercentage: 2,
          maxPercentage: 8,
        },
        {
          id: "savings",
          name: "Savings & Investments",
          icon: "💰",
          description: "Emergency fund, investments",
          recommendedPercentage: 5,
          minPercentage: 0,
          maxPercentage: 15,
        },
      ],
    },
    {
      id: "young-professional-pokhara",
      title: "Young Professional in Pokhara",
      description: "Single professional in Pokhara earning NPR 45,000 monthly",
      monthlyIncome: 45000,
      familySize: 1,
      location: "Pokhara",
      difficulty: 2,
      categories: [
        {
          id: "housing",
          name: "Housing & Rent",
          icon: "🏠",
          description: "Rent, utilities",
          recommendedPercentage: 30,
          minPercentage: 20,
          maxPercentage: 40,
        },
        {
          id: "food",
          name: "Food & Dining",
          icon: "🍽️",
          description: "Groceries, restaurants, coffee",
          recommendedPercentage: 20,
          minPercentage: 15,
          maxPercentage: 30,
        },
        {
          id: "transport",
          name: "Transportation",
          icon: "🚌",
          description: "Public transport, occasional taxi",
          recommendedPercentage: 10,
          minPercentage: 5,
          maxPercentage: 15,
        },
        {
          id: "entertainment",
          name: "Entertainment & Social",
          icon: "🎉",
          description: "Movies, outings, hobbies",
          recommendedPercentage: 15,
          minPercentage: 10,
          maxPercentage: 25,
        },
        {
          id: "shopping",
          name: "Shopping & Personal",
          icon: "🛍️",
          description: "Clothes, gadgets, personal care",
          recommendedPercentage: 10,
          minPercentage: 5,
          maxPercentage: 15,
        },
        {
          id: "savings",
          name: "Savings",
          icon: "💰",
          description: "Emergency fund, future goals",
          recommendedPercentage: 15,
          minPercentage: 5,
          maxPercentage: 25,
        },
      ],
    },
    {
      id: "student-kathmandu",
      title: "University Student in Kathmandu",
      description: "Student in Kathmandu with part-time income of NPR 25,000",
      monthlyIncome: 25000,
      familySize: 1,
      location: "Kathmandu",
      difficulty: 1,
      categories: [
        {
          id: "housing",
          name: "Housing & Rent",
          icon: "🏠",
          description: "Room rent, utilities",
          recommendedPercentage: 40,
          minPercentage: 30,
          maxPercentage: 50,
        },
        {
          id: "food",
          name: "Food",
          icon: "🍽️",
          description: "Mess food, snacks, tea",
          recommendedPercentage: 25,
          minPercentage: 20,
          maxPercentage: 35,
        },
        {
          id: "transport",
          name: "Transportation",
          icon: "🚌",
          description: "Bus fare, local travel",
          recommendedPercentage: 10,
          minPercentage: 5,
          maxPercentage: 15,
        },
        {
          id: "education",
          name: "Education",
          icon: "📚",
          description: "Books, supplies, online courses",
          recommendedPercentage: 15,
          minPercentage: 10,
          maxPercentage: 25,
        },
        {
          id: "entertainment",
          name: "Entertainment",
          icon: "🎮",
          description: "Movies, games, social activities",
          recommendedPercentage: 5,
          minPercentage: 2,
          maxPercentage: 10,
        },
        {
          id: "savings",
          name: "Savings",
          icon: "💰",
          description: "Emergency fund",
          recommendedPercentage: 5,
          minPercentage: 0,
          maxPercentage: 15,
        },
      ],
    },
  ];

  if (difficulty) {
    return scenarios.filter((scenario) => scenario.difficulty === difficulty);
  }

  return scenarios;
}

/**
 * Calculate budget allocation score
 * @param scenario - Budget scenario
 * @param allocations - User's allocations
 * @param remaining - Remaining budget
 * @returns Budget game result
 */
export function calculateBudgetScore(
  scenario: BudgetScenario,
  allocations: BudgetAllocation[],
  remaining: number,
): BudgetGameResult {
  let totalScore = 0;
  const categoryFeedback: { [categoryId: string]: string } = {};
  const totalAllocated = allocations.reduce(
    (sum, alloc) => sum + alloc.amount,
    0,
  );

  allocations.forEach((allocation) => {
    const category = scenario.categories.find(
      (cat) => cat.id === allocation.categoryId,
    );
    if (!category) return;

    const recommendedAmount =
      (category.recommendedPercentage / 100) * scenario.monthlyIncome;
    const difference = Math.abs(allocation.amount - recommendedAmount);
    const percentageDifference = (difference / recommendedAmount) * 100;

    let categoryScore = 0;
    let feedback = "";

    if (percentageDifference <= 5) {
      categoryScore = 100;
      feedback = "Perfect! 🎯";
    } else if (percentageDifference <= 15) {
      categoryScore = 80;
      feedback = "Good job! 👍";
    } else if (percentageDifference <= 30) {
      categoryScore = 60;
      feedback = "Close, but could be better 🤔";
    } else if (percentageDifference <= 50) {
      categoryScore = 40;
      feedback = "Needs adjustment 📊";
    } else {
      categoryScore = 20;
      feedback = "Significantly off target ❌";
    }

    // Bonus for staying within min/max ranges
    if (
      allocation.percentage >= category.minPercentage &&
      allocation.percentage <= category.maxPercentage
    ) {
      categoryScore += 10;
    }

    totalScore += categoryScore;
    categoryFeedback[allocation.categoryId] = feedback;
  });

  // Penalty for going over budget significantly
  if (remaining < -scenario.monthlyIncome * 0.1) {
    totalScore -= 200;
  } else if (remaining < 0) {
    totalScore -= 100;
  }

  // Bonus for staying within 5% of total budget
  if (Math.abs(remaining) <= scenario.monthlyIncome * 0.05) {
    totalScore += 50;
  }

  // Ensure score doesn't go below 0
  totalScore = Math.max(0, totalScore);

  let overallFeedback = "";
  if (totalScore >= 600) {
    overallFeedback = "Excellent budgeting! You're a natural! 🌟";
  } else if (totalScore >= 450) {
    overallFeedback = "Great job! You have good budgeting skills! 💪";
  } else if (totalScore >= 300) {
    overallFeedback = "Not bad! Keep practicing to improve! 📈";
  } else {
    overallFeedback =
      "Keep learning about budgeting! Every expert was once a beginner! 📚";
  }

  return {
    scenarioTitle: scenario.title,
    totalIncome: scenario.monthlyIncome,
    allocations,
    totalAllocated,
    remaining,
    score: totalScore,
    feedback: overallFeedback,
    categoryFeedback,
  };
}

// Market Trends Game Functions

/**
 * Get trend items based on difficulty
 * @param difficulty - Difficulty level (1-5)
 * @returns Array of trend items
 */
export function getTrendItems(difficulty?: Difficulty): TrendItem[] {
  const trendItems: TrendItem[] = [
    {
      name: "Rice (Premium)",
      category: "grocery",
      unit: "kg",
      difficulty: 2,
      trend: "increasing",
      source: "Kathmandu Wholesale Market",
      priceHistory: [
        { month: "Jan", price: 120, dataQuality: "high" },
        { month: "Feb", price: 125, dataQuality: "high" },
        { month: "Mar", price: 130, dataQuality: "high" },
        { month: "Apr", price: 135, dataQuality: "high" },
        { month: "May", price: 140, dataQuality: "high" },
        { month: "Jun", price: 145, dataQuality: "high" },
      ],
      nextMonthPrice: 152, // July price
    },
    {
      name: "Tomatoes",
      category: "grocery",
      unit: "kg",
      difficulty: 3,
      trend: "volatile",
      source: "Kalimati Market",
      priceHistory: [
        { month: "Jan", price: 80, dataQuality: "high" },
        { month: "Feb", price: 120, dataQuality: "high" },
        { month: "Mar", price: 60, dataQuality: "high" },
        { month: "Apr", price: 90, dataQuality: "high" },
        { month: "May", price: 110, dataQuality: "high" },
        { month: "Jun", price: 70, dataQuality: "high" },
      ],
      nextMonthPrice: 95, // July price
    },
    {
      name: "Chicken Breast",
      category: "food",
      unit: "kg",
      difficulty: 2,
      trend: "stable",
      source: "Butcher Markets",
      priceHistory: [
        { month: "Jan", price: 450, dataQuality: "medium" },
        { month: "Feb", price: 460, dataQuality: "medium" },
        { month: "Mar", price: 455, dataQuality: "medium" },
        { month: "Apr", price: 465, dataQuality: "medium" },
        { month: "May", price: 450, dataQuality: "medium" },
        { month: "Jun", price: 455, dataQuality: "medium" },
      ],
      nextMonthPrice: 460, // July price
    },
    {
      name: "Diesel Fuel",
      category: "transport",
      unit: "liter",
      difficulty: 4,
      trend: "increasing",
      source: "Fuel Stations",
      priceHistory: [
        { month: "Jan", price: 140, dataQuality: "high" },
        { month: "Feb", price: 142, dataQuality: "high" },
        { month: "Mar", price: 145, dataQuality: "high" },
        { month: "Apr", price: 148, dataQuality: "high" },
        { month: "May", price: 152, dataQuality: "high" },
        { month: "Jun", price: 155, dataQuality: "high" },
      ],
      nextMonthPrice: 160, // July price
    },
    {
      name: "Bananas",
      category: "grocery",
      unit: "dozen",
      difficulty: 1,
      trend: "decreasing",
      source: "Local Markets",
      priceHistory: [
        { month: "Jan", price: 180, dataQuality: "high" },
        { month: "Feb", price: 170, dataQuality: "high" },
        { month: "Mar", price: 160, dataQuality: "high" },
        { month: "Apr", price: 150, dataQuality: "high" },
        { month: "May", price: 140, dataQuality: "high" },
        { month: "Jun", price: 130, dataQuality: "high" },
      ],
      nextMonthPrice: 120, // July price
    },
    {
      name: "Milk Powder",
      category: "grocery",
      unit: "kg",
      difficulty: 3,
      trend: "increasing",
      source: "Supermarkets",
      priceHistory: [
        { month: "Jan", price: 1200, dataQuality: "high" },
        { month: "Feb", price: 1250, dataQuality: "high" },
        { month: "Mar", price: 1180, dataQuality: "high" },
        { month: "Apr", price: 1300, dataQuality: "high" },
        { month: "May", price: 1280, dataQuality: "high" },
        { month: "Jun", price: 1350, dataQuality: "high" },
      ],
      nextMonthPrice: 1420, // July price
    },
  ];

  if (difficulty) {
    return trendItems.filter((item) => item.difficulty === difficulty);
  }

  return trendItems;
}

/**
 * Calculate trend prediction score
 * @param actualPrice - Actual future price
 * @param predictedPrice - User's predicted price
 * @param confidence - User's confidence level
 * @param trend - The item's trend type
 * @returns Points earned (0-1000)
 */
export function calculateTrendScore(
  actualPrice: number,
  predictedPrice: number,
  confidence: "low" | "medium" | "high",
  trend: "increasing" | "decreasing" | "stable" | "volatile",
): number {
  const difference = Math.abs(actualPrice - predictedPrice);
  const percentageError = (difference / actualPrice) * 100;

  let baseScore = 0;

  // Base scoring on accuracy
  if (percentageError <= 2) baseScore = 1000;
  else if (percentageError <= 5) baseScore = 900;
  else if (percentageError <= 10) baseScore = 800;
  else if (percentageError <= 15) baseScore = 700;
  else if (percentageError <= 20) baseScore = 600;
  else if (percentageError <= 30) baseScore = 500;
  else if (percentageError <= 50) baseScore = 300;
  else baseScore = 100;

  // Bonus for confidence level
  const confidenceMultiplier = {
    low: 0.8,
    medium: 1.0,
    high: 1.2,
  };

  // Bonus for correctly identifying trend direction
  let trendBonus = 0;
  const predictedChange = predictedPrice - actualPrice;
  const actualChange = actualPrice - actualPrice * 0.95; // Simplified trend detection

  if (trend === "increasing" && predictedChange > 0) trendBonus = 100;
  else if (trend === "decreasing" && predictedChange < 0) trendBonus = 100;
  else if (trend === "stable" && Math.abs(predictedChange) < actualPrice * 0.05)
    trendBonus = 100;

  return Math.round(baseScore * confidenceMultiplier[confidence] + trendBonus);
}

// Shopping Challenge Game Functions

/**
 * Get shopping challenges based on difficulty
 * @param difficulty - Difficulty level (1-5)
 * @returns Array of shopping challenges
 */
export function getShoppingChallenges(
  difficulty?: Difficulty,
): ShoppingChallenge[] {
  const challenges: ShoppingChallenge[] = [
    {
      id: "festival-diwali-prep",
      title: "Diwali Festival Shopping",
      description:
        "Prepare for Diwali festival for a family of 4 in Kathmandu with NPR 8,000 budget",
      budget: 8000,
      difficulty: 3,
      location: "Kathmandu",
      familySize: 4,
      items: [
        {
          id: "rice-festival",
          name: "Premium Rice",
          category: "grocery",
          price: 180, // per kg
          priority: "essential",
          unit: "kg",
          description: "High-quality rice for festival meals",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "lentils-festival",
          name: "Red Lentils",
          category: "grocery",
          price: 230, // per kg
          priority: "essential",
          unit: "kg",
          description: "Essential lentils for dal",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "ghee-festival",
          name: "Pure Ghee",
          category: "grocery",
          price: 1200, // per kg
          priority: "important",
          unit: "kg",
          description: "Ghee for sweets and cooking",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "sugar-festival",
          name: "White Sugar",
          category: "grocery",
          price: 180, // per kg
          priority: "essential",
          unit: "kg",
          description: "Sugar for sweets and tea",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "flour-festival",
          name: "Wheat Flour",
          category: "grocery",
          price: 160, // per kg
          priority: "essential",
          unit: "kg",
          description: "Flour for making sweets",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "chicken-festival",
          name: "Chicken",
          category: "food",
          price: 400, // per kg
          priority: "important",
          unit: "kg",
          description: "Chicken for festival feast",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "vegetables-festival",
          name: "Festival Vegetables",
          category: "grocery",
          price: 80, // per kg
          priority: "essential",
          unit: "kg",
          description: "Fresh vegetables for cooking",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "spices-festival",
          name: "Festival Spices Mix",
          category: "grocery",
          price: 350, // per set
          priority: "important",
          unit: "set",
          description: "Special spices for festival cooking",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "milk-festival",
          name: "Fresh Milk",
          category: "grocery",
          price: 30, // per liter
          priority: "essential",
          unit: "L",
          description: "Milk for making sweets",
          maxQuantity: 10,
          minQuantity: 0,
        },
        {
          id: "eggs-festival",
          name: "Farm Eggs",
          category: "food",
          price: 180, // per dozen
          priority: "important",
          unit: "dozen",
          description: "Eggs for various preparations",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "oil-festival",
          name: "Cooking Oil",
          category: "grocery",
          price: 120, // per liter
          priority: "essential",
          unit: "L",
          description: "Oil for deep frying sweets",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "sweets-festival",
          name: "Festival Sweets",
          category: "food",
          price: 300, // per kg
          priority: "optional",
          unit: "kg",
          description: "Ready-made sweets assortment",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "diwali-lights",
          name: "Diwali Lights & Candles",
          category: "home",
          price: 450, // per set
          priority: "optional",
          unit: "set",
          description: "Decorative lights and candles",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "incense-festival",
          name: "Incense Sticks",
          category: "home",
          price: 120, // per pack
          priority: "optional",
          unit: "pack",
          description: "Incense for prayers and decoration",
          maxQuantity: 1,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "student-monthly-budget",
      title: "Student Monthly Expenses",
      description:
        "Monthly shopping for a university student in Pokhara with NPR 4,500 budget",
      budget: 4500,
      difficulty: 2,
      location: "Pokhara",
      familySize: 1,
      items: [
        {
          id: "rice-student",
          name: "Rice",
          category: "grocery",
          price: 180, // per kg
          priority: "essential",
          unit: "kg",
          description: "Basic rice for daily meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "lentils-student",
          name: "Lentils",
          category: "grocery",
          price: 230, // per kg
          priority: "essential",
          unit: "kg",
          description: "Lentils for protein",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "noodles-student",
          name: "Instant Noodles",
          category: "grocery",
          price: 40, // per pack
          priority: "important",
          unit: "pack",
          description: "Quick meals for busy student",
          maxQuantity: 6,
          minQuantity: 0,
        },
        {
          id: "bread-student",
          name: "Bread",
          category: "grocery",
          price: 60, // per loaf
          priority: "important",
          unit: "loaf",
          description: "Bread for breakfast",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "vegetables-student",
          name: "Daily Vegetables",
          category: "grocery",
          price: 60, // per kg
          priority: "essential",
          unit: "kg",
          description: "Fresh vegetables for cooking",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "eggs-student",
          name: "Eggs",
          category: "food",
          price: 120, // per dozen
          priority: "important",
          unit: "dozen",
          description: "Eggs for breakfast and meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "milk-student",
          name: "Milk",
          category: "grocery",
          price: 45, // per liter
          priority: "essential",
          unit: "L",
          description: "Milk for tea and breakfast",
          maxQuantity: 7,
          minQuantity: 0,
        },
        {
          id: "tea-student",
          name: "Tea & Coffee",
          category: "grocery",
          price: 50, // per pack
          priority: "important",
          unit: "pack",
          description: "Tea leaves and instant coffee",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "snacks-student",
          name: "Snacks",
          category: "food",
          price: 50, // per pack
          priority: "optional",
          unit: "pack",
          description: "Biscuits and light snacks",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "soap-student",
          name: "Bath Soap & Shampoo",
          category: "home",
          price: 90, // per set
          priority: "essential",
          unit: "set",
          description: "Personal hygiene products",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "toothpaste-student",
          name: "Toothpaste",
          category: "health",
          price: 90, // per tube
          priority: "essential",
          unit: "tube",
          description: "Dental care",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "laundry-student",
          name: "Laundry Detergent",
          category: "home",
          price: 60, // per pack
          priority: "important",
          unit: "pack",
          description: "Washing clothes",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "notebook-student",
          name: "Notebooks & Pens",
          category: "stationery",
          price: 75, // per set
          priority: "important",
          unit: "set",
          description: "Study materials",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "internet-student",
          name: "Internet Recharge",
          category: "services",
          price: 800, // per month
          priority: "essential",
          unit: "month",
          description: "Internet connection for studies",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "transport-student",
          name: "Bus Pass",
          category: "transport",
          price: 600, // per month
          priority: "essential",
          unit: "month",
          description: "Public transport pass",
          maxQuantity: 1,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "rural-family-weekly",
      title: "Rural Family Weekly Needs",
      description:
        "Weekly shopping for a rural farming family of 6 in Chitwan with NPR 6,000 budget",
      budget: 6000,
      difficulty: 4,
      location: "Chitwan",
      familySize: 6,
      items: [
        {
          id: "rice-rural",
          name: "Local Rice",
          category: "grocery",
          price: 180, // per kg
          priority: "essential",
          unit: "kg",
          description: "Bulk rice for large family",
          maxQuantity: 10,
          minQuantity: 0,
        },
        {
          id: "salt-rural",
          name: "Iodized Salt",
          category: "grocery",
          price: 30, // per kg
          priority: "essential",
          unit: "kg",
          description: "Essential salt for cooking",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "oil-rural",
          name: "Mustard Oil",
          category: "grocery",
          price: 160, // per liter
          priority: "essential",
          unit: "L",
          description: "Traditional cooking oil",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "lentils-rural",
          name: "Mixed Lentils",
          category: "grocery",
          price: 240, // per kg
          priority: "essential",
          unit: "kg",
          description: "Various lentils for meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "spices-rural",
          name: "Basic Spices",
          category: "grocery",
          price: 100, // per set
          priority: "important",
          unit: "set",
          description: "Turmeric, chili, coriander",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "kerosene-rural",
          name: "Kerosene",
          category: "home",
          price: 100, // per liter
          priority: "essential",
          unit: "L",
          description: "Fuel for cooking and lighting",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "matches-rural",
          name: "Matchbox",
          category: "home",
          price: 10, // per box
          priority: "essential",
          unit: "box",
          description: "For lighting kerosene lamps",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "soap-rural",
          name: "Bath & Laundry Soap",
          category: "home",
          price: 30, // per bar
          priority: "essential",
          unit: "bar",
          description: "Soap for family use",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "kerosene-lamp",
          name: "Kerosene Lamp",
          category: "home",
          price: 300, // per lamp
          priority: "important",
          unit: "lamp",
          description: "Lighting for evening use",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "mosquito-coil",
          name: "Mosquito Coils",
          category: "home",
          price: 40, // per pack
          priority: "important",
          unit: "pack",
          description: "Protection from mosquitoes",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "batteries-rural",
          name: "AA Batteries",
          category: "home",
          price: 50, // per pack of 4
          priority: "optional",
          unit: "pack",
          description: "For radio and torch",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "flour-rural",
          name: "Corn Flour",
          category: "grocery",
          price: 75, // per kg
          priority: "optional",
          unit: "kg",
          description: "For making local bread",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "honey-rural",
          name: "Local Honey",
          category: "food",
          price: 250, // per jar
          priority: "optional",
          unit: "jar",
          description: "Natural sweetener and medicine",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "medicines-rural",
          name: "Basic Medicines",
          category: "health",
          price: 150, // per kit
          priority: "important",
          unit: "kit",
          description: "Painkillers, bandages, antiseptic",
          maxQuantity: 1,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "office-worker-weekly",
      title: "Office Worker Weekly Shop",
      description:
        "Weekly grocery shopping for a working professional in Lalitpur with NPR 5,500 budget",
      budget: 5500,
      difficulty: 3,
      location: "Lalitpur",
      familySize: 2,
      items: [
        {
          id: "rice-office",
          name: "Premium Rice",
          category: "grocery",
          price: 180, // per kg
          priority: "essential",
          unit: "kg",
          description: "Quality rice for meals",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "chicken-office",
          name: "Chicken",
          category: "food",
          price: 400, // per kg
          priority: "important",
          unit: "kg",
          description: "Chicken for weekend meals",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "fish-office",
          name: "Fresh Fish",
          category: "food",
          price: 400, // per kg
          priority: "optional",
          unit: "kg",
          description: "Fish for special dinner",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "vegetables-office",
          name: "Organic Vegetables",
          category: "grocery",
          price: 70, // per kg
          priority: "essential",
          unit: "kg",
          description: "Fresh organic produce",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "fruits-office",
          name: "Seasonal Fruits",
          category: "grocery",
          price: 60, // per kg
          priority: "important",
          unit: "kg",
          description: "Fruits for health",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "milk-office",
          name: "Fresh Milk",
          category: "grocery",
          price: 35, // per liter
          priority: "essential",
          unit: "L",
          description: "Daily milk supply",
          maxQuantity: 7,
          minQuantity: 0,
        },
        {
          id: "yogurt-office",
          name: "Greek Yogurt",
          category: "grocery",
          price: 100, // per pack
          priority: "optional",
          unit: "pack",
          description: "Healthy yogurt option",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "bread-office",
          name: "Whole Grain Bread",
          category: "grocery",
          price: 60, // per loaf
          priority: "important",
          unit: "loaf",
          description: "Healthy bread option",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "eggs-office",
          name: "Organic Eggs",
          category: "food",
          price: 150, // per dozen
          priority: "important",
          unit: "dozen",
          description: "Organic eggs for breakfast",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "coffee-office",
          name: "Ground Coffee",
          category: "grocery",
          price: 125, // per pack
          priority: "optional",
          unit: "pack",
          description: "Quality coffee for mornings",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "pasta-office",
          name: "Pasta & Sauce",
          category: "grocery",
          price: 90, // per pack
          priority: "optional",
          unit: "pack",
          description: "Quick dinner option",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "cheese-office",
          name: "Cheddar Cheese",
          category: "grocery",
          price: 175, // per block
          priority: "optional",
          unit: "block",
          description: "Cheese for sandwiches",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "cleaning-office",
          name: "Cleaning Supplies",
          category: "home",
          price: 100, // per set
          priority: "important",
          unit: "set",
          description: "Dish soap, surface cleaner",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "toiletries-office",
          name: "Personal Care",
          category: "home",
          price: 125, // per set
          priority: "essential",
          unit: "set",
          description: "Shampoo, toothpaste, soap",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "snacks-office",
          name: "Healthy Snacks",
          category: "food",
          price: 75, // per pack
          priority: "optional",
          unit: "pack",
          description: "Nuts, dried fruits, granola",
          maxQuantity: 2,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "student-monthly-budget",
      title: "Student Monthly Expenses",
      description:
        "Monthly shopping for a university student in Pokhara with NPR 4,500 budget",
      budget: 4500,
      difficulty: 2,
      location: "Pokhara",
      familySize: 1,
      items: [
        {
          id: "rice-student",
          name: "Rice (2kg)",
          category: "grocery",
          price: 360,
          priority: "essential",
          unit: "2kg",
          description: "Basic rice for daily meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "lentils-student",
          name: "Lentils (1kg)",
          category: "grocery",
          price: 230,
          priority: "essential",
          unit: "kg",
          description: "Lentils for protein",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "noodles-student",
          name: "Instant Noodles",
          category: "grocery",
          price: 120,
          priority: "important",
          unit: "6 packs",
          description: "Quick meals for busy student",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "bread-student",
          name: "Bread & Bakery",
          category: "grocery",
          price: 180,
          priority: "important",
          unit: "weekly",
          description: "Bread and bakery items",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "vegetables-student",
          name: "Daily Vegetables",
          category: "grocery",
          price: 300,
          priority: "essential",
          unit: "weekly",
          description: "Fresh vegetables for cooking",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "eggs-student",
          name: "Eggs",
          category: "food",
          price: 240,
          priority: "important",
          unit: "dozen",
          description: "Eggs for breakfast and meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "milk-student",
          name: "Milk",
          category: "grocery",
          price: 270,
          priority: "essential",
          unit: "weekly",
          description: "Milk for tea and breakfast",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "tea-student",
          name: "Tea & Coffee",
          category: "grocery",
          price: 150,
          priority: "important",
          unit: "monthly",
          description: "Tea leaves and instant coffee",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "snacks-student",
          name: "Snacks & Biscuits",
          category: "food",
          price: 200,
          priority: "optional",
          unit: "assortment",
          description: "Biscuits and light snacks",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "soap-student",
          name: "Bath Soap & Shampoo",
          category: "home",
          price: 180,
          priority: "essential",
          unit: "monthly",
          description: "Personal hygiene products",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "toothpaste-student",
          name: "Toothpaste",
          category: "health",
          price: 90,
          priority: "essential",
          unit: "tube",
          description: "Dental care",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "laundry-student",
          name: "Laundry Detergent",
          category: "home",
          price: 120,
          priority: "important",
          unit: "small",
          description: "Washing clothes",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "notebook-student",
          name: "Notebooks & Pens",
          category: "stationery",
          price: 150,
          priority: "important",
          unit: "set",
          description: "Study materials",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "internet-student",
          name: "Internet Recharge",
          category: "services",
          price: 800,
          priority: "essential",
          unit: "monthly",
          description: "Internet connection for studies",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "transport-student",
          name: "Bus Pass",
          category: "transport",
          price: 600,
          priority: "essential",
          unit: "monthly",
          description: "Public transport pass",
          maxQuantity: 1,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "rural-family-weekly",
      title: "Rural Family Weekly Needs",
      description:
        "Weekly shopping for a rural farming family of 6 in Chitwan with NPR 6,000 budget",
      budget: 6000,
      difficulty: 4,
      location: "Chitwan",
      familySize: 6,
      items: [
        {
          id: "rice-rural",
          name: "Local Rice (10kg)",
          category: "grocery",
          price: 1800,
          priority: "essential",
          unit: "10kg",
          description: "Bulk rice for large family",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "salt-rural",
          name: "Iodized Salt",
          category: "grocery",
          price: 60,
          priority: "essential",
          unit: "kg",
          description: "Essential salt for cooking",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "oil-rural",
          name: "Mustard Oil",
          category: "grocery",
          price: 320,
          priority: "essential",
          unit: "2L",
          description: "Traditional cooking oil",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "lentils-rural",
          name: "Mixed Lentils",
          category: "grocery",
          price: 480,
          priority: "essential",
          unit: "2kg",
          description: "Various lentils for meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "spices-rural",
          name: "Basic Spices",
          category: "grocery",
          price: 200,
          priority: "important",
          unit: "set",
          description: "Turmeric, chili, coriander",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "kerosene-rural",
          name: "Kerosene",
          category: "home",
          price: 400,
          priority: "essential",
          unit: "5L",
          description: "Fuel for cooking and lighting",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "matches-rural",
          name: "Matchbox",
          category: "home",
          price: 20,
          priority: "essential",
          unit: "pack",
          description: "For lighting kerosene lamps",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "soap-rural",
          name: "Laundry & Bath Soap",
          category: "home",
          price: 120,
          priority: "essential",
          unit: "4 bars",
          description: "Soap for family use",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "kerosene-lamp",
          name: "Kerosene Lamp",
          category: "home",
          price: 300,
          priority: "important",
          unit: "1",
          description: "Lighting for evening use",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "mosquito-coil",
          name: "Mosquito Coils",
          category: "home",
          price: 80,
          priority: "important",
          unit: "pack",
          description: "Protection from mosquitoes",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "batteries-rural",
          name: "AA Batteries",
          category: "home",
          price: 100,
          priority: "optional",
          unit: "4 pack",
          description: "For radio and torch",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "flour-rural",
          name: "Corn Flour",
          category: "grocery",
          price: 150,
          priority: "optional",
          unit: "kg",
          description: "For making local bread",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "honey-rural",
          name: "Local Honey",
          category: "food",
          price: 250,
          priority: "optional",
          unit: "jar",
          description: "Natural sweetener and medicine",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "medicines-rural",
          name: "Basic Medicines",
          category: "health",
          price: 300,
          priority: "important",
          unit: "kit",
          description: "Painkillers, bandages, antiseptic",
          maxQuantity: 1,
          minQuantity: 0,
        },
      ],
    },
    {
      id: "office-worker-weekly",
      title: "Office Worker Weekly Shop",
      description:
        "Weekly grocery shopping for a working professional in Lalitpur with NPR 5,500 budget",
      budget: 5500,
      difficulty: 3,
      location: "Lalitpur",
      familySize: 2,
      items: [
        {
          id: "rice-office",
          name: "Premium Rice (3kg)",
          category: "grocery",
          price: 540,
          priority: "essential",
          unit: "3kg",
          description: "Quality rice for meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "chicken-office",
          name: "Chicken Curry Cut",
          category: "food",
          price: 600,
          priority: "important",
          unit: "kg",
          description: "Chicken for weekend meals",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "fish-office",
          name: "Fresh Fish",
          category: "food",
          price: 400,
          priority: "optional",
          unit: "kg",
          description: "Fish for special dinner",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "vegetables-office",
          name: "Organic Vegetables",
          category: "grocery",
          price: 350,
          priority: "essential",
          unit: "weekly",
          description: "Fresh organic produce",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "fruits-office",
          name: "Seasonal Fruits",
          category: "grocery",
          price: 300,
          priority: "important",
          unit: "weekly",
          description: "Fruits for health",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "milk-office",
          name: "Fresh Milk",
          category: "grocery",
          price: 350,
          priority: "essential",
          unit: "weekly",
          description: "Daily milk supply",
          maxQuantity: 4,
          minQuantity: 0,
        },
        {
          id: "yogurt-office",
          name: "Greek Yogurt",
          category: "grocery",
          price: 200,
          priority: "optional",
          unit: "pack",
          description: "Healthy yogurt option",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "bread-office",
          name: "Whole Grain Bread",
          category: "grocery",
          price: 120,
          priority: "important",
          unit: "loaf",
          description: "Healthy bread option",
          maxQuantity: 5,
          minQuantity: 0,
        },
        {
          id: "eggs-office",
          name: "Organic Eggs",
          category: "food",
          price: 300,
          priority: "important",
          unit: "dozen",
          description: "Organic eggs for breakfast",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "coffee-office",
          name: "Ground Coffee",
          category: "grocery",
          price: 250,
          priority: "optional",
          unit: "pack",
          description: "Quality coffee for mornings",
          maxQuantity: 2,
          minQuantity: 0,
        },
        {
          id: "pasta-office",
          name: "Pasta & Sauce",
          category: "grocery",
          price: 180,
          priority: "optional",
          unit: "pack",
          description: "Quick dinner option",
          maxQuantity: 3,
          minQuantity: 0,
        },
        {
          id: "cheese-office",
          name: "Cheddar Cheese",
          category: "grocery",
          price: 350,
          priority: "optional",
          unit: "block",
          description: "Cheese for sandwiches",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "cleaning-office",
          name: "Cleaning Supplies",
          category: "home",
          price: 200,
          priority: "important",
          unit: "set",
          description: "Dish soap, surface cleaner",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "toiletries-office",
          name: "Personal Care",
          category: "home",
          price: 250,
          priority: "essential",
          unit: "monthly",
          description: "Shampoo, toothpaste, soap",
          maxQuantity: 1,
          minQuantity: 0,
        },
        {
          id: "snacks-office",
          name: "Healthy Snacks",
          category: "food",
          price: 150,
          priority: "optional",
          unit: "assortment",
          description: "Nuts, dried fruits, granola",
          maxQuantity: 2,
          minQuantity: 0,
        },
      ],
    },
  ];

  return difficulty
    ? challenges.filter((challenge) => challenge.difficulty === difficulty)
    : challenges;
}

/**
 * Calculate shopping challenge score
 * @param selections - User's item selections
 * @param challenge - The shopping challenge
 * @returns Shopping game result
 */
export function calculateShoppingScore(
  quantities: { [itemId: string]: number },
  challenge: ShoppingChallenge,
): ShoppingGameResult {
  let totalSpent = 0;
  let totalValue = 0;
  let maxPossibleValue = 0;
  const missedEssentials: string[] = [];
  const smartChoices: string[] = [];

  challenge.items.forEach((item) => {
    const quantity = quantities[item.id] || 0;
    maxPossibleValue += getItemValue(item);

    if (quantity > 0) {
      totalSpent += item.price * quantity;
      totalValue += getItemValue(item);

      if (item.priority === "essential") {
        smartChoices.push(item.name);
      }
    } else if (item.priority === "essential") {
      missedEssentials.push(item.name);
    }
  });

  const remainingBudget = challenge.budget - totalSpent;
  const efficiency =
    totalSpent <= challenge.budget ? (totalValue / maxPossibleValue) * 100 : 0;

  // Calculate score based on efficiency and essential items
  let score = Math.round(efficiency * 10); // Base score from efficiency (0-1000)

  // Bonus for getting all essentials
  if (missedEssentials.length === 0) {
    score += 200;
  }

  // Penalty for overspending
  if (totalSpent > challenge.budget) {
    score = Math.max(0, score - 300);
  }

  // Bonus for staying under budget (0-100 points)
  if (remainingBudget > 0) {
    score += Math.round(
      Math.min(100, (remainingBudget / challenge.budget) * 100),
    );
  }

  // Ensure score is always an integer
  score = Math.round(score);

  let feedback = "";
  if (totalSpent > challenge.budget) {
    feedback = `You overspent by NPR ${Math.abs(remainingBudget)}. Try to be more careful with your budget!`;
  } else if (missedEssentials.length > 0) {
    feedback = `You missed some essential items: ${missedEssentials.join(", ")}. Essentials are important for basic needs.`;
  } else if (efficiency >= 90) {
    feedback =
      "Excellent shopping! You got all essentials and made smart choices within budget.";
  } else if (efficiency >= 70) {
    feedback = "Good job! You covered the essentials and saved some money.";
  } else {
    feedback =
      "You got the basics covered. Next time try to include more important items.";
  }

  return {
    challengeTitle: challenge.title,
    budget: challenge.budget,
    selections: challenge.items.map((item) => ({
      itemId: item.id,
      selected: (quantities[item.id] || 0) > 0,
      quantity: quantities[item.id] || 0,
    })),
    quantities,
    totalSpent,
    remainingBudget,
    totalValue,
    maxPossibleValue,
    efficiency,
    score,
    feedback,
    missedEssentials,
    smartChoices,
  };
}

/**
 * Get the value/priority score for an item
 * @param item - Shopping item
 * @returns Value score (higher = more important)
 */
function getItemValue(item: {
  priority: "essential" | "important" | "optional";
}): number {
  switch (item.priority) {
    case "essential":
      return 100;
    case "important":
      return 70;
    case "optional":
      return 30;
    default:
      return 0;
  }
}
