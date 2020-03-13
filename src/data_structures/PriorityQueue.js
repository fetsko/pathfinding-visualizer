// PriorityQueue class 
export class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // enqueue(item, priority)
    // add element to the queue as per priority
    enqueue2(node) 
    { 
        this.items.push(node);
    }
    enqueue(nodes) 
    { 
        for (const node of nodes){
            if (!this.items.includes(node)){
                this.items.push(node);
            }
        }
        //this.items.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }


    dequeue() 
    { 
        // return the dequeued element and remove it. 
        // if the queue is empty returns Underflow 
        if (this.isEmpty()) 
            return -1; 
        return this.items.shift(); 
    }

    front() 
    { 
        // returns the highest priority element 
        // in the Priority queue without removing it. 
        if (this.isEmpty()) 
            return -1; 
        return this.items[0]; 
    } 

    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length === 0; 
    } 
} 