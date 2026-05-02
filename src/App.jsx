import { useState } from 'react';
import { useGameState, GAME_STATES } from './hooks/useGameState';
import IntroScreen from './components/IntroScreen';
import PlayerModal from './components/PlayerModal';
import LevelScreen from './components/LevelScreen';
import { SolvedScreen, FailedScreen } from './components/ResultScreens';
import CompleteScreen from './components/CompleteScreen';
import GameHUD from './components/GameHUD';
import './styles.css';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const {
    gameState, playerName, level, currentLevel, totalLevels,
    collectedShards, collectedRewards,
    selectedAnswer, hintsUsed, showHint,
    attempts, totalTime, levelTimes, levelAttempts,
    startGame, submitAnswer, nextLevel, retryLevel, useHint
  } = useGameState();

  const isLast = currentLevel === totalLevels - 1;

  // IntroScreen calls this → show modal first
  function handleIntroComplete() {
    setShowModal(true);
  }

  // Modal confirmed → actually start game with name
  function handleModalConfirm(name) {
    setShowModal(false);
    startGame(name);
  }

  return (
    <div className="app">
      <div className="scanline" />

      {/* Player name modal */}
      {showModal && <PlayerModal onConfirm={handleModalConfirm} />}

      {gameState !== GAME_STATES.INTRO && gameState !== GAME_STATES.COMPLETE && (
        <GameHUD
          currentLevel={currentLevel}
          totalLevels={totalLevels}
          collectedShards={collectedShards}
          hintsUsed={hintsUsed}
          playerName={playerName}
        />
      )}

      <div className="screen-container">
        {gameState === GAME_STATES.INTRO && (
          <IntroScreen onStart={handleIntroComplete} />
        )}

        {gameState === GAME_STATES.PLAYING && level && (
          <LevelScreen
            level={level}
            currentLevel={currentLevel}
            onSubmit={submitAnswer}
            onHint={useHint}
            showHint={showHint}
            selectedAnswer={selectedAnswer}
            attempts={attempts}
          />
        )}

        {gameState === GAME_STATES.SOLVED && level && (
          <SolvedScreen
            level={level}
            onNext={nextLevel}
            isLast={isLast}
          />
        )}

        {gameState === GAME_STATES.FAILED && level && (
          <FailedScreen
            level={level}
            onRetry={retryLevel}
          />
        )}

        {gameState === GAME_STATES.COMPLETE && (
          <CompleteScreen
            playerName={playerName}
            collectedShards={collectedShards}
            collectedRewards={collectedRewards}
            totalTime={totalTime}
            hintsUsed={hintsUsed}
            levelTimes={levelTimes}
            levelAttempts={levelAttempts}
          />
        )}
      </div>
    </div>
  );
}
