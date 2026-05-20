# Dr.Fit — Hiring Test Task

Hello, and thanks for applying.

## About us

Dr.Fit is a fitness and nutrition app with thousands of active users. Our stack is **React Native (Expo)** on the frontend and **Go (Fiber + Postgres)** on the backend. We ship features and fix bugs across both sides every day.

## What this is

This repository is a small slice that mimics a real day in this role: users have reported problems, a small feature is requested, and your job is to figure out what's wrong, fix it, and verify everything works.

**The most important thing to know**: we have **not** told you what the bugs are. That's intentional. In real product work, you don't get a labeled bug — you get a complaint from a user or a support ticket, and you have to reproduce, diagnose, and fix it yourself. That's what we're testing.

## The reported issues

We have three open reports from the past week.

### Issue #1 — "The recipe list is broken"

> *User report:* "When I open the recipe list, the app crashes sometimes. Sometimes it shows the list but then crashes when I scroll. It seems random."

### Issue #2 — "Some recipes look weird"

> *User report:* "Some recipes show ingredients fine, but others either show nothing or break the screen. Looks inconsistent."

### Issue #3 — "Something's off with the API"

> *Internal developer note:* "I was testing the backend with curl and noticed `GET /recipes/<some-id-that-doesnt-exist>` behaves strangely. The frontend can't tell whether the recipe actually exists or not."

## The feature request

Users would like to:
- **Search recipes by name** (a text input at the top of the list, filtering live)
- **Tap a recipe to open a detail screen** that shows the title, image, prep time, and ingredients

How you structure this is up to you — keep it simple, but it should feel polished.

## Rules of the game

- **Time budget: 3–4 hours.** If you hit 4 hours and aren't done, **stop**. Submit what you have with notes on what you'd do next. We care more about how you think than whether everything is perfect.
- **AI tools are encouraged.** Claude Code, Cursor, GitHub Copilot — use whatever you use day to day. We expect you to use AI well, not avoid it.
- **You may modify any file in this repo**, except `backend/data/recipes.json`. The data is what it is — your code has to handle it correctly. (Treat that file the way you would a real production database you don't get to edit.)

## How to run the project

You'll need **Go 1.21+**, **Node 18+**, and the **Expo Go** app on your phone (or an iOS/Android simulator).

```bash
# Terminal 1 — backend
cd backend
go mod tidy
go run main.go
# Server listens on http://localhost:8080

# Terminal 2 — frontend
cd frontend
npm install
npx expo start
# Scan the QR code with Expo Go, or press 'i' / 'a' for simulator
```

If the frontend can't reach the backend, you may need to point it at your machine's local IP rather than `localhost` — adjust `frontend/api/recipes.ts` accordingly.

## How to verify your work

Before submitting, prepare a **5–7 minute Loom video** in English. In it, please cover:

1. **Reproduce** — Show each issue happening **before** your fix. A screen recording or screenshot for each.
2. **Diagnose** — Walk us through how you found the root cause. What did you try first? What did AI suggest that was wrong? What worked?
3. **Verify** — Show each issue resolved **after** your fix. Test the happy path and any edge cases you thought of.
4. **Stress-test the feature** — For the search + detail view, demo the edge cases you came up with. What happens with an empty search? No results? Special characters? Slow network? A recipe that doesn't exist?
5. **Honest assessment** — Was there anything you weren't sure about? Anything you'd do differently with more time? Anything you couldn't reproduce or fix?

**Bonus signal**: edge cases or related issues you noticed but weren't explicitly asked about.

## What to submit

1. Fork this repository.
2. Investigate, fix, and add the feature on a branch.
3. Open a **Pull Request** back to this repo with:
   - A clear description of what you found and what you changed
   - A link to your Loom video
   - Anything else we should know

We respond to every submission within **48 hours**.

## What we're looking for

We're hiring someone who uses AI tools confidently and ships real work. Things we pay attention to:

- **You actually reproduced the issues.** You can describe specifically when each one triggers, not just "it crashed sometimes."
- **You read the code.** There are patterns already in this repo that hint at how things should be done — did you find them?
- **You used AI thoughtfully.** Your Loom shows what you prompted, what AI got wrong, and how you corrected it. We want to see you steering, not just accepting.
- **You picked the right place to fix each bug.** When there's a choice between fixing on frontend vs. backend, you can explain *why* you chose what you chose.
- **You tested your work.** You verified each fix before declaring it done, including edge cases that weren't in the requirements.
- **Your code is clean.** Tight types (no `any` or `interface{}` everywhere), no dead code, consistent style with what's already in the repo.
- **Your commits tell a story.** Separate commits per issue/feature, clear messages.
- **You're honest about what you don't know.** Acknowledging uncertainty is a strong signal, not a weak one.

## The role

If we like your submission, the next step is a short call to talk through your work and answer any questions you have about the role.

**Position:** Part-time developer (4h/day, Mon–Fri), $600/month flat, paid via Wise. Two-week paid trial first, then we commit. Fully remote, work from anywhere in Ukraine.

Good luck — we're rooting for you.
