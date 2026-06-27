# JS Learnings — Website Plan

## Goal

Convert this repo of plain JS files into a deployed, interactive learning site where every topic is a live-editable code page. Dark theme, progress tracking, accessible via a public URL.

---

## What It Will Look Like

```
┌──────────────────────────────────────────────────────┐
│ ▌ JS Learnings                      ⚡ 4/50 done     │
├──────────────────┬───────────────────────────────────┤
│ FUNDAMENTALS     │  Closures                         │
│  Variables    ✓  │                                   │
│  Functions    ✓  │  A closure is a function that     │
│  Closures    ←   │  remembers its outer scope even   │
│  Async           │  after the outer function exits.  │
│                  │                                   │
│ DATA STRUCTURES  │  ╔══ Try it ══════════════════╗   │
│  Arrays          │  ║ function outer() {         ║   │
│  Linked List     │  ║   let msg = 'hello'        ║   │
│                  │  ║   return () => {            ║   │
│ ALGORITHMS       │  ║     console.log(msg)       ║   │
│  Sliding Window  │  ║   }                        ║   │
│  Two Pointers    │  ║ }                          ║   │
│  Recursion       │  ╚════════════════════════════╝   │
│                  │  [▶ RUN]   > hello                │
│ ░░░▓▓▓▓▓▓▓▓▓▓▓  │  [✓ Mark Done]                    │
└──────────────────┴───────────────────────────────────┘
```

---

## Tech Stack

| Layer        | Choice           | Why                                              |
|--------------|------------------|--------------------------------------------------|
| Framework    | Docusaurus v3    | MDX support, sidebar auto-gen, dark theme built-in |
| Live editor  | `@docusaurus/theme-live-codeblock` | Runs JS in browser, no backend needed |
| Styling      | Custom dark CSS  | Override Docusaurus defaults with hacker theme   |
| Progress     | localStorage     | No login needed, persists across sessions        |
| Hosting      | Vercel           | Free, auto-deploys on every `git push`           |

---

## How New Files Get Picked Up Automatically

You write a JS file as always. The site picks it up on the next deploy — no MDX files to maintain.

A small Docusaurus source plugin (~50 lines) will:
1. Scan `01-fundamentals/**/*.js`, `02-data-structures/**/*.js`, `03-algorithms/**/*.js` at build time
2. Auto-generate a page per file — title from filename, code from file contents
3. Auto-update the sidebar with the correct section and order

**Optional description:** Add a comment block at the top of any JS file to show explanatory text above the code:

```js
// DESCRIPTION: Find three numbers in an array that sum to zero.
// Uses the two-pointer technique after sorting the array.

function threeSum(nums) { ... }
```

If no `DESCRIPTION` comment exists, the page just shows the code.

---

## Your Workflow After Setup

```bash
# 1. Write a new JS file as always
touch 03-algorithms/two-pointers/three-sum.js

# 2. Write your code (optionally add DESCRIPTION comment at top)

# 3. Commit and push
git add . && git commit -m "Add three-sum" && git push

# 4. Vercel auto-deploys → new page appears on the site within ~1 min
```

That's it. No MDX, no sidebar config, no manual steps.

---

## Progress Tracking

- Each page has a **Mark Done** button
- Clicking it saves that file's slug to `localStorage`
- The sidebar shows ✓ next to completed topics
- A progress bar at the bottom of the sidebar shows `X/Y done`
- The homepage shows an overall progress ring
- Progress is local to your browser — no account needed

---

## Pages

### Homepage
- Site title and tagline
- Overall progress ring (e.g. 12/50 completed)
- Quick-jump cards to each section (Fundamentals / Data Structures / Algorithms)
- "Continue where you left off" link to the last visited page

### Topic Page (auto-generated per JS file)
- Title (derived from filename, e.g. `longest-substring` → `Longest Substring`)
- Description text (from `// DESCRIPTION:` comment if present)
- Live code editor (editable, runs in browser)
- Output panel below the editor
- Mark Done / Mark Undone button
- Prev / Next navigation

---

## Folder Structure After Setup

```
jslearnings/
├── .github/
│   └── workflows/
│       ├── lint.yml           ← already done
│       └── deploy.yml         ← triggers Vercel on push to main
├── website/                   ← Docusaurus lives here
│   ├── docusaurus.config.js
│   ├── src/
│   │   ├── css/custom.css     ← dark hacker theme overrides
│   │   ├── components/
│   │   │   └── ProgressButton.jsx   ← Mark Done button + localStorage
│   │   └── pages/
│   │       └── index.jsx      ← Homepage with progress ring
│   └── plugins/
│       └── js-source-plugin.js  ← auto-generates pages from JS files
├── 01-fundamentals/           ← your JS files, unchanged
├── 02-data-structures/
├── 03-algorithms/
├── package.json
├── eslint.config.js
└── README.md
```

---

## Build Steps (What I'll Do)

- [ ] 1. Init Docusaurus inside `website/` folder
- [ ] 2. Apply dark hacker theme (CSS overrides — dark bg, green/cyan accents)
- [ ] 3. Write `js-source-plugin.js` — scans JS files, generates pages + sidebar
- [ ] 4. Build `ProgressButton` component (localStorage-backed Mark Done)
- [ ] 5. Build homepage with progress ring
- [ ] 6. Wire up `@docusaurus/theme-live-codeblock` for in-browser JS execution
- [ ] 7. Add `deploy.yml` GitHub Action (optional — Vercel GitHub integration does this automatically)
- [ ] 8. Test build locally with `npm run start`

**You do once:**
- [ ] Connect repo to Vercel (vercel.com → New Project → import this repo)
- [ ] Run `vercel` once locally to get the public URL

---

## What It Won't Have (Keeping It Simple)

- No user accounts or login
- No hints or step-by-step walkthroughs
- No leaderboard or social features
- No backend — everything is static, runs in browser

---

## Estimated Build Time

| Task                        | Time     |
|-----------------------------|----------|
| Docusaurus init + dark theme | ~20 min  |
| Auto-source plugin           | ~20 min  |
| Progress tracking component  | ~15 min  |
| Homepage                     | ~15 min  |
| Wiring everything together   | ~20 min  |
| **Total**                    | **~90 min** |
