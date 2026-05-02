export default function GameHUD({ currentLevel, totalLevels, collectedShards, hintsUsed, playerName }) {
  return (
    <div className="game-hud">
      <div className="hud-left">
        <span className="hud-label">OPERATOR</span>
        <span className="hud-value hud-name">{playerName || '—'}</span>
      </div>
      <div className="hud-center">
        <div className="progress-nodes">
          {[...Array(totalLevels)].map((_, i) => (
            <div
              key={i}
              className={`progress-node ${i < currentLevel ? 'done' : i === currentLevel ? 'active' : ''}`}
            />
          ))}
        </div>
        <span className="hud-vault-label">VAULT {String(currentLevel + 1).padStart(2,'0')} / {totalLevels}</span>
      </div>
      <div className="hud-right">
        <span className="hud-label">SHARDS</span>
        <span className="hud-value shard-count">{collectedShards.length}/{totalLevels}</span>
      </div>
    </div>
  );
}
