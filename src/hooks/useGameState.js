import { useState, useCallback } from 'react';
import { LEVELS } from '../data/gameData';

export const GAME_STATES = {
  INTRO: 'intro',
  PLAYING: 'playing',
  SOLVED: 'solved',
  FAILED: 'failed',
  TRANSITION: 'transition',
  COMPLETE: 'complete'
};

export function useGameState() {
  const [gameState, setGameState] = useState(GAME_STATES.INTRO);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [collectedShards, setCollectedShards] = useState([]);
  const [collectedRewards, setCollectedRewards] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [levelTimes, setLevelTimes] = useState([]);
  const [levelStartTime, setLevelStartTime] = useState(null);

  const level = LEVELS[currentLevel];

  const startGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
    setLevelStartTime(Date.now());
  }, []);

  const submitAnswer = useCallback((answer) => {
    setSelectedAnswer(answer);
    setAttempts(a => a + 1);
    
    if (answer === level.puzzle.answer) {
      setShowExplanation(true);
      setCollectedShards(prev => [...prev, level.puzzle.clue]);
      setCollectedRewards(prev => [...prev, level.reward]);
      const timeSpent = Math.round((Date.now() - levelStartTime) / 1000);
      setLevelTimes(prev => [...prev, timeSpent]);
      setGameState(GAME_STATES.SOLVED);
    } else {
      setGameState(GAME_STATES.FAILED);
    }
  }, [level, levelStartTime]);

  const nextLevel = useCallback(() => {
    if (currentLevel >= LEVELS.length - 1) {
      setGameState(GAME_STATES.COMPLETE);
    } else {
      setCurrentLevel(l => l + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setAttempts(0);
      setShowExplanation(false);
      setLevelStartTime(Date.now());
      setGameState(GAME_STATES.PLAYING);
    }
  }, [currentLevel]);

  const retryLevel = useCallback(() => {
    setSelectedAnswer(null);
    setShowHint(false);
    setGameState(GAME_STATES.PLAYING);
    setLevelStartTime(Date.now());
  }, []);

  const useHint = useCallback(() => {
    setHintsUsed(h => h + 1);
    setShowHint(true);
  }, []);

  const totalTime = Math.round((Date.now() - startTime) / 1000);

  return {
    gameState, level, currentLevel,
    collectedShards, collectedRewards,
    selectedAnswer, hintsUsed, showHint,
    attempts, showExplanation, totalTime, levelTimes,
    startGame, submitAnswer, nextLevel, retryLevel, useHint,
    totalLevels: LEVELS.length
  };
}
