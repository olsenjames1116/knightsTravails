import Knight from './knight.js';

function knightMoves (start, end) {
    const knight = new Knight(start, end);
    console.log(knight);
}

knightMoves([0,0], [1,2]);