import { useState } from "react";

function SequencePuzzle({ puzzle }) {
  return (
    <div className="puzzle-visual sequence-puzzle">
      <div className="sequence-display">
        {puzzle.sequence.map((val, i) => (
          <div key={i} className={`seq-node ${val === '?' ? 'unknown' : ''}`}>
            <span>{val}</span>
            {i < puzzle.sequence.length - 1 && <div className="seq-arrow">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogicPuzzle({ puzzle }) {
  return (
    <div className="puzzle-visual logic-puzzle">
      {puzzle.entities.map((e, i) => (
        <div key={i} className="entity-card">
          <div className="entity-name">{e.name}</div>
          <div className="entity-statement">"{e.statement}"</div>
        </div>
      ))}
    </div>
  );
}

function CipherPuzzle({ puzzle }) {
  return (
    <div className="puzzle-visual cipher-puzzle">
      <div className="cipher-display">
        <div className="cipher-label">ENCODED MESSAGE:</div>
        <div className="cipher-text">H P E H U</div>
        <div className="cipher-hint-text">Caesar Cipher — shift = memory shards collected (2)</div>
        <div className="alphabet-ref">
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        </div>
      </div>
    </div>
  );
}

function SpatialPuzzle({ puzzle }) {
  const colors = { 'S': '#00ffcc', 'E': '#ff6b6b', '█': '#1a1a2e', '·': 'transparent' };
  return (
    <div className="puzzle-visual spatial-puzzle">
      <div className="grid-display">
        {puzzle.grid.map((row, ri) => (
          <div key={ri} className="grid-row">
            {row.map((cell, ci) => (
              <div key={ci} className={`grid-cell ${cell === '█' ? 'wall' : cell === 'S' ? 'start' : cell === 'E' ? 'end' : 'path'}`}>
                {cell !== '█' && cell !== '·' ? cell : cell === '·' ? '' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mirror-legend">
        <span className="legend-item start-legend">S = Start</span>
        <span className="legend-item end-legend">E = Exit</span>
        <span className="legend-item wall-legend">█ = Wall</span>
      </div>
    </div>
  );
}

function EvidencePuzzle({ puzzle }) {
  const [selected, setSelected] = useState([]);
  return (
    <div className="puzzle-visual evidence-puzzle">
      <div className="evidence-note">Select TWO fabricated items:</div>
      <div className="evidence-grid">
        {puzzle.items.map((item) => (
          <div key={item.id} className={`evidence-card ${selected.includes(item.id) ? 'selected' : ''}`}
            onClick={() => {
              setSelected(prev =>
                prev.includes(item.id)
                  ? prev.filter(x => x !== item.id)
                  : prev.length < 2 ? [...prev, item.id] : prev
              );
            }}>
            <div className="evidence-id">{item.id}</div>
            <div className="evidence-label">{item.label}</div>
            <div className="evidence-content">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationPuzzle({ puzzle }) {
  return (
    <div className="puzzle-visual integration-puzzle">
      <div className="shards-display">
        <div className="shards-title">COLLECTED MEMORY SHARDS:</div>
        {puzzle.clues.map((clue, i) => (
          <div key={i} className="shard-item">
            <span className="shard-icon">◈</span>
            <span className="shard-text">{clue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PuzzlePanel({ level, onSelect, selectedAnswer, disabled }) {
  const { puzzle } = level;

  const renderPuzzleVisual = () => {
    switch (puzzle.type) {
      case 'sequence': return <SequencePuzzle puzzle={puzzle} />;
      case 'logic': return <LogicPuzzle puzzle={puzzle} />;
      case 'cipher': return <CipherPuzzle puzzle={puzzle} />;
      case 'spatial': return <SpatialPuzzle puzzle={puzzle} />;
      case 'evidence': return <EvidencePuzzle puzzle={puzzle} />;
      case 'integration': return <IntegrationPuzzle puzzle={puzzle} />;
      default: return null;
    }
  };

  return (
    <div className="puzzle-panel">
      <div className="puzzle-type-badge">{puzzle.type.toUpperCase()} PUZZLE</div>
      <p className="puzzle-instruction">{puzzle.instruction}</p>
      {renderPuzzleVisual()}
      <p className="puzzle-question">{puzzle.question}</p>
      <div className="options-grid">
        {puzzle.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selectedAnswer === opt ? 'selected' : ''}`}
            onClick={() => !disabled && onSelect(opt)}
            disabled={disabled}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
