export type Side = 'left' | 'center' | 'right';

export interface Cell {
  char: string;
  color: string | null;
}

/** Left column of each 2x2 block in the flat 2x4 grid. */
const BLOCK_START: Record<Side, number> = {
  left: 0,
  center: 1,
  right: 2,
};

/**
 * Rotate one 2x2 block of the panel.
 *
 * Cells form a flat 2x4 grid:
 *   0 1 2 3
 *   4 5 6 7
 *
 * A block is addressed by its left column (`side`) and consists of the
 * positions [TL, TR, BL, BR] = [s, s + 1, s + 4, s + 5].
 *
 * The legacy version moved DOM nodes with `before`/`after`; this reproduces
 * the exact resulting mapping as a pure permutation.
 */
export function rotateCells(cells: Cell[], side: Side, clockwise: boolean): Cell[] {
  const s = BLOCK_START[side];
  const [tl, tr, bl, br] = [s, s + 1, s + 4, s + 5];
  const next = cells.slice();

  if (clockwise) {
    next[tl] = cells[bl];
    next[tr] = cells[tl];
    next[bl] = cells[br];
    next[br] = cells[tr];
  } else {
    next[tl] = cells[tr];
    next[tr] = cells[br];
    next[bl] = cells[tl];
    next[br] = cells[bl];
  }

  return next;
}

const HEX = '0123456789ABCDEF';

/** 8-character hex code, shown on the panel and in the info bar. */
export function generateCode(): string {
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += HEX[Math.floor(Math.random() * HEX.length)];
  }
  return code;
}

/**
 * A random scramble move. The original picked the side and the direction from
 * the same random value, so that stays as-is.
 */
export function randomMove(): { side: Side; clockwise: boolean } {
  const chance = Math.random();

  const side: Side = chance <= 0.333 ? 'left' : chance <= 0.666 ? 'center' : 'right';

  return { side, clockwise: chance >= 0.5 };
}

export const PALETTE = [
  '#606C38',
  '#FCC8B2',
  '#8E8DBE',
  '#D7FF9F',
  '#FFF689',
  '#6096BA',
  '#5D2A42',
  '#D4D2A5',
  '#D7FCD4',
  '#B68F40',
  '#F95738',
  '#F4D35E',
  '#F28F3B',
  '#69B578',
  '#995FA3',
  '#F2BEFC',
  '#456990',
  '#DC965A',
  '#ADA9B7',
  '#B7245C',
  '#49BEAA',
  '#7C3238',
  '#6457A6',
];

/** Pick `count` distinct colors from the palette. */
export function pickUniqueColors(count: number): string[] {
  const pool = [...PALETTE];
  const picked: string[] = [];

  while (picked.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }

  return picked;
}
