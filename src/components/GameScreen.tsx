import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  cellsAtom,
  codeAtom,
  codeColorsAtom,
  rotateAtom,
  timeLeftAtom,
  timeoutAtom,
  triesAtom,
} from '../atoms';
import type { Side } from '../game';

const SIDES: { side: Side; label: string }[] = [
  { side: 'left', label: 'Левый' },
  { side: 'center', label: 'Центральный' },
  { side: 'right', label: 'Правый' },
];

export default function GameScreen() {
  const cells = useAtomValue(cellsAtom);
  const code = useAtomValue(codeAtom);
  const codeColors = useAtomValue(codeColorsAtom);
  const tries = useAtomValue(triesAtom);
  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const rotate = useSetAtom(rotateAtom);
  const timeout = useSetAtom(timeoutAtom);

  const timerOn = timeLeft !== null;

  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => (prev === null ? null : Math.max(prev - 1, 0)));
    }, 1000);
    return () => clearInterval(id);
  }, [timerOn, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0) timeout();
  }, [timeLeft, timeout]);

  return (
    <div className="wrapper">
      <div className="info-wrapper">
        {timeLeft !== null && (
          <div id="timer" className="block">
            Осталось {timeLeft}⏳️
          </div>
        )}
        <div id="tries" className="block">
          Осталось {tries}🖱️
        </div>
        <div id="code" className="block">
          {code.split('').map((char, index) => (
            <span
              key={index}
              style={codeColors[index] ? { color: codeColors[index]! } : undefined}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="panel">
        {cells.map((cell, index) => (
          <div
            key={index}
            className="cell"
            style={cell.color ? { background: cell.color } : undefined}
          >
            {cell.char}
          </div>
        ))}
      </div>

      <div className="bottom-wrapper">
        {SIDES.map(({ side, label }) => (
          <div className="buttons-block" key={side}>
            <button
              className={`block ${side}-button clockwise`}
              onClick={() => rotate({ side, clockwise: true })}
            >
              {label} ↩️
            </button>
            <button
              className={`block ${side}-button`}
              onClick={() => rotate({ side, clockwise: false })}
            >
              {label} ↪️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
