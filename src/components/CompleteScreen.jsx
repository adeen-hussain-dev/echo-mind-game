import { STORY, COGNITIVE_PROCESSES, LEVELS } from "../data/gameData";

export default function CompleteScreen({ playerName, collectedShards, collectedRewards, totalTime, hintsUsed, levelTimes, levelAttempts }) {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const rating = hintsUsed === 0 ? 'PURE' : hintsUsed < 3 ? 'SHARP' : 'AIDED';

  return (
    <div className="complete-screen">
      <div className="complete-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="complete-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      <div className="complete-content">
        <div className="complete-icon">◈</div>

        <div className="complete-player-greeting">
          <span className="greeting-label">OPERATOR</span>
          <span className="greeting-name">{playerName}</span>
          <span className="greeting-tag">— RECONSTRUCTION COMPLETE</span>
        </div>

        <h1 className="complete-title">MEMORY FULLY RECONSTRUCTED</h1>

        <div className="revelation-box">
          <div className="rev-label">THE TRUTH:</div>
          <p className="rev-text">{STORY.outro}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{minutes}:{String(seconds).padStart(2, '0')}</div>
            <div className="stat-label">Total Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{collectedShards.length}/6</div>
            <div className="stat-label">Shards Recovered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{hintsUsed}</div>
            <div className="stat-label">Hints Used</div>
          </div>
          <div className="stat-card">
            <div className={`stat-value rating-${rating.toLowerCase()}`}>{rating}</div>
            <div className="stat-label">Cognition Rating</div>
          </div>
        </div>

        {/* Per-level breakdown */}
        {levelTimes.length > 0 && (
          <div className="level-breakdown">
            <div className="breakdown-title">PER-VAULT PERFORMANCE:</div>
            <div className="breakdown-table">
              <div className="bt-header">
                <span>Vault</span><span>Puzzle Type</span><span>Time</span><span>Attempts</span>
              </div>
              {LEVELS.map((l, i) => (
                <div key={i} className="bt-row">
                  <span className="bt-vault">{String(i + 1).padStart(2, '0')} {l.title}</span>
                  <span className="bt-type">{l.puzzle.type}</span>
                  <span className="bt-time">{levelTimes[i] != null ? `${levelTimes[i]}s` : '—'}</span>
                  <span className="bt-attempts">{levelAttempts[i] != null ? `×${levelAttempts[i]}` : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cognitive-breakdown">
          <div className="breakdown-title">COGNITIVE PROCESSES ENGAGED:</div>
          <div className="process-list">
            {Object.entries(COGNITIVE_PROCESSES).map(([name, desc]) => (
              <div key={name} className="process-item">
                <span className="process-check">✓</span>
                <div>
                  <div className="process-name">{name}</div>
                  <div className="process-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-note">
          <div className="project-label">◈ ECHO MIND — Cognitive Psychology Final Project</div>
          <div className="project-sub">Demonstrating: Problem Solving · Logical Reasoning · Pattern Recognition · Decision Making</div>
        </div>

        <button className="btn-primary" onClick={() => window.location.reload()}>
          ↺ RESTART PROTOCOL
        </button>
      </div>
    </div>
  );
}
