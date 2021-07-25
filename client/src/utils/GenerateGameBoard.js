export default function GenerateGameBoard(rows, columns, mineCount){
    let board = [];
    let mineLocation = [];
  
    // create subColumns
    for (let x = 0; x < rows; x++) {
      let subColumns = [];
      for (let y = 0; y < columns; y++) {
        subColumns.push({
          flagged: false,
          revealed: false,
          value: 0,
          x,
          y,
        });
      }
      board.push(subColumns);
    }

    // randomly place bombs
    let mines = 0;
    while (mines < mineCount) {
      let x = randomNumber(0, rows - 1);
      let y = randomNumber(0, columns - 1);
    
      if (board[x][y].value === 0) {
        board[x][y].value = "X";
        mineLocation.push([x, y]);
        mines++;
      }
    }
  
    // add numbers to cell for adjacent bombs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j].value === "X") {
          continue;
        }
  
        if (i > 0 && board[i - 1][j].value === "X") {
          board[i][j].value++;
        }
  
        // get number of mines for each edge and add to cell count
        if (i > 0 && j < columns - 1 && board[i - 1][j + 1].value === "X") {
          board[i][j].value++;
        }
        if (j < columns - 1 && board[i][j + 1].value === "X") {
          board[i][j].value++;
        }
        if (i < rows - 1 && j < columns - 1 && board[i + 1][j + 1].value === "X") {
          board[i][j].value++;
        }
        if (i < rows - 1 && board[i + 1][j].value === "X") {
          board[i][j].value++;
        }
        if (i < rows - 1 && j > 0 && board[i + 1][j - 1].value === "X") {
          board[i][j].value++;
        }
        if (j > 0 && board[i][j - 1].value === "X") {
          board[i][j].value++;
        }
        if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
          board[i][j].value++;
        }
      }
    }
    return { board, mineLocation };
  };
  
  function randomNumber(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }