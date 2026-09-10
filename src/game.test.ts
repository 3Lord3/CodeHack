import { describe, expect, it } from 'vitest';
import { type Cell, rotateCells } from './game';

const makeCells = (): Cell[] =>
  'ABCDEFGH'.split('').map((char) => ({ char, color: null }));

const chars = (cells: Cell[]) => cells.map((cell) => cell.char).join('');

// The panel is a flat 2x4 grid:
//   0 1 2 3
//   4 5 6 7
describe('rotateCells', () => {
  it('rotates the left 2x2 block counter-clockwise', () => {
    expect(chars(rotateCells(makeCells(), 'left', false))).toBe('BFCDAEGH');
  });

  it('rotates the left 2x2 block clockwise', () => {
    expect(chars(rotateCells(makeCells(), 'left', true))).toBe('EACDFBGH');
  });

  it('touches only the selected block', () => {
    const result = rotateCells(makeCells(), 'right', true);
    // Cells outside the right block (0, 1, 4, 5) stay in place.
    expect([result[0].char, result[1].char, result[4].char, result[5].char]).toEqual([
      'A',
      'B',
      'E',
      'F',
    ]);
    expect(chars(result)).toBe('ABGCEFHD');
  });

  it('is reversible: clockwise then counter-clockwise restores the board', () => {
    const original = makeCells();
    for (const side of ['left', 'center', 'right'] as const) {
      const roundTrip = rotateCells(rotateCells(original, side, true), side, false);
      expect(chars(roundTrip)).toBe(chars(original));
    }
  });

  it('moves the color together with its character', () => {
    const cells = makeCells().map((cell, index) => ({ ...cell, color: `c${index}` }));
    const result = rotateCells(cells, 'left', false);
    expect(result[0]).toEqual({ char: 'B', color: 'c1' });
    expect(result[1]).toEqual({ char: 'F', color: 'c5' });
    expect(result[4]).toEqual({ char: 'A', color: 'c0' });
    expect(result[5]).toEqual({ char: 'E', color: 'c4' });
  });
});
