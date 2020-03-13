import {PriorityQueue} from '../data_structures/PriorityQueue'

export function dijkstra(grid, start, finishNode){
    console.log('TESTING!!!');
    let visitedNodesInOrder = [];
    console.log(visitedNodesInOrder);
    let pq = new PriorityQueue();
    start.distance = 0;
    pq.enqueue2(start);
    //console.log('BEFORE LOOP');
    while (!pq.isEmpty()){
        //console.log('IN LOOP');
        let minNode = pq.dequeue();
        //console.log(minNode);
        //console.log(minNode.distance);
        if (minNode.isWall) continue;
        if (minNode.distance === Infinity) return visitedNodesInOrder;
        minNode.isVisited = true;
        visitedNodesInOrder.push(minNode);
        if (minNode === finishNode) return visitedNodesInOrder;
        let unvisitedNeighbors = getUnvisitedNeighbors(minNode, grid);
        pq.enqueue(unvisitedNeighbors);
    }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row-1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    let neighbors2 = neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of neighbors2){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
    return neighbors2;
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