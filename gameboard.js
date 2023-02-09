import Knight from './knight.js';
import Space from './space.js';

class Gameboard{
    compareArrays(firstArray, secondArray) {
        for(let i = 0; i < firstArray.length; i++) {
            if(firstArray[i] !== secondArray[i]) return false;
        }

        return true;
    }

    findShortestPath(space, end) {
        // if(space.neighbors.contains(end)) return 1;

        // for(let i = 0; i < space.neighbors; i++) {
        //     space.neighbors[]
        // }
    }

    knightMoves (start, end) {
        const knight = new Knight(start, end);
        const space = new Space([0,0]);

        this.findShortestPath(space, end);
    }
}

const gameboard = new Gameboard();
gameboard.knightMoves([0,0], [1,2]);

console.log(gameboard.compareArrays([0,5], [0,0]));