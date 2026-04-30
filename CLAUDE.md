# CLAUDE.md

This file provides guidance to Claude when working with this repository.

## Project Overview

Stopper — a browser-based stopwatch/timer PWA. Vanilla JS, deployed on Netlify. Includes a service worker for offline support and an ESLint config for code quality.

## Development Setup

```bash
npm install
```

## Common Commands

```bash
# Lint
npx eslint .

# Run tests
node test_bench.js
```

## Code Style

- Vanilla HTML5 + CSS + JS. Do not introduce framework dependencies or build steps.
- Keep functions small and focused on a single responsibility.
- Write clear, self-documenting code; only add comments where the logic is non-obvious.
- Do not add unnecessary error handling, logging, or abstractions.

## Architecture Notes

- `index.html` — main application entry point.
- `js/` — modular JavaScript source files.
- `sw.js` — service worker for PWA/offline support.
- `manifest.json` — PWA manifest.
- `netlify.toml` — Netlify deployment config.
- `benchmark.js` / `test_bench.js` — performance benchmarks.

## Git workflow

- Only two persistent branches: develop and main
- Humans: commit directly to develop, never to main
- AI agents (Claude, Codex): open PRs from short-lived claude/* or codex/* branch, always targeting develop, never main. Delete branch after merge.
- Do not create feature or topic branches.
