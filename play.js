function updateGrid() {
  let nextGen = [];
  //next generation is calculated
  for(let i = 0; i < grid.length; i++) {
    nextGen.push([]); //add row
    for(let j = 0; j < grid[0].length; j++) {
      let neighbours = countNeighbours(i,j);
      //cell is dead
      if(grid[i][j] == 1) {
        //countNeighbours counts current cell as neighbour
        //so it must be subtracted
        neighbours--;
        //case 1
        if(neighbours < 2) {
          nextGen[i].push(0)
        }
        //case 2
        else if(neighbours <= 3) {
          nextGen[i].push(1);
        }
        //case 3
        else {
          nextGen[i].push(0);
        }
      }
      //cell is alive
      else  {
        //case 4
        if(neighbours === 3){
          nextGen[i].push(1);
        }
        //nothing changes
        else {
          nextGen[i].push(0);
        }
      }
    }
  }
  //grid is updated to next generation
  grid = nextGen.slice();
}

//counts how many neighbours plus the current cell are alive
function countNeighbours(i,j) {
  let n = 0;
  for(let iShift = -1; iShift <= 1; iShift++) {
    for(let jShift = -1; jShift <= 1; jShift++) {
      if(grid[(i+iShift+grid.length) % grid.length]
      [(j+jShift+grid[0].length) % grid[0].length] === 1) {
        n++;
      }
    }
  }
  return n;
}
