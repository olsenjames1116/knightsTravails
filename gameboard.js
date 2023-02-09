import Knight from './knight.js';
import Space from './space.js';

class Gameboard{
    compareArrays(firstArray, secondArray) {
        for(let i = 0; i < firstArray.length; i++) {
            if(firstArray[i] !== secondArray[i]) return false;
        }

        return true;
    }

    findShortestPath(start, end) {
        if(this.compareArrays(start, end)) return 0;

        let path = 1;
        let queue = [];
        const startSpace = new Space(start);
        let startIndex = 0;
        let endIndex = startSpace.neighbors.length;
        const endString = JSON.stringify(end);
        let space = startSpace;
        queue.push(startSpace);
        let compareQueue = JSON.stringify(queue);

        for(path; compareQueue.indexOf(endString) === -1; path++) {
            for(let i = startIndex; i < endIndex; i++) {
                queue = queue.concat(space.neighbors);
                space = new Space(queue[i + 1]);
            }

            compareQueue = JSON.stringify(queue);
            startIndex = endIndex;
            endIndex = queue.length;







            // queue = queue.concat(space.neighbors);
            // let space = queue[0];
            // queue = queue.concat(space.neighbors);
            // if(queue.includes(end)) break;
            // queue.shift();
            // queue[0] = new Space(queue[0]);
        }

        return path;
    }

    knightMoves (start, end) {
        const knight = new Knight(start, end);

        return this.findShortestPath(start, end);
    }
}

const gameboard = new Gameboard();
console.log(gameboard.knightMoves([3,3], [4,3]));