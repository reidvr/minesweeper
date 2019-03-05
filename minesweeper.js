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
  cells:[]
};

function setEasyDifficulty(){
  setDifficulty(4,4,10);
}
function setMediumDifficulty(){
  setDifficulty(5,5,15);
}

function setHardDifficulty(){
  setDifficulty(6,6,5);
} 

function setDifficulty(rows,cols,mines){
    document.querySelector('.board').innerHTML = '';
    var minesRemaining = mines, totalCells = rows * cols;
    var mineChance = mines/totalCells;
    var cells = [];

    var setMine = function(){
      if(minesRemaining)
      {
        return Math.random() > mineChance ? false : true;
        minesRemaining--;
      }
    }

    for(var i = 0; i < rows; i++)
      for(var j = 0; j < cols; j++){
        cells.push(new Cell(i,j,setMine()));
        
      }

    board.cells = cells;
    board.cells.forEach(function(el){
      countSurroundingMines(el);
      
    });
    
    lib.initBoard();
    
   
}


function startGame () {
  
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  document.querySelector('.easy-btn').addEventListener('click', setEasyDifficulty);
  document.querySelector('.medium-btn').addEventListener('click', setMediumDifficulty);
  document.querySelector('.hard-btn').addEventListener('click', setHardDifficulty);
  
  // Don't remove this function call: it makes the game work!
  setEasyDifficulty();                                         
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



