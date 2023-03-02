// Create 2d board
const board = [];
for (let i = 0; i < 8; i++) {
  const row = [0, 0, 0, 0, 0, 0, 0, 0];
  board.push(row);
}

function adjacent(knight) {
  let x = knight[0];
  let y = knight[1];
  let moves = [];

  // Move the piece by 1 position on the x-axis, and by 2 on the y-axis
  for (let i = x - 1; i < x + 2; i++) {
    if (i == x || i < 0 || i > 7) continue;
    for (let j = y - 2; j < y + 3; j += 2) {
      if (j == y || j < 0 || j > 7) continue;
      moves.push([i, j]);
    }
  }

  // Move the piece by 1 position on the y-axis, and by 2 on the x-axis
  for (let i = y - 1; i < y + 2; i++) {
    if (i == y || i < 0 || i > 7) continue;
    for (let j = x - 2; j < x + 3; j += 2) {
      if (j == x || j < 0 || j > 7) continue;
      moves.push([j, i]);
    }
  }

  return moves;
}

function knightsTravails(currentPosition, endPosition) {
  // Initialize empty arrays + objects
  const visited = [];
  const queue = [];
  const path = {};

  // Mark every possible move the knight has from the current position in a list
  let adjacencyList = adjacent(currentPosition);

  // For each position, push them to a queue, and update the path object with that position as a key
  adjacencyList.forEach((vertex) => {
    queue.push(vertex);
    path[vertex] = [currentPosition, vertex];
  });

  // Keep adding to the queue until the end position is found
  while (queue.length != 0) {
    let current = queue.shift();
    visited.push(current);
    if (current[0] == endPosition[0] && current[1] == endPosition[1])
      return path[current];
    else {
      // Add all vertices of each current vertex to the queue, and update their paths accordingly
      let next = adjacent(current);
      next.forEach((vertex) => {
        if (!visited.includes(vertex)) {
          queue.push(vertex);
          path[vertex] = [...path[current], vertex];
        }
      });
    }
  }
}
