import { atom } from 'jotai';
import {
  type Cell,
  type Side,
  generateCode,
  pickUniqueColors,
  randomMove,
  rotateCells,
} from './game';

export type Screen = 'menu' | 'game' | 'end';
export type GameResult = 'victory' | 'defeat' | null;
export type Dialog = { type: 'error' | 'help'; text: string } | null;

export interface StartGameParams {
  actions: string;
  timer: string;
  colorMode: boolean;
}

// --- state -----------------------------------------------------------------

export const screenAtom = atom<Screen>('menu');
export const codeAtom = atom('');
export const cellsAtom = atom<Cell[]>([]);
export const codeColorsAtom = atom<(string | null)[]>([]);
export const triesAtom = atom(0);
/** Remaining seconds, or `null` when the timer is disabled. */
export const timeLeftAtom = atom<number | null>(null);
export const hasPlayedAtom = atom(false);
export const dialogAtom = atom<Dialog>(null);
export const resultAtom = atom<GameResult>(null);

// --- derived ---------------------------------------------------------------

export const isVictoryAtom = atom((get) => {
  const code = get(codeAtom);
  if (code.length === 0) return false;
  return get(cellsAtom).map((cell) => cell.char).join('') === code;
});

// --- actions ---------------------------------------------------------------

/** Scramble the board, keeping the number of tries unchanged. */
export const scrambleAtom = atom(null, (get, set) => {
  const moves = get(triesAtom);
  set(triesAtom, moves * 2);

  for (let i = 0; i < moves; i += 1) {
    const { side, clockwise } = randomMove();
    set(cellsAtom, (cells) => rotateCells(cells, side, clockwise));
    set(triesAtom, (tries) => tries - 1);
  }
});

export const evaluateAtom = atom(null, (get, set) => {
  const victory = get(isVictoryAtom);

  // The starting position is already "solved", so the first real turn must
  // not count as a win: scramble again instead.
  if (victory && !get(hasPlayedAtom)) {
    set(scrambleAtom);
    return;
  }

  if (victory || get(triesAtom) <= 0) {
    set(screenAtom, 'end');
    set(resultAtom, victory ? 'victory' : 'defeat');
    set(timeLeftAtom, null);
  }
});

export const rotateAtom = atom(
  null,
  (_get, set, payload: { side: Side; clockwise: boolean }) => {
    set(cellsAtom, (cells) => rotateCells(cells, payload.side, payload.clockwise));
    set(triesAtom, (tries) => tries - 1);
    set(hasPlayedAtom, true);
    set(evaluateAtom);
  },
);

export const startGameAtom = atom(null, (_get, set, params: StartGameParams) => {
  const actions = Number(params.actions);
  const timer = Number(params.timer);

  if (Number.isNaN(actions) || actions < 1 || actions > 100) {
    set(dialogAtom, {
      type: 'error',
      text: 'Количество действий должно быть в диапазоне [1:100]',
    });
    return;
  }

  if (Number.isNaN(timer) || timer < 0 || timer > 60) {
    set(dialogAtom, {
      type: 'error',
      text: 'Значение таймера должно быть в диапазоне [0:60] секунд',
    });
    return;
  }

  const code = generateCode();
  const colors = params.colorMode ? pickUniqueColors(code.length) : null;

  const cells: Cell[] = code
    .split('')
    .map((char, index) => ({ char, color: colors ? colors[index] : null }));

  set(codeAtom, code);
  set(codeColorsAtom, colors ?? code.split('').map(() => null));
  set(cellsAtom, cells);
  set(triesAtom, actions);
  set(hasPlayedAtom, false);
  set(resultAtom, null);
  set(timeLeftAtom, timer === 0 ? null : timer);
  set(screenAtom, 'game');

  set(scrambleAtom);
  set(evaluateAtom);
});

export const timeoutAtom = atom(null, (_get, set) => {
  set(triesAtom, 0);
  set(evaluateAtom);
});

export const backToMenuAtom = atom(null, (_get, set) => {
  set(screenAtom, 'menu');
  set(resultAtom, null);
});
