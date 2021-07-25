export const RevealCells = (cells, xCoord, yCoord, newSafeCells) => {
  let toShow = [];
  toShow.push(cells[xCoord][yCoord]);
  while (toShow.length !== 0) {
      let one = toShow.pop();
      let i = one.x;
      let j = one.y;
      if (!one.revealed) {
        newSafeCells--;
        one.revealed = true;
      }
      if (one.value !== 0) {
          break;
      }

      // reveal adjacent cells
      if (i > 0 && j > 0 && cells[i - 1][j - 1].value === 0 && !cells[i - 1][j - 1].revealed) {
        toShow.push(cells[i - 1][j - 1]);
      }
      if (i < cells.length - 1 && j < cells[0].length - 1 && cells[i + 1][j + 1].value === 0 && !cells[i + 1][j + 1].revealed) {
        toShow.push(cells[i + 1][j + 1]);
      }
      if (i > 0 && j < cells[0].length - 1 && cells[i - 1][j + 1].value === 0 && !cells[i - 1][j + 1].revealed) {
        toShow.push(cells[i - 1][j + 1]);
      }
      if (i < cells.length - 1 && j > 0 && cells[i + 1][j - 1].value === 0 && !cells[i + 1][j - 1].revealed) {
        toShow.push(cells[i + 1][j - 1]);
      }
      if (i > 0 && cells[i - 1][j].value === 0 && !cells[i - 1][j].revealed) {
        toShow.push(cells[i - 1][j]);
      }
      if (j < cells[0].length - 1 && cells[i][j + 1].value === 0 && !cells[i][j + 1].revealed) {
        toShow.push(cells[i][j + 1]);
      }
      if (i < cells.length - 1 && cells[i + 1][j].value === 0 && !cells[i + 1][j].revealed) {
        toShow.push(cells[i + 1][j]);
      }
      if (j > 0 && cells[i][j - 1].value === 0 && !cells[i][j - 1].revealed) {
        toShow.push(cells[i][j - 1]);
      }

      // reveal
      if (i > 0 && j > 0 && !cells[i - 1][j - 1].revealed) {
        cells[i - 1][j - 1].revealed = true;
        newSafeCells--;
      }
      if (j > 0 && !cells[i][j - 1].revealed) {
        cells[i][j - 1].revealed = true;
        newSafeCells--;
      }
  
      if (i < cells.length - 1 && j > 0 && !cells[i + 1][j - 1].revealed) {
        cells[i + 1][j - 1].revealed = true;
        newSafeCells--;
      }
      if (i > 0 && !cells[i - 1][j].revealed) {
        cells[i - 1][j].revealed = true;
        newSafeCells--;
      }
      if (i < cells.length - 1 && !cells[i + 1][j].revealed) {
        cells[i + 1][j].revealed = true;
        newSafeCells--;
      }
      if (i > 0 && j < cells[0].length - 1 && !cells[i - 1][j + 1].revealed) {
        cells[i - 1][j + 1].revealed = true;
        newSafeCells--;
      }  
      if (j < cells[0].length - 1 && !cells[i][j + 1].revealed) {
        cells[i][j + 1].revealed = true;
        newSafeCells--;
      }
      if (i < cells.length - 1 && j < cells[0].length - 1 && !cells[i + 1][j + 1].revealed) {
        cells[i + 1][j + 1].revealed = true;
        newSafeCells--;
      }
  }

  return {cells, newSafeCells}
}

export const RevealAdjacentCells = (cells, xCoord, yCoord, newSafeCells) => {
  let toShow = [];
  let lostGame = false;
  let losingX, losingY;
  toShow.push(cells[xCoord][yCoord]);
  while (toShow.length !== 0) {
      let one = toShow.pop();
      let i = one.x;
      let j = one.y;

      // reveal
      if (i > 0 && j > 0 && !cells[i - 1][j - 1].revealed && !cells[i - 1][j - 1].flagged) {
        cells[i - 1][j - 1].revealed = true;
        newSafeCells--;
        if (cells[i - 1][j - 1].value !== 'X') {
          if (cells[i - 1][j - 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i - 1, j - 1, newSafeCells));
          }
        } else {
          losingX = i - 1;
          losingY = j - 1;
          lostGame = true;
        }
      }
      if (j > 0 && !cells[i][j - 1].revealed && !cells[i][j - 1].flagged) {
        cells[i][j - 1].revealed = true;
        newSafeCells--;
        if (cells[i][j - 1].value !== 'X') {
          if (cells[i][j - 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i, j - 1, newSafeCells));
          }
        } else {
          losingX = i;
          losingY = j - 1;
          lostGame = true;
        }
      }
  
      if (i < cells.length - 1 && j > 0 && !cells[i + 1][j - 1].revealed && !cells[i + 1][j - 1].flagged) {
        cells[i + 1][j - 1].revealed = true;
        newSafeCells--;
        if (cells[i + 1][j - 1].value !== 'X') {
          if (cells[i + 1][j - 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i + 1, j - 1, newSafeCells));
          }
        } else {
          losingX = i + 1;
          losingY = j - 1;
          lostGame = true;
        }
      }
      if (i > 0 && !cells[i - 1][j].revealed && !cells[i - 1][j].flagged) {
        cells[i - 1][j].revealed = true;
        newSafeCells--;
        if (cells[i - 1][j].value !== 'X') {
          if (cells[i - 1][j].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i - 1, j, newSafeCells));
          }
        } else {
          losingX = i - 1;
          losingY = j;
          lostGame = true;
        }
      }
      if (i < cells.length - 1 && !cells[i + 1][j].revealed && !cells[i + 1][j].flagged) {
        cells[i + 1][j].revealed = true;
        newSafeCells--;
        if (cells[i + 1][j].value !== 'X') {
          if (cells[i + 1][j].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i + 1, j, newSafeCells));
          }
        } else {
          losingX = i + 1;
          losingY = j - 1;
          lostGame = true;
        }
      }
      if (i > 0 && j < cells[0].length - 1 && !cells[i - 1][j + 1].revealed && !cells[i - 1][j + 1].flagged) {
        cells[i - 1][j + 1].revealed = true;
        newSafeCells--;
        if (cells[i - 1][j + 1].value !== 'X') {
          if (cells[i - 1][j + 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i - 1, j + 1, newSafeCells));
          }
        } else {
          losingX = i - 1;
          losingY = j + 1;
          lostGame = true;
        }
      }  
      if (j < cells[0].length - 1 && !cells[i][j + 1].revealed && !cells[i][j + 1].flagged) {
        cells[i][j + 1].revealed = true;
        newSafeCells--;
        if (cells[i][j + 1].value !== 'X') {
          if (cells[i][j + 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i, j + 1, newSafeCells));
          }
        } else {
          losingX = i;
          losingY = j + 1;
          lostGame = true;
        }
      }
      if (i < cells.length - 1 && j < cells[0].length - 1 && !cells[i + 1][j + 1].revealed && !cells[i + 1][j + 1].flagged) {
        cells[i + 1][j + 1].revealed = true;
        newSafeCells--;
        if (cells[i + 1][j + 1].value !== 'X') {
          if (cells[i + 1][j + 1].value === 0) {
            ({cells, newSafeCells} = RevealCells(cells, i + 1, j + 1, newSafeCells));
          }
        } else {
          losingX = i + 1;
          losingY = j + 1;
          lostGame = true;
        }
      }
  }

  return {cells, newSafeCells, lostGame, losingX, losingY}
}

export const CountFlags = (cells, xCoord, yCoord) => {
  let count = 0;

  // count
  if (xCoord > 0 && yCoord > 0 && cells[xCoord - 1][yCoord - 1].flagged) {
    count++;
  }
  if (yCoord > 0 && cells[xCoord][yCoord - 1].flagged) {
    count++;
  }
  if (xCoord < cells.length - 1 && yCoord > 0 && cells[xCoord + 1][yCoord - 1].flagged) {
    count++;
  }
  if (xCoord > 0 && cells[xCoord - 1][yCoord].flagged) {
    count++;
  }
  if (xCoord < cells.length - 1 && cells[xCoord + 1][yCoord].flagged) {
    count++;
  }
  if (xCoord > 0 && yCoord < cells[0].length - 1 && cells[xCoord - 1][yCoord + 1].flagged) {
    count++;
  }  
  if (yCoord < cells[0].length - 1 && cells[xCoord][yCoord + 1].flagged) {
    count++;
  }
  if (xCoord < cells.length - 1 && yCoord < cells[0].length - 1 && cells[xCoord + 1][yCoord + 1].flagged) {
    count++;
  }

  return count;
}
