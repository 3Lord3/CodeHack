# 🔒️ CodeHack

Игра на сопоставление кода с ограниченными попытками.

https://3lord3.github.io/codehack.github.io/

## Стек

- **React 19 + TypeScript** — UI и типизация
- **Jotai** — состояние игры (атомы вместо глобальных `let` и ручного DOM)
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
public/img/            # favicon, lock (статика)
src/
  main.tsx             # точка входа
  App.tsx              # выбор экрана: menu / game / end
  atoms.ts             # состояние и действия (Jotai)
  game.ts              # чистая логика: код, вращение 2x2-блоков, палитра
  components/
    StartScreen.tsx
    GameScreen.tsx
    EndScreen.tsx
    Dialog.tsx
  styles/              # исходные CSS (перенесены без изменений)
tests рядом с кодом     # *.test.ts(x)
```

## Как устроена логика

- Панель — это плоская сетка 2×4 из 8 ячеек. Вращение 2×2-блока
  (`left` / `center` / `right`) — чистая функция `rotateCells`, а не
  манипуляции с DOM через `before`/`after`.
- Ячейка хранит символ и цвет, поэтому при вращении они перемещаются вместе.
- Экраны (`menu` / `game` / `end`) и диалог — тоже атомы Jotai.

## Деплой

Сайт опубликован как **project page**, поэтому в `vite.config.ts` задано:

```ts
base: '/codehack.github.io/';
```

Собрать и выложить можно через GitHub Pages (ветка с папкой `dist`) или
GitHub Actions; при смене способа публикации проверьте, что `base` совпадает
с URL страницы.
