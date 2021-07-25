import * as React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import LeaderBoard from './components/LeaderBoard';

function App() {
  const [updatedBoard, setUpdatedBoard] = React.useState(false);

  return (
    <div className="App">
      <h1>React Minesweeper</h1>
      <em>Programmed by <a href="https://edghar88.github.io/">Edgar Harwood</a></em>
      <GameBoard setUpdatedBoard={setUpdatedBoard} />
      <LeaderBoard setUpdatedBoard={setUpdatedBoard} updatedBoard={updatedBoard}  />
    </div>
  );
}

export default App;
