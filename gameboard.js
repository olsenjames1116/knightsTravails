import Knight from './knight.js';
import Space from './space.js';

class Gameboard{
    compareArrays(firstArray, secondArray) {
        for(let i = 0; i < firstArray.length; i++) {
            if(firstArray[i] !== secondArray[i]) return false;
        }

        return true;
    }

    findMoves(start, end) {
        if(this.compareArrays(start, end)) return 0;

        const startSpace = new Space(start);
        let queue = [ startSpace ];
        const visited = new Set();
        const movesObj = {};

        while(queue.length > 0) {
            const temp = queue.shift();
            const tempString = temp.coordinate.toString();
        
            if(Object.keys(movesObj).length === 0) movesObj[ tempString ] = null;

            visited.add(tempString);

            if(this.compareArrays(temp.coordinate, end)) return movesObj;

            temp.neighbors.forEach((move) => {
                const moveString = move.toString();

                if(!visited.has(moveString)) {
                    queue.push(move);
                    
                    movesObj[ moveString ] = tempString;
                }
            })

            queue[0] = new Space(queue[0]);
        }
    }

    findShortestPath(movesObj, end) {
        const endString = end.toString();
        let moveChild = endString;
        let moveParent;
        const shortestPathStack = [ endString ];

        do {
            moveParent = movesObj[ moveChild ];

            shortestPathStack.unshift(moveParent);

            moveChild = moveParent;
        } while(moveParent !== null);

        return shortestPathStack;
    }

    printShortestPath(shortestPath) {
        if(shortestPath === 0) {
            console.log('You are already there! Enter a different end location.')
        } else {
            const path = shortestPath.length - 2;
            let move = 'moves';

            if(path === 1) move = 'move';

            console.log(`You made it in ${path} ${move}! Here's your path:`);

            shortestPath.shift();

            while(shortestPath.length > 0) {
                const temp = shortestPath.shift();

                console.log(`[${temp}]`);
            }
        }
    }

    knightMoves (start, end) {
        const knight = new Knight(start, end);

        const movesObj = this.findMoves(start, end);

        let shortestPath;

        if(movesObj !== 0) {
            shortestPath = this.findShortestPath(movesObj, end);
        } else {
            shortestPath = 0;
        }

        this.printShortestPath(shortestPath);
    }
}

const gameboard = new Gameboard();
gameboard.knightMoves([3,3], [4,3]);