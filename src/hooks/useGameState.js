import { useState, useCallback, useRef } from 'react';
import { LEVELS } from '../data/gameData';
import { trackGameStart, trackLevelResult, trackGameComplete } from '../services/sheetsService';

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
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [collectedShards, setCollectedShards] = useState([]);
  const [collectedRewards, setCollectedRewards] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [levelHints, setLevelHints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [levelTimes, setLevelTimes] = useState([]);
  const [levelAttempts, setLevelAttempts] = useState([]);
  const [levelStartTime, setLevelStartTime] = useState(null);
  const totalAttemptsRef = useRef(0);

  const level = LEVELS[currentLevel];

  const startGame = useCallback((name) => {
    setPlayerName(name);
    trackGameStart(name);
    setGameState(GAME_STATES.PLAYING);
    setLevelStartTime(Date.now());
  }, []);

  const submitAnswer = useCallback((answer) => {
    setSelectedAnswer(answer);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    totalAttemptsRef.current += 1;

    const timeSpent = Math.round((Date.now() - levelStartTime) / 1000);
    const solved = answer === level.puzzle.answer;

    trackLevelResult(playerName, {
      levelId: level.id,
      levelTitle: level.title,
      puzzleType: level.puzzle.type,
      solved,
      attempts: newAttempts,
      hintsUsed: levelHints,
      timeSeconds: timeSpent,
    });

    if (solved) {
      setShowExplanation(true);
      setCollectedShards(prev => [...prev, level.puzzle.clue]);
      setCollectedRewards(prev => [...prev, level.reward]);
      setLevelTimes(prev => [...prev, timeSpent]);
      setLevelAttempts(prev => [...prev, newAttempts]);
      setGameState(GAME_STATES.SOLVED);
    } else {
      setGameState(GAME_STATES.FAILED);
    }
  }, [level, levelStartTime, attempts, levelHints, playerName]);

  const nextLevel = useCallback(() => {
    if (currentLevel >= LEVELS.length - 1) {
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      const rating = hintsUsed === 0 ? 'PURE' : hintsUsed < 3 ? 'SHARP' : 'AIDED';
      trackGameComplete(playerName, {
        totalTimeSeconds: totalTime,
        totalHints: hintsUsed,
        totalAttempts: totalAttemptsRef.current,
        cognitionRating: rating,
      });
      setGameState(GAME_STATES.COMPLETE);
    } else {
      setCurrentLevel(l => l + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setLevelHints(0);
      setAttempts(0);
      setShowExplanation(false);
      setLevelStartTime(Date.now());
      setGameState(GAME_STATES.PLAYING);
    }
  }, [currentLevel, hintsUsed, playerName, startTime]);

  const retryLevel = useCallback(() => {
    setSelectedAnswer(null);
    setShowHint(false);
    setGameState(GAME_STATES.PLAYING);
    setLevelStartTime(Date.now());
  }, []);

  const useHint = useCallback(() => {
    setHintsUsed(h => h + 1);
    setLevelHints(h => h + 1);
    setShowHint(true);
  }, []);

  const totalTime = Math.round((Date.now() - startTime) / 1000);

  return {
    gameState, playerName, level, currentLevel,
    collectedShards, collectedRewards,
    selectedAnswer, hintsUsed, showHint,
    attempts, showExplanation, totalTime, levelTimes, levelAttempts,
    startGame, submitAnswer, nextLevel, retryLevel, useHint,
    totalLevels: LEVELS.length
  };
}
