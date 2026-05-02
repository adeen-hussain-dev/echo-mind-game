import { useState, useEffect } from "react";
import { STORY } from "../data/gameData";

export default function IntroScreen({ onStart }) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const fullText = STORY.intro;

  useEffect(() => {
    if (phase === 1) {
      let i = 0;
      const timer = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(timer);
      }, 18);
      return () => clearInterval(timer);
    }
  }, [phase, fullText]);

  return (
    <div className="intro-screen">
      <div className="intro-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
      </div>

      {phase === 0 && (
        <div className="intro-title-phase">
          <div className="glitch-wrapper">
            <h1 className="game-title" data-text="ECHO MIND">ECHO MIND</h1>
          </div>
          <p className="game-subtitle">{STORY.subtitle}</p>
          <div className="boot-sequence">
            <span className="boot-line">▸ ARIS NEURAL SYSTEM v4.2.1</span>
            <span className="boot-line delay-1">▸ Memory corruption detected...</span>
            <span className="boot-line delay-2">▸ Initiating reconstruction protocol...</span>
            <span className="boot-line delay-3 warning">▸ WARNING: 6 memory vaults sealed</span>
          </div>
          <button className="btn-primary" onClick={() => setPhase(1)}>
            INITIALIZE SYSTEM
          </button>
        </div>
      )}

      {phase === 1 && (
        <div className="intro-story-phase">
          <div className="terminal-box">
            <div className="terminal-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">ARIS_RECONSTRUCTION.exe</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-text">{typed}<span className="cursor">█</span></p>
            </div>
          </div>
          {typed.length >= fullText.length && (
            <div className="intro-actions">
              <div className="mission-brief">
                <span className="mission-label">MISSION</span>
                <span className="mission-text">Solve 6 cognitive puzzles → Reconstruct memory → Uncover the truth</span>
              </div>
              <button className="btn-primary pulse" onClick={onStart}>
                BEGIN RECONSTRUCTION ▸
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
