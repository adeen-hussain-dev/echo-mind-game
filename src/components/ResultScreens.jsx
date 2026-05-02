export function SolvedScreen({ level, onNext, isLast }) {
  return (
    <div className="result-screen solved-screen">
      <div className="result-icon success">✓</div>
      <h2 className="result-title">MEMORY RECONSTRUCTED</h2>

      <div className="explanation-box">
        <div className="exp-label">COGNITIVE ANALYSIS:</div>
        <p className="exp-text">{level.puzzle.explanation}</p>
      </div>

      <div className="clue-unlocked">
        <div className="clue-label">◈ MEMORY SHARD RECOVERED:</div>
        <p className="clue-text">{level.puzzle.clue}</p>
      </div>

      <div className="reward-box">
        <div className="reward-label">VAULT UNLOCKED WITH:</div>
        <div className="reward-item">
          <span className="reward-icon">{level.reward.type === 'key' ? '🔑' : level.reward.type === 'code' ? '🔢' : level.reward.type === 'truth' ? '◈' : '⚙'}</span>
          <span className="reward-name">{level.reward.label}</span>
          <span className="reward-code">[{level.reward.code}]</span>
        </div>
      </div>

      <button className="btn-primary" onClick={onNext}>
        {isLast ? 'VIEW FINAL TRUTH ▸' : 'ENTER NEXT VAULT ▸'}
      </button>
    </div>
  );
}

export function FailedScreen({ level, onRetry }) {
  return (
    <div className="result-screen failed-screen">
      <div className="result-icon fail">✗</div>
      <h2 className="result-title">MEMORY FRAGMENT CORRUPTED</h2>
      <p className="fail-message">Incorrect reconstruction. The neural pathway collapsed.</p>
      <p className="fail-sub">Re-examine the evidence and try again.</p>

      <div className="wrong-answer-hint">
        <span className="hint-label">SYSTEM TIP:</span>
        <span>Use the hint system if you need assistance — logic, not guessing, is the path forward.</span>
      </div>

      <button className="btn-primary retry" onClick={onRetry}>
        ↺ RETRY RECONSTRUCTION
      </button>
    </div>
  );
}
