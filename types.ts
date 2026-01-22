export type Category =
  | "grocery"
  | "food"
  | "transport"
  | "home"
  | "services"
  | "health"
  | "stationery";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type DataQuality = "low" | "medium" | "high";

export interface PriceRange {
  current: [number, number];
  projected6mo: [number, number];
}

export interface Item {
  name: string;
  category: Category;
  unit: string;
  difficulty: Difficulty;
  priceRange: PriceRange;
  source: string;
  dataQuality: DataQuality;
}

export interface GameSettings {
  difficulty?: Difficulty;
  timeLimit?: number;
  numberOfRounds: number;
}

export interface GameResult {
  itemName: string;
  actualPrice: number;
  guessedPrice: number;
  difference: number;
  percentageError: number;
  points: number;
  dataQuality: DataQuality;
}

export interface GameState {
  currentItem: Item | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  results: GameResult[];
  isGameOver: boolean;
  showResult: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Budget Master Game Types
export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedPercentage: number;
  minPercentage: number;
  maxPercentage: number;
}

export interface BudgetScenario {
  id: string;
  title: string;
  description: string;
  monthlyIncome: number;
  familySize: number;
  location: string;
  difficulty: Difficulty;
  categories: BudgetCategory[];
}

export interface BudgetAllocation {
  categoryId: string;
  amount: number;
  percentage: number;
}

export interface BudgetGameResult {
  scenarioTitle: string;
  totalIncome: number;
  allocations: BudgetAllocation[];
  totalAllocated: number;
  remaining: number;
  score: number;
  feedback: string;
  categoryFeedback: { [categoryId: string]: string };
}

export interface BudgetGameState {
  currentScenario: BudgetScenario | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  results: BudgetGameResult[];
  isGameOver: boolean;
  showResult: boolean;
  allocations: { [categoryId: string]: number };
}

// Market Trends Game Types
export interface PricePoint {
  month: string;
  price: number;
  dataQuality: DataQuality;
}

export interface TrendItem {
  name: string;
  category: Category;
  unit: string;
  difficulty: Difficulty;
  priceHistory: PricePoint[];
  trend: "increasing" | "decreasing" | "stable" | "volatile";
  nextMonthPrice: number;
  source: string;
}

export interface TrendPrediction {
  predictedPrice: number;
  confidence: "low" | "medium" | "high";
  reasoning?: string;
}

export interface TrendGameResult {
  itemName: string;
  actualPrice: number;
  predictedPrice: number;
  difference: number;
  percentageError: number;
  points: number;
  trend: "increasing" | "decreasing" | "stable" | "volatile";
  confidence: "low" | "medium" | "high";
}

export interface TrendGameState {
  currentItem: TrendItem | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  results: TrendGameResult[];
  isGameOver: boolean;
  showResult: boolean;
}

// Shopping Challenge Game Types
export interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  price: number; // price per unit
  priority: "essential" | "important" | "optional";
  unit: string;
  description: string;
  maxQuantity: number;
  minQuantity: number;
}

export interface ShoppingChallenge {
  id: string;
  title: string;
  description: string;
  budget: number;
  items: ShoppingItem[];
  difficulty: Difficulty;
  location: string;
  familySize: number;
}

export interface ShoppingSelection {
  itemId: string;
  quantity: number;
}

export interface ShoppingGameResult {
  challengeTitle: string;
  budget: number;
  selections: { itemId: string; selected: boolean; quantity: number }[];
  quantities: { [itemId: string]: number };
  totalSpent: number;
  remainingBudget: number;
  totalValue: number;
  maxPossibleValue: number;
  efficiency: number;
  score: number;
  feedback: string;
  missedEssentials: string[];
  smartChoices: string[];
}

export interface ShoppingGameState {
  currentChallenge: ShoppingChallenge | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  results: ShoppingGameResult[];
  isGameOver: boolean;
  showResult: boolean;
  quantities: { [itemId: string]: number };
}
