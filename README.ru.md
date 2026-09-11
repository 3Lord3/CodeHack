# 🔒️ CodeHack

[English](./README.md) | **Русский**

Игра на сопоставление кода с ограниченными попытками.

## Стек

- **React 19 + TypeScript** — UI и типизация
- **Jotai** — состояние игры
- **Vite** — дев-сервер и сборка
- **Vitest** — тесты логики и взаимодействия

## Скрипты

```bash
npm install
npm run dev      # дев-сервер
npm run build    # tsc + production-сборка в dist/
npm run preview  # локальный предпросмотр сборки
npm test         # прогон тестов
```

## Структура

```
index.html
public/img/            # favicon, lock
src/
  main.tsx             # точка входа
  App.tsx              # выбор экрана: menu / game / end
  atoms.ts             # состояние и действия
  game.ts              # чистая логика: код, вращение 2x2-блоков, палитра
  components/
    StartScreen.tsx
    GameScreen.tsx
    EndScreen.tsx
    Dialog.tsx
  styles/              #
tests рядом с кодом     # *.test.ts(x)
```

## Как устроена логика

- Панель — это плоская сетка 2×4 из 8 ячеек. Вращение 2×2-блока
  (`left` / `center` / `right`) — чистая функция `rotateCells`, а не
  манипуляции с DOM через `before`/`after`.
- Ячейка хранит символ и цвет, поэтому при вращении они перемещаются вместе.
- Экраны (`menu` / `game` / `end`) и диалог — тоже атомы Jotai.