import { useAtomValue } from 'jotai';
import { screenAtom } from './atoms';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import Dialog from './components/Dialog';

export default function App() {
  const screen = useAtomValue(screenAtom);

  return (
    <>
      {screen === 'menu' && <StartScreen />}
      {screen === 'game' && <GameScreen />}
      {screen === 'end' && <EndScreen />}
      <Dialog />
    </>
  );
}
