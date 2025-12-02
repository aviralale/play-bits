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
