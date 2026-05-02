// ─────────────────────────────────────────────
// PASTE YOUR APPS SCRIPT WEB APP URL HERE
// (instructions in README_SHEETS.md)
// ─────────────────────────────────────────────
const SHEET_URL = import.meta.env.VITE_SHEETS_URL || '';

function post(payload) {
  if (!SHEET_URL) {
    console.warn('[Sheets] No URL set. Data not sent:', payload);
    return Promise.resolve();
  }
  return fetch(SHEET_URL, {
    method: 'POST',
    // Apps Script requires text/plain to avoid CORS preflight
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  }).catch(err => console.error('[Sheets] Failed:', err));
}

/** Called when player starts the game */
export function trackGameStart(playerName) {
  return post({
    event: 'game_start',
    playerName,
    timestamp: new Date().toISOString(),
  });
}

/** Called when a level is solved or failed */
export function trackLevelResult(playerName, levelData) {
  return post({
    event: 'level_result',
    playerName,
    levelId: levelData.levelId,
    levelTitle: levelData.levelTitle,
    puzzleType: levelData.puzzleType,
    solved: levelData.solved,
    attempts: levelData.attempts,
    hintsUsed: levelData.hintsUsed,
    timeSeconds: levelData.timeSeconds,
    timestamp: new Date().toISOString(),
  });
}

/** Called when the full game is completed */
export function trackGameComplete(playerName, stats) {
  return post({
    event: 'game_complete',
    playerName,
    totalTimeSeconds: stats.totalTimeSeconds,
    totalHints: stats.totalHints,
    totalAttempts: stats.totalAttempts,
    cognitionRating: stats.cognitionRating,
    timestamp: new Date().toISOString(),
  });
}
