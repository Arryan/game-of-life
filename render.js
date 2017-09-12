
const xDim = 40;
const yDim = 40;
const canvasW = 600;
const canvasH = 600;
const cellW = canvasW / xDim;
const cellH = canvasH / yDim;
var isPaused = true;
var deltaT = 200; //how long before updating grid
var grid = generateBoard();

var board = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.canvas.addEventListener("click", this.handleClick);
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    renderBoard();
  },
  handleClick : function(e) {
    let xPos = Math.floor(e.offsetX / cellW);
    let yPos = Math.floor(e.offsetY / cellH);
    grid[yPos][xPos] = grid[yPos][xPos] === 1 ? 0 : 1;
    board.context.fillStyle = grid[yPos][xPos] === 1 ? '#ff0744' : '#ffebee';
    board.context.fillRect(xPos * cellW, yPos * cellH, cellW, cellH);
  }
};

function startGame() {
  board.start();
  document.getElementById("step-btn")
  .addEventListener("click", function() {
    updateGrid();
    renderBoard();
  });
  document.getElementById("play-btn")
  .addEventListener("click", function() {
    isPaused = false;
    play();
  });
  document.getElementById("pause-btn")
  .addEventListener("click", function() {
    if(!isPaused) {
      isPaused = true;
    }
  });
  document.getElementById("deltaT-range")
  .addEventListener("input", function() {
    deltaT = document.getElementById("deltaT-range").value;
  });
}

function play() {
  updateGrid();
  renderBoard();
  if(!isPaused) {
    setTimeout(play, deltaT);
  }
}

function renderBoard() {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === 1) {
        board.context.fillStyle = '#ff0744';
      }
      else {
        board.context.fillStyle = '#ffebee';
      }
      board.context.fillRect(j * cellW, i * cellH, cellW, cellH);
    }
  }
}

function generateBoard() {
  board = [];
  for(let i = 0; i < yDim; i++) {
    board.push([])
    for(let j = 0; j < xDim; j++) {
      board[i].push(0);
    }
  }
  return board;
}
