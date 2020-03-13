export function Astar(grid, startNode, finishNode) {
    // primary function: return the visited nodes in an array
    // in the order they were visited
    // secondary function: prepare parameter for path finding
  
    // openSet contains nodes to be visited
    // closedSet contains nodes already visited (this is the array that gets returned for the visualization)
  
    var openSet = [];
    var closedSet = [];
    startNode.distance = 0;
    openSet.push(startNode);
    const dirs = [1, 0, -1, 0, 1];
    while (!!openSet.length) {
      openSet.sort((a, b) => a.fScore - b.fScore);
      const currentNode = openSet.shift();
      if (currentNode === finishNode) {
        return closedSet;
      } else {
        currentNode.isVisited = true;
        closedSet.push(currentNode);
        var i = 0;
        var j = 1;
        console.log(dirs.length); // 1 2 3 4
        while (j < dirs.length) {
          var col = currentNode.col + dirs[i];  // +1 0 -1 0
          var row = currentNode.row + dirs[j];  // 0 -1 0 +1
          if (
            col < grid[0].length &&
            col >= 0 &&
            row < grid.length &&
            row >= 0 &&
            !grid[row][col].isVisited &&
            !grid[row][col].isWall
          ) {
            const neighborNode = grid[row][col];
            if (currentNode.distance + 1 < neighborNode.distance) {
              // update distance and shortest path
              neighborNode.distance = currentNode.distance + 1;
              neighborNode.previousNode = currentNode;
              neighborNode.fScore = neighborNode.distance + heuristics(neighborNode, finishNode);
              if (!openSet.includes(neighborNode)) openSet.push(neighborNode);
            }
          }
          j++;
          i++;
        }
      }
    }
    // if the openSet is empty and end target has not been reached
    // there is no viable path
    return closedSet;
}


function heuristics(node, finishNode){
    return Math.abs(node.col - finishNode.col) + Math.abs(node.row - finishNode.row)
}

export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}