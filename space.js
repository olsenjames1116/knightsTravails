// Represents a space on the gameboard
export default class Space {
  constructor(coordinate) {
    this.coordinate = coordinate;
    this.neighbors = this.getNeighbors(coordinate);
  }

  // Returns the neighbors, or all the possible moves from a space
  getNeighbors(coordinate) {
    let neighborsArray = [];
    const possibleMovesArray = this.getPossibleMoves();

    // Adds all the possible, legal moves from a space
    while (possibleMovesArray.length > 0) {
      const possibleMove = possibleMovesArray.shift();
      const xMove = coordinate[0] + possibleMove[0];
      const yMove = coordinate[1] + possibleMove[1];

      // Only stores the move if it will not take the piece of the board
      if (xMove > -1 && xMove < 8 && yMove > -1 && yMove < 8) {
        neighborsArray.push([xMove, yMove]);
      }
    }

    return neighborsArray;
  }

  // All the possible moves a knight can make from a space
  getPossibleMoves() {
    return [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];
  }
}
