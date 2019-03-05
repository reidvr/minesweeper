document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
function Cell(row,col,isMine) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.hidden = true;
  this.isMarked = false;
  this.surroundingMines = -1;
}

var board = {
  cells:[
    new Cell(0,0,true),new Cell(0,1,false),
    new Cell(1,0,false),new Cell(1,1,false)
    
  ]
}

function startGame () {
  board.cells.forEach(el => countSurroundingMines(el));
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var won = true;
  board.cells.forEach(el => {
    if (el.isMine) 
      if (!el.isMarked)
        won = false;
    else if (el.hidden)
      false;
  });


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)

  if(won) lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  
  cell.surroundingMines = lib.getSurroundingCells(cell.row,cell.col);


}

