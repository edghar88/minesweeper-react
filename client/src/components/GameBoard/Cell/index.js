import * as React from 'react';
import './index.scss';

const Cell = (props) => {
  const { cellInfo, flagCell, lostGame, revealAdjacent, revealCell } = props;

  const getCellValue = () => {
    if (cellInfo.revealed) {
      if (cellInfo.isHitMine || cellInfo.value === 'X') {
        return <span>&#128163;</span>
      }
      if (cellInfo.value > 0) {
        return <span className="number">{cellInfo.value}</span>;
      }
    }
    if (cellInfo.flagged) {
      return <span className="board-cell__flagged">&#128681;</span>
    }
    return '';
  }

  return (
    <div
      className={`board-cell ${cellInfo.revealed && 'board-cell__revealed'} ${cellInfo.isHitMine && 'board-cell__hit-mine'}`}
      onClick={() => !lostGame && revealCell(cellInfo.x, cellInfo.y)}
      onDoubleClick={(e) => revealAdjacent(e, cellInfo.x, cellInfo.y)}
      onContextMenu={(e) => flagCell(e, cellInfo.x, cellInfo.y)}
    >
      {getCellValue()}
    </div>
  )
}

export default Cell;
