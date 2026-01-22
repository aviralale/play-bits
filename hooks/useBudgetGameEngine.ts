"use client";

import { useState, useCallback } from "react";
import {
  BudgetGameState,
  BudgetScenario,
  BudgetGameResult,
  BudgetAllocation,
  Difficulty,
  GameSettings,
} from "@/types";
import { getBudgetScenarios, calculateBudgetScore } from "@/lib/tools";

export function useBudgetGameEngine(settings: GameSettings) {
  const [gameState, setGameState] = useState<BudgetGameState>({
    currentScenario: null,
    currentRound: 0,
    totalRounds: settings.numberOfRounds,
    score: 0,
    results: [],
    isGameOver: false,
    showResult: false,
    allocations: {},
  });

  const startGame = useCallback(() => {
    const scenarios = getBudgetScenarios(settings.difficulty);
    const firstScenario = scenarios[0];

    setGameState({
      currentScenario: firstScenario,
      currentRound: 1,
      totalRounds: settings.numberOfRounds,
      score: 0,
      results: [],
      isGameOver: false,
      showResult: false,
      allocations: firstScenario.categories.reduce(
        (acc, cat) => ({
          ...acc,
          [cat.id]: 0,
        }),
        {},
      ),
    });
  }, [settings.difficulty, settings.numberOfRounds]);

  const updateAllocation = useCallback((categoryId: string, amount: number) => {
    setGameState((prev) => ({
      ...prev,
      allocations: {
        ...prev.allocations,
        [categoryId]: amount,
      },
    }));
  }, []);

  const submitBudget = useCallback(() => {
    if (!gameState.currentScenario) return;

    const totalAllocated = Object.values(gameState.allocations).reduce(
      (sum, amount) => sum + amount,
      0,
    );
    const remaining = gameState.currentScenario.monthlyIncome - totalAllocated;

    const allocations: BudgetAllocation[] =
      gameState.currentScenario.categories.map((cat) => ({
        categoryId: cat.id,
        amount: gameState.allocations[cat.id] || 0,
        percentage:
          ((gameState.allocations[cat.id] || 0) /
            gameState.currentScenario!.monthlyIncome) *
          100,
      }));

    const result = calculateBudgetScore(
      gameState.currentScenario,
      allocations,
      remaining,
    );

    setGameState((prev) => ({
      ...prev,
      score: prev.score + result.score,
      results: [...prev.results, result],
      showResult: true,
    }));
  }, [gameState.currentScenario, gameState.allocations]);

  const nextRound = useCallback(() => {
    const scenarios = getBudgetScenarios(settings.difficulty);
    const isLastRound = gameState.currentRound >= gameState.totalRounds;

    if (isLastRound) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        showResult: false,
      }));
    } else {
      const nextScenarioIndex = gameState.currentRound % scenarios.length;
      const nextScenario = scenarios[nextScenarioIndex];

      setGameState((prev) => ({
        ...prev,
        currentScenario: nextScenario,
        currentRound: prev.currentRound + 1,
        showResult: false,
        allocations: nextScenario.categories.reduce(
          (acc, cat) => ({
            ...acc,
            [cat.id]: 0,
          }),
          {},
        ),
      }));
    }
  }, [gameState.currentRound, gameState.totalRounds, settings.difficulty]);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    startGame,
    updateAllocation,
    submitBudget,
    nextRound,
    resetGame,
  };
}
