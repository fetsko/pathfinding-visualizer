import React, {Component} from "react";
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {Astar} from '../algorithms/astar';

import "./PathfindingVisualizer.css";

const START_ROW = 10;
const START_COL = 15;
const END_ROW = 10;
const END_COL = 25;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({grid})
  }
  
  resetGrid(){
    const grid = createGrid();
    this.setState({grid})
    for (let row = 0; row < 20; row++){
      const currentRow = [];
      for (let col =0; col < 50; col++){
        let node = grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className ='node';
      }
    }
    document.getElementById(`node-${START_ROW}-${START_COL}`).className ='node node-start';
    document.getElementById(`node-${END_ROW}-${END_COL}`).className ='node node-end';
  }

  handleMouseDown(row,col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }
  
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[END_ROW][END_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const {grid} = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[END_ROW][END_COL];
    const visitedNodesInOrder = Astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    //console.log(grid)
    return (
      <><div id="header">
          <button className="visualize-button" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra!
          </button>
          <button className="visualize-button" onClick={() => this.visualizeAstar()}>
            Visualize A *!
          </button>
          <button className="visualize-button" onClick={() => this.resetGrid()}>
            Reset!
          </button>
        </div>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const {row, col, isStart, isFinish, isWall} = node;
                return (
                  <Node
                    key = {nodeIndex}
                    col = {col}
                    row = {row}
                    isStart = {isStart}
                    isFinish = {isFinish}
                    isWall = {isWall}
                    mouseIsPressed = {mouseIsPressed}
                    onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                    onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
                    onMouseUp={() => this.handleMouseUp()}></Node>
                );
              })}
            </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++){
    const currentRow = [];
    for (let col =0; col < 50; col++){
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === END_ROW && col === END_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    fScore: Infinity,
  };
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};