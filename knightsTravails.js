// Create board
const board = [];
for (let i = 0; i < 8; i++) {
  const row = [0, 0, 0, 0, 0, 0, 0, 0];
  board.push(row);
}

// Return an array of arrays containing the possible moves a knight can make from a certain position
function moveKnight(knight) {
  let x = knight[0];
  let y = knight[1];
  let moves = [];

  for (let i = x - 1; i < x + 2; i++) {
    if (i == x || i < 0 || i > 7) continue;
    for (let j = y - 2; j < y + 3; j += 2) {
      if (j == y || j < 0 || j > 7) continue;
      moves.push([i, j]);
    }
  }

  for (let i = y - 1; i < y + 2; i++) {
    if (i == y || i < 0 || i > 7) continue;
    for (let j = x - 2; j < x + 3; j += 2) {
      if (j == x || j < 0 || j > 7) continue;
      moves.push([j, i]);
    }
  }

  return moves;
}
