import { createStore } from 'jotai/vanilla';
import { describe, expect, it } from 'vitest';
import {
  backToMenuAtom,
  cellsAtom,
  codeAtom,
  dialogAtom,
  evaluateAtom,
  hasPlayedAtom,
  resultAtom,
  rotateAtom,
  screenAtom,
  startGameAtom,
  triesAtom,
} from './atoms';
import type { Cell } from './game';

const solvedCells = (): Cell[] =>
  'ABCDEFGH'.split('').map((char) => ({ char, color: null }));

describe('game flow', () => {
  it('rejects out-of-range actions without starting', () => {
    const store = createStore();
    store.set(startGameAtom, { actions: '0', timer: '0', colorMode: false });

    expect(store.get(screenAtom)).toBe('menu');
    expect(store.get(dialogAtom)?.type).toBe('error');
  });

  it('rejects out-of-range timer without starting', () => {
    const store = createStore();
    store.set(startGameAtom, { actions: '5', timer: '99', colorMode: false });

    expect(store.get(screenAtom)).toBe('menu');
    expect(store.get(dialogAtom)?.text).toContain('[0:60]');
  });

  it('starts a game and keeps the requested number of tries after scrambling', () => {
    const store = createStore();
    store.set(startGameAtom, { actions: '7', timer: '30', colorMode: false });

    expect(store.get(screenAtom)).toBe('game');
    expect(store.get(triesAtom)).toBe(7);
    expect(store.get(codeAtom)).toHaveLength(8);
    expect(store.get(cellsAtom)).toHaveLength(8);
  });

  it('a rotation consumes a try and marks the game as played', () => {
    const store = createStore();
    store.set(startGameAtom, { actions: '5', timer: '0', colorMode: false });

    store.set(rotateAtom, { side: 'left', clockwise: true });

    expect(store.get(triesAtom)).toBe(4);
    expect(store.get(hasPlayedAtom)).toBe(true);
  });

  it('declares victory when the board matches the code after a turn', () => {
    const store = createStore();
    store.set(codeAtom, 'ABCDEFGH');
    store.set(cellsAtom, solvedCells());
    store.set(hasPlayedAtom, true);
    store.set(triesAtom, 3);
    store.set(screenAtom, 'game');

    store.set(evaluateAtom);

    expect(store.get(resultAtom)).toBe('victory');
    expect(store.get(screenAtom)).toBe('end');
  });

  it('re-scrambles instead of winning on the untouched starting board', () => {
    const store = createStore();
    store.set(codeAtom, 'ABCDEFGH');
    store.set(cellsAtom, solvedCells());
    store.set(hasPlayedAtom, false);
    store.set(triesAtom, 3);
    store.set(screenAtom, 'game');

    store.set(evaluateAtom);

    expect(store.get(screenAtom)).toBe('game');
    expect(store.get(triesAtom)).toBe(3);
  });

  it('goes back to the menu', () => {
    const store = createStore();
    store.set(screenAtom, 'end');
    store.set(resultAtom, 'defeat');

    store.set(backToMenuAtom);

    expect(store.get(screenAtom)).toBe('menu');
    expect(store.get(resultAtom)).toBeNull();
  });
});
