import { useState } from 'react';

export default function PlayerModal({ onConfirm }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) { setError('Enter your name to continue.'); return; }
    if (trimmed.length < 2) { setError('Name must be at least 2 characters.'); return; }
    onConfirm(trimmed);
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-icon">◈</div>
          <h2 className="modal-title">IDENTIFY OPERATOR</h2>
          <p className="modal-sub">Before reconstruction begins, ARIS must log the operator's identity for case study records.</p>
        </div>

        <div className="modal-body">
          <label className="modal-label" htmlFor="player-name">OPERATOR NAME</label>
          <input
            id="player-name"
            className={`modal-input ${error ? 'input-error' : ''}`}
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            onKeyDown={handleKey}
            autoFocus
            maxLength={40}
          />
          {error && <span className="modal-error">{error}</span>}
        </div>

        <button className="btn-primary modal-btn" onClick={handleSubmit}>
          CONFIRM IDENTITY ▸
        </button>

        <p className="modal-disclaimer">
          ◈ This data is collected anonymously for cognitive psychology research purposes only.
        </p>
      </div>
    </div>
  );
}
