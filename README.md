# 🔒️ CodeHack

**English** | [Русский](./README.ru.md)

A code-matching puzzle game with a limited number of moves.

## Stack

- **React 19 + TypeScript** — UI and type safety
- **Jotai** — game state
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
public/img/            # favicon, lock
src/
  main.tsx             # entry point
  App.tsx              # screen switch: menu / game / end
  atoms.ts             # state and actions
  game.ts              # pure logic: code, 2x2 block rotation, palette
  components/
    StartScreen.tsx
    GameScreen.tsx
    EndScreen.tsx
    Dialog.tsx
  styles/              # CSS
tests next to the code  # *.test.ts(x)
```

## How the logic works

- The panel is a flat 2×4 grid of 8 cells. Rotating a 2×2 block
  (`left` / `center` / `right`) is a pure `rotateCells` function rather than
  DOM manipulation with `before`/`after`.
- A cell stores both its character and color, so they travel together when
  the board rotates.
- Screens (`menu` / `game` / `end`) and the dialog are Jotai atoms too.