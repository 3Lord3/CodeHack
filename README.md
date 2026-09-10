# 🔒️ CodeHack

**English** | [Русский](./README.ru.md)

A code-matching puzzle game with a limited number of moves.

https://codehack.vercel.app/

## Stack

- **React 19 + TypeScript** — UI and type safety
- **Jotai** — game state (atoms instead of global `let`s and manual DOM work)
- **Vite** — dev server and build
- **Vitest** — logic and interaction tests

## Scripts

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + production build into dist/
npm run preview  # preview the production build locally
npm test         # run tests
```

## Structure

```
index.html
public/img/            # favicon, lock (static assets)
src/
  main.tsx             # entry point
  App.tsx              # screen switch: menu / game / end
  atoms.ts             # state and actions (Jotai)
  game.ts              # pure logic: code, 2x2 block rotation, palette
  components/
    StartScreen.tsx
    GameScreen.tsx
    EndScreen.tsx
    Dialog.tsx
  styles/              # original CSS (moved unchanged)
tests next to the code  # *.test.ts(x)
```

## How the logic works

- The panel is a flat 2×4 grid of 8 cells. Rotating a 2×2 block
  (`left` / `center` / `right`) is a pure `rotateCells` function rather than
  DOM manipulation with `before`/`after`.
- A cell stores both its character and color, so they travel together when
  the board rotates.
- Screens (`menu` / `game` / `end`) and the dialog are Jotai atoms too.

## Deployment

The site is deployed on **Vercel**, which serves it from the domain root, so
`vite.config.ts` uses:

```ts
base: '/';
```

Vercel auto-detects Vite: build command `npm run build`, output directory
`dist`. No extra configuration is required.
