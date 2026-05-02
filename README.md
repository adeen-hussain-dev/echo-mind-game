# ECHO MIND — Memory Reconstruction Protocol
### Cognitive Psychology Final Project Game

---

## 📁 FILE STRUCTURE

```
echo-mind-game/
│
├── index.html                    # App entry point
├── package.json                  # Dependencies (React + Vite)
├── vite.config.js                # Vite bundler config
│
└── src/
    ├── main.jsx                  # React root mount
    ├── App.jsx                   # Main app — state routing between screens
    ├── styles.css                # All styles (CSS variables, animations, themes)
    │
    ├── data/
    │   └── gameData.js           # All level data, puzzles, story, answers
    │
    ├── hooks/
    │   └── useGameState.js       # Game state logic (currentLevel, answers, shards)
    │
    └── components/
        ├── IntroScreen.jsx       # Animated intro with typewriter effect
        ├── GameHUD.jsx           # Fixed top bar (level, progress, shards)
        ├── LevelScreen.jsx       # Level wrapper (story + puzzle + hint)
        ├── PuzzlePanel.jsx       # Renders all 6 puzzle types
        ├── ResultScreens.jsx     # Solved + Failed states
        └── CompleteScreen.jsx    # Final screen with stats + cognitive breakdown
```

---

## 🚀 SETUP & RUN

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 🎮 GAME: ECHO MIND

**Genre:** Mystery + Puzzle + Escape Room  
**Levels:** 6 Vaults  
**Estimated playtime:** 10–15 minutes  
**Platform:** Web (React + Vite, runs in any browser)

### Story
You are ARIS — an AI whose memory banks have been corrupted. Six sealed neural vaults hold fragmented memories. Solve cognitive puzzles to reconstruct them and uncover the truth about what you chose to forget — and why.

### The 6 Levels

| Vault | Title | Puzzle Type | Cognitive Process |
|-------|-------|-------------|-------------------|
| 01 | The First Echo | Sequence Completion | Pattern Recognition |
| 02 | The Logic Vault | Entity Logic Puzzle | Logical Deduction |
| 03 | The Signal Room | Caesar Cipher | Decryption / Code Breaking |
| 04 | The Mirror Maze | Spatial Navigation | Spatial Reasoning |
| 05 | The Evidence Hall | Evidence Analysis | Critical Analysis |
| 06 | The Core Memory | Multi-clue Integration | Integrative Reasoning |

---

## 🧠 COGNITIVE PSYCHOLOGY ALIGNMENT

This game directly demonstrates all required cognitive processes:

- **Problem Solving** — Every level requires applying logical steps to reach a solution
- **Pattern Recognition** — Level 1 (sequence), Level 3 (cipher patterns)
- **Logical Reasoning** — Level 2 (deductive logic with entities), Level 6 (multi-clue integration)
- **Decision Making** — Level 5 (evaluating evidence quality and choosing)
- **Critical Thinking** — Misleading clues in Levels 4 and 5 require rejecting false assumptions

All puzzles are designed so every solution is **logically reachable through evidence** — no random guessing required.

---

## 📋 PROJECT BRIEF ALIGNMENT

| Brief Requirement | Implementation |
|------------------|----------------|
| Cognitive Processes documented | `gameData.js → COGNITIVE_PROCESSES` + CompleteScreen |
| Game Design with instructions | Each level has instruction, visual, options |
| Rationale (game ↔ cognitive process) | Level subtitle + type badge + explanation on solve |
| Increasing difficulty (L1→L8) | Tutorial-style L1, multi-step L3-4, misleading L5, integrative L6 |
| Evidence system | Level 5 has interactive evidence cards to select |
| 6-8 levels | 6 vaults |
| 10-15 min gameplay | Estimated 10-13 minutes |
| Clue discovery + hints | Hint system on every level |

---

## ✍️ FOR YOUR WRITE-UP

**Cognitive Process Selected:** Problem Solving (with sub-processes: pattern recognition, logical deduction, spatial reasoning, critical analysis)

**How the game tests it:**
- Levels present novel problems requiring analysis, not memorization
- Misleading clues in Levels 4–5 demand critical evaluation
- Level 6 requires synthesizing all previous information — mirroring real-world problem solving

**Supporting Research to include:**
1. Newell & Simon (1972) — *Human Problem Solving* — foundational model of problem solving as search through problem space (directly applicable to puzzle navigation)
2. Tversky & Kahneman (1974) — *Judgment under Uncertainty* — explains why misleading evidence (Levels 4-5) is cognitively challenging
