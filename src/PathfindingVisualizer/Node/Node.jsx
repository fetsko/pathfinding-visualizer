import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    render() {
        const {
            col,
            row,
            isStart,
            isFinish,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        const extraClassName = isStart
         ? 'node-start' 
         : isFinish ? 'node-end' 
         : isWall ? 'node-wall'
         : '';

        return <div
            id={`node-${row}-${col}`} 
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row,col)}
            onMouseEnter={() => onMouseEnter(row,col)}
            onMouseUp={() => onMouseUp(row,col)}></div>;
    }
}