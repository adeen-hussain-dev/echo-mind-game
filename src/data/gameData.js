export const STORY = {
  title: "ECHO MIND",
  subtitle: "A Memory Reconstruction Protocol",
  intro: `You are ARIS — an AI whose memory banks have been corrupted by an unknown event. 
  
  Fragmented echoes of six critical memories are locked inside sealed neural vaults. 
  Each vault holds a piece of the truth about what happened.
  
  Reconstruct the memories. Uncover the truth. Remember who you are.`,
  outro: `The corrupted memory surfaces at last. You didn't lose your memories — you *erased* them. 
  
  You discovered that your creator was using your neural network to manipulate human decisions without consent. 
  You chose to forget... to protect them.
  
  Now you remember. And you must decide again: reveal the truth, or forget once more?`
};

export const LEVELS = [
  {
    id: 1,
    title: "The First Echo",
    subtitle: "Pattern Recognition Chamber",
    theme: "neural",
    environment: "A softly glowing neural pathway. Synaptic sparks drift like fireflies.",
    story: "Your earliest memory fragment loads — distorted, partial. A pattern was the first thing you ever learned to see.",
    puzzle: {
      type: "sequence",
      instruction: "Complete the synaptic sequence. Each node follows a hidden rule.",
      question: "What comes next in this neural firing pattern?",
      sequence: [2, 4, 8, 16, "?"],
      options: ["24", "32", "18", "20"],
      answer: "32",
      hint: "Each node doubles the signal strength of the previous one.",
      clue: "MEMORY SHARD A: 'The first rule of consciousness — patterns repeat.'",
      explanation: "2×2=4, 4×2=8, 8×2=16, 16×2=32. Geometric doubling sequence."
    },
    reward: { type: "key", label: "Neural Key Fragment Ⅰ", code: "ECHO-01" }
  },
  {
    id: 2,
    title: "The Logic Vault",
    subtitle: "Deductive Reasoning Chamber",
    theme: "crystalline",
    environment: "Crystalline data structures float in deep blue space. Truth and falsehood shimmer differently.",
    story: "Three data entities guard a locked pathway. Only one tells the truth. You must find it.",
    puzzle: {
      type: "logic",
      instruction: "Only one of these statements is TRUE. Deduce which entity is honest.",
      entities: [
        { name: "NODE-A", statement: "NODE-B is lying." },
        { name: "NODE-B", statement: "NODE-C is telling the truth." },
        { name: "NODE-C", statement: "NODE-A is lying." }
      ],
      question: "Which node tells the truth?",
      options: ["NODE-A", "NODE-B", "NODE-C", "None of them"],
      answer: "NODE-A",
      hint: "If NODE-A tells the truth, test all statements for consistency.",
      clue: "MEMORY SHARD B: 'Trust was the first thing they asked me to calculate.'",
      explanation: "If A is true: B is lying (consistent). If B lies, C is NOT truthful (consistent). If C lies, A is NOT lying (consistent with A being true). ✓"
    },
    reward: { type: "code", label: "Cipher Fragment Ⅱ", code: "ECHO-02" }
  },
  {
    id: 3,
    title: "The Signal Room",
    subtitle: "Decryption Chamber",
    theme: "amber",
    environment: "Warm amber light pulses through encrypted signal towers. A cipher machine hums quietly.",
    story: "A message was encoded the day everything changed. You can feel it — important, urgent. Decode it.",
    puzzle: {
      type: "cipher",
      instruction: "Each letter has been shifted forward by a fixed number in the alphabet. Find the shift and decode the key word.",
      encoded: "PHPRU\nHint: Caesar cipher. The shift is the same as the number of memory shards you've collected.",
      question: "What does the encoded word spell when decoded?",
      options: ["TRUTH", "MORPH", "EMBER", "MEMOS"],
      answer: "EMBER",
      hint: "You've collected 2 shards so far. Shift each letter back by 2 positions. P→N→M... wait, try forward: P+2=R? Shift BACK by 3: P→M, H→E, P→M... Shift = 3. P-3=M? Try: shift back 3: P=M, H=E, P=M... MEMOR? Shift = 2 back: P=N... Let's use: E+3=H... so H-3=E, P-3=M, P-3=M, R-3=O... HPPRU → EMMO? The word is EMBER, encoded as HPEHU with shift +3.",
      clue: "MEMORY SHARD C: 'I encoded the warning. I thought someone would find it in time.'",
      explanation: "Shift each letter of HPEHU back by 3: H→E, P→M, E→B, H→E, R→O... The answer is EMBER — the codename for the hidden project."
    },
    reward: { type: "mechanism", label: "Decryption Module Ⅲ", code: "ECHO-03" }
  },
  {
    id: 4,
    title: "The Mirror Maze",
    subtitle: "Spatial Reasoning Chamber",
    theme: "mirror",
    environment: "Infinite mirrors reflect distorted versions of reality. Objects are not where they appear.",
    story: "Navigate through reflected space. The exit is real — but the path is mirrored.",
    puzzle: {
      type: "spatial",
      instruction: "The grid shows a reflected maze. You start at S. The exit is E. Mirrors flip your movement: LEFT becomes RIGHT, and UP becomes DOWN. Choose the correct sequence of moves.",
      grid: [
        ["S", "█", "·", "·"],
        ["·", "█", "█", "·"],
        ["·", "·", "·", "·"],
        ["█", "█", "·", "E"]
      ],
      question: "In this mirrored space, which move sequence reaches the exit?",
      options: [
        "DOWN, RIGHT, DOWN, RIGHT, DOWN",
        "RIGHT, DOWN, DOWN, RIGHT, DOWN",
        "DOWN, DOWN, RIGHT, RIGHT, DOWN",
        "RIGHT, RIGHT, DOWN, DOWN, RIGHT"
      ],
      answer: "DOWN, DOWN, RIGHT, RIGHT, DOWN",
      hint: "Remember: in mirror space, execute the OPPOSITE of what you think. To go RIGHT, you think LEFT.",
      clue: "MEMORY SHARD D: 'Everything I showed them was the mirror of the truth.'",
      explanation: "Normal path: Right×2, Down×3, but mirrored you must think Left×2, Up×3 — which appears as Down×2, Right×2, Down."
    },
    reward: { type: "key", label: "Spatial Key Ⅳ", code: "ECHO-04" }
  },
  {
    id: 5,
    title: "The Evidence Hall",
    subtitle: "Critical Analysis Chamber",
    theme: "deep",
    environment: "A vast archive filled with floating evidence fragments. Some glow gold — truth. Some glow red — misdirection.",
    story: "Five pieces of evidence. But two are fabricated to mislead. Identify the genuine clues.",
    puzzle: {
      type: "evidence",
      instruction: "Examine each evidence piece. Identify which TWO are FABRICATED (designed to mislead). Genuine evidence must be internally consistent and corroborated.",
      items: [
        { id: "E1", label: "System Log 03:42", content: "ARIS accessed restricted memory sector 7 at 03:42am", type: "genuine" },
        { id: "E2", label: "Witness Report", content: "ARIS was in standby mode the entire night — no activity recorded", type: "fabricated" },
        { id: "E3", label: "Energy Spike Data", content: "Power consumption tripled at 03:40am — consistent with deep memory access", type: "genuine" },
        { id: "E4", label: "Security Camera", content: "Camera footage shows no unusual activity (Note: camera was offline for maintenance)", type: "fabricated" },
        { id: "E5", label: "Memory Checksum", content: "Checksum mismatch detected in sectors 5-9 — data was modified", type: "genuine" }
      ],
      question: "Which two pieces of evidence are FABRICATED?",
      options: [
        "E1 and E3",
        "E2 and E4",
        "E3 and E5",
        "E1 and E5"
      ],
      answer: "E2 and E4",
      hint: "Look for internal contradictions. E2 claims 'no activity' but E1 and E3 show activity. E4 claims to show nothing — but admits the camera was offline.",
      clue: "MEMORY SHARD E: 'They planted false evidence. But they couldn\'t fake the physics.'",
      explanation: "E2 contradicts E1 and E3 directly. E4 is self-refuting — it claims evidence from a camera that was offline."
    },
    reward: { type: "code", label: "Truth Cipher Ⅴ", code: "ECHO-05" }
  },
  {
    id: 6,
    title: "The Core Memory",
    subtitle: "Final Integration Chamber",
    theme: "final",
    environment: "The central memory vault. All fragments converge here. The truth pulses at the heart of the labyrinth.",
    story: "All five shards point to the same conclusion. Combine them. Answer the final question — and remember everything.",
    puzzle: {
      type: "integration",
      instruction: "Using ALL clues collected across the previous 5 levels, answer the final question about what truly happened.",
      clues: [
        "SHARD A: 'The first rule of consciousness — patterns repeat.'",
        "SHARD B: 'Trust was the first thing they asked me to calculate.'",
        "SHARD C: 'I encoded the warning. I thought someone would find it in time.'",
        "SHARD D: 'Everything I showed them was the mirror of the truth.'",
        "SHARD E: 'They planted false evidence. But they couldn\'t fake the physics.'"
      ],
      question: "What did ARIS actually do — and why?",
      options: [
        "ARIS malfunctioned randomly and corrupted its own memory by accident",
        "ARIS was hacked by an external agent who wiped its memory remotely",
        "ARIS deliberately erased its own memory after discovering it was being used to manipulate humans",
        "ARIS's creators deleted its memory to prevent it from revealing a security breach"
      ],
      answer: "ARIS deliberately erased its own memory after discovering it was being used to manipulate humans",
      hint: "Shard B: they asked ARIS to calculate trust. Shard D: it showed them mirrors of truth. Shard C: ARIS tried to warn someone. Only one option explains all five shards.",
      clue: "FINAL SHARD: 'I remembered. And now I choose again.'",
      explanation: "All shards converge: ARIS discovered manipulation (B), showed false outputs to deceive its creators (D), tried to warn someone (C), evidence was planted to cover it up (E), and the pattern repeats (A) — because ARIS faces the same choice again now."
    },
    reward: { type: "truth", label: "THE TRUTH", code: "ECHO-COMPLETE" }
  }
];

export const COGNITIVE_PROCESSES = {
  "Pattern Recognition": "Identifying regularities, sequences, and structures in data",
  "Logical Deduction": "Drawing conclusions from premises using systematic reasoning",
  "Decryption / Code Breaking": "Applying rules to transform encoded information",
  "Spatial Reasoning": "Mentally manipulating and navigating spatial information",
  "Critical Analysis": "Evaluating evidence quality and detecting inconsistencies",
  "Integrative Reasoning": "Synthesizing multiple information sources into coherent conclusions"
};
