import Space from "./space.js";

// Used to represent the actions taken on the gameboard
class Gameboard {
  compareArrays(firstArray, secondArray) {
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) return false;
    }

    return true;
  }

  /* Returns an object of the possible moves starting from the start 
    coordinates and branching out through its children */
  findMoves(start, end) {
    // If the start and end positions are equal, there is no need to move
    if (this.compareArrays(start, end)) return 0;

    const startSpace = new Space(start);
    let queue = [startSpace];
    const visited = new Set();
    const movesObj = {};

    // Continue through the children of each space until the end coordinate is found
    while (queue.length > 0) {
      const temp = queue.shift();
      const tempString = temp.coordinate.toString();

      // There is no parent for the first move
      if (Object.keys(movesObj).length === 0) movesObj[tempString] = null;

      // Store each move so there are no repeat moves in the set
      visited.add(tempString);

      // The end move has been found and the loop can be exited
      if (this.compareArrays(temp.coordinate, end)) return movesObj;

      /* For each possible move from a space, turn it into a string 
            and push it to the queue if it has not been discovered yet */
      temp.neighbors.forEach((move) => {
        const moveString = move.toString();

        if (!visited.has(moveString)) {
          queue.push(move);

          // Stores the move as well as the parent to be traversed later for the shortest path
          movesObj[moveString] = tempString;
        }
      });

      // Create a new space object to pull its neighbors on the next iteration
      queue[0] = new Space(queue[0]);
    }
  }

  // Returns a stack of the moves that lead to the shortest path
  findShortestPath(movesObj, end) {
    const endString = end.toString();
    let moveChild = endString;
    let moveParent;
    const shortestPathStack = [endString];

    /* Traverse through the possible moves object starting from the end and working back 
        to the start position. The start position is found by being the move that does not 
        have a parent */
    do {
      moveParent = movesObj[moveChild];

      shortestPathStack.unshift(moveParent);

      moveChild = moveParent;
    } while (moveParent !== null);

    return shortestPathStack;
  }

  // Prints the shortest path to the console
  printShortestPath(shortestPath) {
    // If the shortest path is equal to 0, the user has entered the same space to start and end at
    if (shortestPath === 0) {
      console.log("You are already there! Enter a different end location.");
    } else {
      // Reached whenever a different end and start position have been entered

      // Represents how many moves are to be made to go from start position to end position
      const path = shortestPath.length - 2;
      let move = "moves";

      // Corrects grammar if there is only one move to be made
      if (path === 1) move = "move";

      console.log(`You made it in ${path} ${move}! Here's your path:`);

      // Removes the null item at the top of the stack
      shortestPath.shift();

      // Prints all the moves as coordinates to the console
      while (shortestPath.length > 0) {
        const temp = shortestPath.shift();

        console.log(`[${temp}]`);
      }
    }
  }

  // Called with a start position and end position to trigger the rest of the program
  knightMoves(start, end) {
    const movesObj = this.findMoves(start, end);

    let shortestPath;

    // If the moves object is 0, the same start and end position has been entered
    if (movesObj !== 0) {
      shortestPath = this.findShortestPath(movesObj, end);
    } else {
      shortestPath = 0;
    }

    this.printShortestPath(shortestPath);
  }
}

const gameboard = new Gameboard();
gameboard.knightMoves([3, 3], [4, 3]);
