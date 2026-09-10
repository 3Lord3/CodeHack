import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { startGameAtom } from '../atoms';

export default function StartScreen() {
  const startGame = useSetAtom(startGameAtom);

  const [actions, setActions] = useState('3');
  const [timer, setTimer] = useState('0');
  const [colorMode, setColorMode] = useState(false);

  return (
    <div className="start-wrapper">
      <h1>
        C<img src={`${import.meta.env.BASE_URL}img/lock.png`} alt="" />deHack
      </h1>

      <div className="actions-wrapper">
        <div className="block actions-field">🖱️ Количество действий</div>
        <input
          id="actions-input"
          className="block"
          type="number"
          value={actions}
          min={1}
          max={100}
          onChange={(event) => setActions(event.target.value)}
        />
      </div>

      <div className="timer-wrapper">
        <div className="block timer-field">⏳️ Таймер (0 = Выкл)</div>
        <input
          id="timer-input"
          className="block"
          type="number"
          value={timer}
          min={0}
          max={60}
          onChange={(event) => setTimer(event.target.value)}
        />
      </div>

      <div className="color-wrapper">
        <div className="block color-field">
          🎨 Цветной режим
          <input
            id="color-input"
            type="checkbox"
            checked={colorMode}
            onChange={(event) => setColorMode(event.target.checked)}
          />
        </div>
      </div>

      <button
        id="start-button"
        className="block"
        onClick={() => startGame({ actions, timer, colorMode })}
      >
        ⌨️ Начать
      </button>
    </div>
  );
}
