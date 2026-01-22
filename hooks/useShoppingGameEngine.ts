"use client";

import { useState, useCallback } from "react";
import {
  ShoppingGameState,
  ShoppingChallenge,
  ShoppingGameResult,
  Difficulty,
} from "@/types";
import { getShoppingChallenges, calculateShoppingScore } from "@/lib/tools";

interface UseShoppingGameEngineProps {
  difficulty?: Difficulty;
  numberOfRounds: number;
}

export function useShoppingGameEngine({
  difficulty,
  numberOfRounds,
}: UseShoppingGameEngineProps) {
  const [gameState, setGameState] = useState<ShoppingGameState>({
    currentChallenge: null,
    currentRound: 0,
    totalRounds: numberOfRounds,
    score: 0,
    results: [],
    isGameOver: false,
    showResult: false,
    quantities: {},
  });

  const startGame = useCallback(() => {
    const challenges = getShoppingChallenges(difficulty);
    if (challenges.length === 0) {
      console.error(
        "No shopping challenges available for difficulty:",
        difficulty,
      );
      return;
    }

    // Shuffle challenges and take the first one
    const shuffledChallenges = [...challenges].sort(() => Math.random() - 0.5);
    const currentChallenge = shuffledChallenges[0];

    setGameState((prev) => ({
      ...prev,
      currentChallenge,
      currentRound: 1,
      score: 0,
      results: [],
      isGameOver: false,
      showResult: false,
      selections: {},
    }));
  }, [difficulty]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setGameState((prev) => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [itemId]: quantity,
      },
    }));
  }, []);

  const submitShopping = useCallback(() => {
    if (!gameState.currentChallenge) return;

    const result = calculateShoppingScore(
      gameState.quantities,
      gameState.currentChallenge,
    );

    setGameState((prev) => ({
      ...prev,
      results: [...prev.results, result],
      score: prev.score + result.score,
      showResult: true,
    }));
  }, [gameState.currentChallenge, gameState.quantities]);

  const nextRound = useCallback(() => {
    const challenges = getShoppingChallenges(difficulty);
    if (challenges.length === 0) return;

    const isLastRound = gameState.currentRound >= gameState.totalRounds;

    if (isLastRound) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        showResult: false,
      }));
      return;
    }

    // Get a different challenge for the next round
    const availableChallenges = challenges.filter(
      (challenge) => challenge.id !== gameState.currentChallenge?.id,
    );

    if (availableChallenges.length === 0) {
      // If no other challenges, reuse the same one but that's unlikely
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        showResult: false,
      }));
      return;
    }

    const nextChallenge =
      availableChallenges[
        Math.floor(Math.random() * availableChallenges.length)
      ];

    setGameState((prev) => ({
      ...prev,
      currentChallenge: nextChallenge,
      currentRound: prev.currentRound + 1,
      showResult: false,
      quantities: {},
    }));
  }, [
    difficulty,
    gameState.currentRound,
    gameState.totalRounds,
    gameState.currentChallenge,
  ]);

  const resetGame = useCallback(() => {
    setGameState({
      currentChallenge: null,
      currentRound: 0,
      totalRounds: numberOfRounds,
      score: 0,
      results: [],
      isGameOver: false,
      showResult: false,
      quantities: {},
    });
  }, [numberOfRounds]);

  return {
    gameState,
    startGame,
    updateQuantity,
    submitShopping,
    nextRound,
    resetGame,
  };
}
