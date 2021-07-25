import * as React from 'react';
import GenerateGameBoard from '../../utils/GenerateGameBoard';
import { CountFlags, RevealCells, RevealAdjacentCells } from '../../utils/RevealCells';
import Cell from './Cell';
import Modal from './Modal';
import './index.scss';
import NamePrompt from './NamePrompt';

const GameBoard = ({ setUpdatedBoard }) => {
  const [boardGrid, setBoardGrid] = React.useState([]);
  const [customDifficultyParams, setCustomDifficultyParams] = React.useState([9, 9, 10])
  const [difficulty, setDifficulty] = React.useState('beginner');
  const [inClick, setInClick] = React.useState(false);
  const [lostGame, setLostGame] = React.useState(false);
  const [mineFlagsRemaining, setMineFlagsRemaining] = React.useState(0);
  const [mineLocation, setMineLocation] = React.useState([]);
  const [nonMineCount, setNonMineCount] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [startedGame, setStartedGame] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [wonGame, setWonGame] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);

  const flagCell = (e, xCoord, yCoord) => {
    e.preventDefault();
    let newBoardGrid = JSON.parse(JSON.stringify(boardGrid));
    if (!newBoardGrid[xCoord][yCoord].revealed) {
      if (newBoardGrid[xCoord][yCoord].flagged) {
        newBoardGrid[xCoord][yCoord].flagged = false;
        setMineFlagsRemaining(mineFlagsRemaining + 1);
      } else {
        newBoardGrid[xCoord][yCoord].flagged = true;
        setMineFlagsRemaining(mineFlagsRemaining - 1);
      }
    }
    setBoardGrid(newBoardGrid);
  }
  
  const getFace = () => {
    if (lostGame) {
      return <span>&#128565;</span>;
    }
    if (wonGame) {
      return <span>&#128526;</span>;
    }
    if (inClick) {
      return <span>&#128558;</span>;
    }
    return <span>&#128578;</span>;
  }

  const revealAdjacent = (e, xCoord, yCoord) => {
    e.preventDefault();
    setInClick(true);
    let newBoardGrid = JSON.parse(JSON.stringify(boardGrid));
    if (newBoardGrid[xCoord][yCoord].revealed === true) {
      const flagCount = CountFlags(newBoardGrid, xCoord, yCoord);
      if (flagCount === Number(newBoardGrid[xCoord][yCoord].value)) {
        const revealedBoard = RevealAdjacentCells(newBoardGrid, xCoord, yCoord, nonMineCount);
        if (revealedBoard.lostGame) {
          setLostGame(true);
          newBoardGrid[revealedBoard.losingX][revealedBoard.losingY].isHitMine = true;  
            for (let i = 0; i < mineLocation.length; i++) {
              newBoardGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
        }
        setBoardGrid(revealedBoard.cells);
        setNonMineCount(revealedBoard.newSafeCells);
      }
    }
    setTimeout(() => setInClick(false), 200);
  }

  const revealCell = (xCoord, yCoord) => {
    setInClick(true);
    let newBoardGrid = JSON.parse(JSON.stringify(boardGrid));
    if (!newBoardGrid[xCoord][yCoord].flagged) {
      if (newBoardGrid[xCoord][yCoord].value === "X") {
        setLostGame(true);
        newBoardGrid[xCoord][yCoord].isHitMine = true;  
          for (let i = 0; i < mineLocation.length; i++) {
            newBoardGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
          }
          setBoardGrid(newBoardGrid);
      }
      else {
        const revealedBoard = RevealCells(newBoardGrid, xCoord, yCoord, nonMineCount);
        setBoardGrid(revealedBoard.cells);
        setNonMineCount(revealedBoard.newSafeCells);
      }
    }
    setTimeout(() => setInClick(false), 200);
  }

  const createBoard = React.useCallback(() => {
    const gameParams = () => {
      switch (difficulty) {
        case 'custom':
          return customDifficultyParams;
        case 'expert':
          return [16, 30, 99];
        case 'intermediate':
          return [16, 16, 40];
        case 'beginner':
        default:
          return [9, 9, 10];
      }
    }
    const newGame = GenerateGameBoard(gameParams()[0], gameParams()[1], gameParams()[2]);
    setWonGame(false);
    setLostGame(false);
    setStartedGame(false);
    setTimer(0);
    setMineFlagsRemaining(gameParams()[2]);
    setNonMineCount(gameParams()[0] * gameParams()[1] - gameParams()[2])
    setMineLocation(newGame.mineLocation);
    setBoardGrid(newGame.board);
  }, [customDifficultyParams, difficulty]);

  React.useEffect(() => {
    if (nonMineCount === 0) {
      setWonGame(true);
    }
  }, [nonMineCount])

  React.useEffect(() => {
    if (wonGame) {
      setShowPrompt(true);
    }
  }, [wonGame])

  React.useEffect(() => {
    createBoard();    
  }, [createBoard, difficulty])

  React.useEffect(() => {
    const countUp = () => {
      setTimer((time) => time + 0.0175);
    }; 
    
    if (lostGame || wonGame || timer > 998) {
      clearTimeout(countUp);
    } else if (startedGame) {
      setTimeout(countUp, 10); 
    }

    return () => {
      clearTimeout(countUp);
    }
  }, [startedGame, lostGame, timer, wonGame])

  return (
    <div className="game-container">
      <div className={`board-wrapper ${zoomed ? 'board-wrapper__zoomed' : ''}`}>
        <div className="board-header">
          <div className="number-display">{mineFlagsRemaining >= 0 ? ('000' + mineFlagsRemaining).substr(-3) : '000'}</div>
          <button onClick={createBoard}>{getFace()}</button>
          <div className="number-display">{('000' + Math.round(timer)).substr(-3)}</div>
        </div>
        <div className="board-container" onClick={() => setStartedGame(true)}>
          {boardGrid.map((gridRow, gridIdx) => (
            <div className="board-row" key={gridIdx}>
              {gridRow.map((gridColumn, idx) => (
                <Cell cellInfo={gridColumn} flagCell={flagCell} key={idx} lostGame={lostGame} revealAdjacent={revealAdjacent} revealCell={revealCell} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="interaction-button" onClick={() => setShowModal(true)}>Open Menu</button>
      <Modal close={() => setShowModal(false)} difficulty={difficulty} setCustomDifficultyParams={setCustomDifficultyParams} setDifficulty={setDifficulty} setZoomed={setZoomed} visible={showModal} zoomed={zoomed} />
      <NamePrompt close={() => setShowPrompt(false)} difficulty={difficulty} setUpdatedBoard={setUpdatedBoard} timer={timer} visible={showPrompt} />
    </div>
  )
}

export default GameBoard;
