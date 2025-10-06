import { useGameStore } from './store/store';
import Gameboard from './components/Gameboard';
import StartPage from './components/StartPage';

function App() {
  const { players } = useGameStore();
  console.log(players);

  return <>{players.length ? <Gameboard /> : <StartPage />}</>;
}

export default App;
