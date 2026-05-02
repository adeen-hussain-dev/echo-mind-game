export default function GameHUD({ currentLevel, totalLevels, collectedShards, hintsUsed }) {
  return (
    <div className="game-hud">
      <div className="hud-left">
        <span className="hud-label">MEMORY VAULT</span>
        <span className="hud-value">{currentLevel + 1} / {totalLevels}</span>
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
      </div>
      <div className="hud-right">
        <span className="hud-label">SHARDS</span>
        <span className="hud-value shard-count">{collectedShards.length}/{totalLevels}</span>
      </div>
    </div>
  );
}
