export default class Space {
  constructor(coordinate) {
    this.coordinate = coordinate;
    this.neighbors = this.getNeighbors(coordinate);
  }

  getNeighbors(coordinate) {
    let neighborsArray = [];
    const possibleMovesArray = this.getPossibleMoves();

    while (possibleMovesArray.length > 0) {
      const possibleMove = possibleMovesArray.shift();
      const xMove = coordinate[0] + possibleMove[0];
      const yMove = coordinate[1] + possibleMove[1];

      if (xMove > -1 && xMove < 8 && yMove > -1 && yMove < 8) {
        neighborsArray.push([xMove, yMove]);
      }
    }

    return neighborsArray;
  }

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
