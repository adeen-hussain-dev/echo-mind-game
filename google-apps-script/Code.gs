// ═══════════════════════════════════════════════════════
// ECHO MIND — Google Apps Script
// Paste this entire file into your Apps Script editor
// ═══════════════════════════════════════════════════════

const SHEET_NAME_EVENTS   = 'Level Events';
const SHEET_NAME_COMPLETE = 'Game Completions';
const SHEET_NAME_STARTS   = 'Game Starts';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.event === 'game_start') {
      writeStart(ss, data);
    } else if (data.event === 'level_result') {
      writeLevelResult(ss, data);
    } else if (data.event === 'game_complete') {
      writeCompletion(ss, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function writeStart(ss, data) {
  const sheet = getOrCreateSheet(ss, SHEET_NAME_STARTS, [
    'Timestamp', 'Player Name', 'Date', 'Time'
  ]);
  const ts = new Date(data.timestamp);
  sheet.appendRow([
    data.timestamp,
    data.playerName,
    Utilities.formatDate(ts, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    Utilities.formatDate(ts, Session.getScriptTimeZone(), 'HH:mm:ss'),
  ]);
}

function writeLevelResult(ss, data) {
  const sheet = getOrCreateSheet(ss, SHEET_NAME_EVENTS, [
    'Timestamp', 'Player Name', 'Level ID', 'Level Title',
    'Puzzle Type', 'Solved', 'Attempts', 'Hints Used', 'Time (s)'
  ]);
  sheet.appendRow([
    data.timestamp,
    data.playerName,
    data.levelId,
    data.levelTitle,
    data.puzzleType,
    data.solved ? 'YES' : 'NO',
    data.attempts,
    data.hintsUsed,
    data.timeSeconds,
  ]);
}

function writeCompletion(ss, data) {
  const sheet = getOrCreateSheet(ss, SHEET_NAME_COMPLETE, [
    'Timestamp', 'Player Name', 'Total Time (s)', 'Total Time (mm:ss)',
    'Total Hints', 'Total Attempts', 'Cognition Rating'
  ]);
  const mins = Math.floor(data.totalTimeSeconds / 60);
  const secs = data.totalTimeSeconds % 60;
  const formatted = `${mins}:${String(secs).padStart(2, '0')}`;
  sheet.appendRow([
    data.timestamp,
    data.playerName,
    data.totalTimeSeconds,
    formatted,
    data.totalHints,
    data.totalAttempts,
    data.cognitionRating,
  ]);
}

// Creates the sheet with headers if it doesn't exist yet
function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    // Style header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#00ffcc');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ── TEST FUNCTION (run this manually to check it works) ──
function testWrite() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  writeStart(ss, { playerName: 'Test Player', timestamp: new Date().toISOString() });
  writeLevelResult(ss, {
    playerName: 'Test Player', levelId: 1, levelTitle: 'The First Echo',
    puzzleType: 'sequence', solved: true, attempts: 1, hintsUsed: 0,
    timeSeconds: 45, timestamp: new Date().toISOString()
  });
  writeCompletion(ss, {
    playerName: 'Test Player', totalTimeSeconds: 540, totalHints: 1,
    totalAttempts: 7, cognitionRating: 'SHARP', timestamp: new Date().toISOString()
  });
  Logger.log('Test rows written successfully!');
}
