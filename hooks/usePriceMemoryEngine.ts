import { useState, useCallback, useEffect } from "react";
import { MARKET_DATA } from "@/data/market-data";

export interface MemoryCard {
  id: string;
  itemName: string;
  price: number;
  unit: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: "name" | "price";
}

export type Difficulty = "easy" | "medium" | "hard";

export interface PriceMemoryGameState {
  cards: MemoryCard[];
  moves: number;
  matchedPairs: number;
  firstFlip: MemoryCard | null;
  secondFlip: MemoryCard | null;
  isProcessing: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  score: number;
  difficulty: Difficulty | null;
  timeLeft: number;
  timeTaken: number;
}

export const usePriceMemoryEngine = () => {
  const [gameState, setGameState] = useState<PriceMemoryGameState>({
    cards: [],
    moves: 0,
    matchedPairs: 0,
    firstFlip: null,
    secondFlip: null,
    isProcessing: false,
    gameStarted: false,
    gameEnded: false,
    score: 0,
    difficulty: null,
    timeLeft: 0,
    timeTaken: 0,
  });

  const [startTime, setStartTime] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameEnded) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        if (newTimeLeft <= 0) {
          return { ...prev, gameEnded: true, timeLeft: 0 };
        }

        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.gameEnded]);

  const getCardCountByDifficulty = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case "easy":
        return 4; // 8 cards (4 pairs)
      case "medium":
        return 6; // 12 cards (6 pairs)
      case "hard":
        return 8; // 16 cards (8 pairs)
    }
  };

  const getTimeByDifficulty = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case "easy":
        return 120; // 2 minutes
      case "medium":
        return 180; // 3 minutes
      case "hard":
        return 240; // 4 minutes
    }
  };

  const initializeGame = useCallback((difficulty: Difficulty) => {
    const cardCount = getCardCountByDifficulty(difficulty);
    const timeLimit = getTimeByDifficulty(difficulty);

    // Select random items for the memory game
    const shuffled = [...MARKET_DATA].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, cardCount);

    // Create pairs: one card with item name, one with price
    const cards: MemoryCard[] = [];
    selectedItems.forEach((item, index) => {
      const baseId = `item-${index}`;
      cards.push({
        id: `${baseId}-name`,
        itemName: item.name,
        price: item.priceRange.current[0],
        unit: item.unit,
        isFlipped: false,
        isMatched: false,
        type: "name",
      });
      cards.push({
        id: `${baseId}-price`,
        itemName: item.name,
        price: item.priceRange.current[0],
        unit: item.unit,
        isFlipped: false,
        isMatched: false,
        type: "price",
      });
    });

    // Shuffle the cards
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    setStartTime(Date.now());
    setGameState((prev) => ({
      ...prev,
      cards: shuffledCards,
      gameStarted: true,
      moves: 0,
      matchedPairs: 0,
      firstFlip: null,
      secondFlip: null,
      score: 0,
      difficulty,
      timeLeft: timeLimit,
      timeTaken: 0,
    }));
  }, []);

  const flipCard = useCallback(
    (card: MemoryCard) => {
      if (gameState.isProcessing || card.isMatched || card.isFlipped) return;

      const updatedCards = gameState.cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c,
      );

      if (!gameState.firstFlip) {
        setGameState((prev) => ({
          ...prev,
          firstFlip: { ...card, isFlipped: true },
          cards: updatedCards,
        }));
      } else if (!gameState.secondFlip) {
        const secondCard = { ...card, isFlipped: true };
        setGameState((prev) => ({
          ...prev,
          secondFlip: secondCard,
          cards: updatedCards,
          isProcessing: true,
        }));

        // Check if cards match after a delay
        setTimeout(() => {
          const isMatch =
            gameState.firstFlip?.itemName === secondCard.itemName &&
            gameState.firstFlip?.type !== secondCard.type;

          if (isMatch) {
            const matchedCards = updatedCards.map((c) =>
              c.itemName === gameState.firstFlip?.itemName
                ? { ...c, isMatched: true }
                : c,
            );

            const newMatchedPairs = gameState.matchedPairs + 1;
            const totalPairs =
              gameState.difficulty === "easy"
                ? 4
                : gameState.difficulty === "medium"
                  ? 6
                  : 8;
            const isGameEnded = newMatchedPairs === totalPairs;

            setGameState((prev) => {
              const timeTaken = startTime
                ? Math.floor((Date.now() - startTime) / 1000)
                : 0;
              let score = 0;

              if (isGameEnded) {
                // Scoring: base points - move penalty - time penalty + difficulty bonus
                const baseScore = 500;
                const movePenalty = (prev.moves + 1) * 20;
                const timePenalty = Math.floor(timeTaken / 2);
                const difficultyBonus =
                  prev.difficulty === "easy"
                    ? 0
                    : prev.difficulty === "medium"
                      ? 100
                      : 300;

                score = Math.max(
                  0,
                  baseScore - movePenalty - timePenalty + difficultyBonus,
                );
              }

              return {
                ...prev,
                cards: matchedCards,
                matchedPairs: newMatchedPairs,
                firstFlip: null,
                secondFlip: null,
                isProcessing: false,
                moves: prev.moves + 1,
                score,
                timeTaken,
                gameEnded: isGameEnded,
              };
            });
          } else {
            // Unflip cards
            const unflippedCards = updatedCards.map((c) =>
              !c.isMatched &&
              c.id !== gameState.firstFlip?.id &&
              c.id !== secondCard.id
                ? { ...c, isFlipped: false }
                : c,
            );

            setGameState((prev) => ({
              ...prev,
              cards: unflippedCards,
              firstFlip: null,
              secondFlip: null,
              isProcessing: false,
              moves: prev.moves + 1,
            }));
          }
        }, 1000);
      }
    },
    [gameState, startTime],
  );

  const resetGame = useCallback(() => {
    if (gameState.difficulty) {
      initializeGame(gameState.difficulty);
    }
  }, [gameState.difficulty, initializeGame]);

  return {
    gameState,
    flipCard,
    resetGame,
    initializeGame,
  };
};
