# 🔗 Google Sheets Setup Guide
## Linking ECHO MIND to Google Sheets (10 minutes)

---

## STEP 1 — Create the Google Sheet

1. Go to **sheets.google.com** → click **+ Blank**
2. Name it: `ECHO MIND — Case Study Data`
3. Copy the URL — you'll need it later (but actually you don't, the script handles everything)

---

## STEP 2 — Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with a code editor
3. **Delete** everything in the editor (the default `myFunction` code)
4. **Copy everything** from `google-apps-script/Code.gs` in this project
5. **Paste** it into the editor
6. Click **Save** (💾 icon or Ctrl+S)
7. Name the project: `EchoMindTracker`

---

## STEP 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - Description: `Echo Mind Data Collector`
   - Execute as: **Me**
   - Who has access: **Anyone** ← important!
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → click **Allow**
6. You'll see a **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. **Copy that URL**

---

## STEP 4 — Add the URL to your React app

Create a file called `.env` in the root of `echo-mind-game/`:

```
VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID_HERE/exec
```

Replace `YOUR_ID_HERE` with your actual script ID from Step 3.

Then restart your dev server:
```bash
npm run dev
```

---

## STEP 5 — Test it

1. In Apps Script editor, select the `testWrite` function from the dropdown
2. Click **▶ Run**
3. Go back to your Google Sheet — you should see 3 new tabs with test data:
   - `Game Starts`
   - `Level Events`  
   - `Game Completions`

If you see the data → **it's working!** 🎉

---

## STEP 6 — Play the game and watch data appear live

Open your game at `http://localhost:5173`, enter a player name, and play.
Switch to your Google Sheet — rows appear within 1–2 seconds of each action.

---

## 📊 What Gets Tracked

### `Game Starts` sheet
| Timestamp | Player Name | Date | Time |
|-----------|-------------|------|------|
| 2026-05-02T... | Sara | 2026-05-02 | 14:32:11 |

### `Level Events` sheet
| Timestamp | Player Name | Level ID | Level Title | Puzzle Type | Solved | Attempts | Hints Used | Time (s) |
|-----------|-------------|----------|-------------|-------------|--------|----------|------------|----------|
| ... | Sara | 1 | The First Echo | sequence | YES | 1 | 0 | 34 |
| ... | Sara | 2 | The Logic Vault | logic | NO | 2 | 1 | 67 |

### `Game Completions` sheet
| Timestamp | Player Name | Total Time (s) | Total Time (mm:ss) | Total Hints | Total Attempts | Cognition Rating |
|-----------|-------------|---------------|-------------------|-------------|----------------|-----------------|
| ... | Sara | 487 | 8:07 | 2 | 9 | SHARP |

---

## 🔄 If you redeploy (after code changes)

Apps Script doesn't auto-update. After editing Code.gs:
1. Click **Deploy → Manage deployments**
2. Click the ✏️ edit pencil
3. Change version to **"New version"**
4. Click **Deploy**
5. The URL stays the same — no need to update `.env`

---

## ⚠️ Troubleshooting

**Data not appearing?**
- Check browser console for `[Sheets]` errors
- Make sure `.env` has the correct URL (no trailing slash)
- Make sure you deployed with "Anyone" access
- Re-run `testWrite` in Apps Script to confirm the sheet is working

**CORS error?**
- This shouldn't happen — the service uses `text/plain` to avoid preflight
- If it does, redeploy the Apps Script as a new version

**Quota exceeded?**
- Google allows ~20,000 writes/day on free accounts — more than enough for a class demo
