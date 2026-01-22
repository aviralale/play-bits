"use client";

import { useState, useCallback } from "react";
import {
  TrendGameState,
  TrendGameResult,
  TrendItem,
  Difficulty,
  GameSettings,
} from "@/types";
import { getTrendItems, calculateTrendScore } from "@/lib/tools";

export function useTrendGameEngine(settings: GameSettings) {
  const [gameState, setGameState] = useState<TrendGameState>({
    currentItem: null,
    currentRound: 0,
    totalRounds: settings.numberOfRounds,
    score: 0,
    results: [],
    isGameOver: false,
    showResult: false,
  });

  const startGame = useCallback(() => {
    const items = getTrendItems(settings.difficulty);
    const firstItem = items[0];

    setGameState({
      currentItem: firstItem,
      currentRound: 1,
      totalRounds: settings.numberOfRounds,
      score: 0,
      results: [],
      isGameOver: false,
      showResult: false,
    });
  }, [settings.difficulty, settings.numberOfRounds]);

  const submitPrediction = useCallback(
    (
      predictedPrice: number,
      confidence: "low" | "medium" | "high" = "medium",
    ) => {
      if (!gameState.currentItem) return;

      const difference = Math.abs(
        gameState.currentItem.nextMonthPrice - predictedPrice,
      );
      const percentageError =
        (difference / gameState.currentItem.nextMonthPrice) * 100;
      const points = calculateTrendScore(
        gameState.currentItem.nextMonthPrice,
        predictedPrice,
        confidence,
        gameState.currentItem.trend,
      );

      const result: TrendGameResult = {
        itemName: gameState.currentItem.name,
        actualPrice: gameState.currentItem.nextMonthPrice,
        predictedPrice,
        difference,
        percentageError,
        points,
        trend: gameState.currentItem.trend,
        confidence,
      };

      setGameState((prev) => ({
        ...prev,
        score: prev.score + points,
        results: [...prev.results, result],
        showResult: true,
      }));
    },
    [gameState.currentItem],
  );

  const nextRound = useCallback(() => {
    const items = getTrendItems(settings.difficulty);
    const isLastRound = gameState.currentRound >= gameState.totalRounds;

    if (isLastRound) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        showResult: false,
      }));
    } else {
      const nextItemIndex = gameState.currentRound % items.length;
      const nextItem = items[nextItemIndex];

      setGameState((prev) => ({
        ...prev,
        currentItem: nextItem,
        currentRound: prev.currentRound + 1,
        showResult: false,
      }));
    }
  }, [gameState.currentRound, gameState.totalRounds, settings.difficulty]);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    startGame,
    submitPrediction,
    nextRound,
    resetGame,
  };
}
