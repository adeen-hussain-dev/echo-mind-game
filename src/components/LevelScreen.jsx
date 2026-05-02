import PuzzlePanel from "./PuzzlePanel";

export default function LevelScreen({ level, currentLevel, onSubmit, onHint, showHint, selectedAnswer, attempts }) {
  return (
    <div className={`level-screen theme-${level.theme}`}>
      <div className="level-env-text">{level.environment}</div>

      <div className="level-header">
        <div className="level-number">VAULT {String(currentLevel + 1).padStart(2, '0')}</div>
        <h2 className="level-title">{level.title}</h2>
        <div className="level-subtitle">{level.subtitle}</div>
      </div>

      <div className="level-story">
        <span className="story-icon">◈</span>
        <p>{level.story}</p>
      </div>

      <PuzzlePanel
        level={level}
        onSelect={onSubmit}
        selectedAnswer={selectedAnswer}
        disabled={false}
      />

      <div className="level-actions">
        {!showHint && (
          <button className="btn-hint" onClick={onHint}>
            ▸ REQUEST HINT {attempts > 0 ? `(${attempts} attempt${attempts > 1 ? 's' : ''})` : ''}
          </button>
        )}
        {showHint && (
          <div className="hint-box">
            <span className="hint-label">HINT:</span>
            <span className="hint-text">{level.puzzle.hint}</span>
          </div>
        )}
      </div>
    </div>
  );
}
