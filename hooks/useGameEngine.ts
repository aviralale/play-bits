"use client";

import { useState, useCallback } from "react";
import { Item, GameState, GameResult, Difficulty, GameSettings } from "@/types";
import { getRandomItem, getActualPrice, calculateScore } from "@/lib/tools";

export function useGameEngine(settings: GameSettings) {
  const [gameState, setGameState] = useState<GameState>({
    currentItem: null,
    currentRound: 0,
    totalRounds: settings.numberOfRounds,
    score: 0,
    results: [],
    isGameOver: false,
    showResult: false,
  });

  const [currentActualPrice, setCurrentActualPrice] = useState<number>(0);

  const startGame = useCallback(() => {
    const firstItem = getRandomItem(settings.difficulty);
    const actualPrice = getActualPrice(firstItem);

    setGameState({
      currentItem: firstItem,
      currentRound: 1,
      totalRounds: settings.numberOfRounds,
      score: 0,
      results: [],
      isGameOver: false,
      showResult: false,
    });

    setCurrentActualPrice(actualPrice);
  }, [settings.difficulty, settings.numberOfRounds]);

  const submitGuess = useCallback(
    (guessedPrice: number) => {
      if (!gameState.currentItem) return;

      const difference = Math.abs(currentActualPrice - guessedPrice);
      const percentageError = (difference / currentActualPrice) * 100;
      const points = calculateScore(currentActualPrice, guessedPrice);

      const result: GameResult = {
        itemName: gameState.currentItem.name,
        actualPrice: currentActualPrice,
        guessedPrice,
        difference,
        percentageError,
        points,
        dataQuality: gameState.currentItem.dataQuality,
      };

      setGameState((prev) => ({
        ...prev,
        score: prev.score + points,
        results: [...prev.results, result],
        showResult: true,
      }));
    },
    [gameState.currentItem, currentActualPrice]
  );

  const nextRound = useCallback(() => {
    const isLastRound = gameState.currentRound >= gameState.totalRounds;

    if (isLastRound) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        showResult: false,
      }));
    } else {
      const nextItem = getRandomItem(settings.difficulty);
      const actualPrice = getActualPrice(nextItem);

      setGameState((prev) => ({
        ...prev,
        currentItem: nextItem,
        currentRound: prev.currentRound + 1,
        showResult: false,
      }));

      setCurrentActualPrice(actualPrice);
    }
  }, [gameState.currentRound, gameState.totalRounds, settings.difficulty]);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    currentActualPrice,
    startGame,
    submitGuess,
    nextRound,
    resetGame,
  };
}
