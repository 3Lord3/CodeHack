import { useAtomValue, useSetAtom } from 'jotai';
import { backToMenuAtom, resultAtom } from '../atoms';

export default function EndScreen() {
  const result = useAtomValue(resultAtom);
  const backToMenu = useSetAtom(backToMenuAtom);

  return (
    <div className="end-wrapper">
      <div id="result" className="block">
        {result === 'victory' ? 'Победа! 🥳' : 'Поражение 💀'}
      </div>
      <button id="reset" className="block" onClick={() => backToMenu()}>
        🔄
      </button>
    </div>
  );
}
