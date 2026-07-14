class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val){
        const newNode = new Node(val);


        if(!this.first){
            this.first = newNode;
            this.last = newNode;
        }
        else{
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;
        return this;
    }

    dequeue(){
        if(!this.first){
            return null;
        }
        const removedNode = this.first;
        this.first = this.first.next;

        if(!this.first){
            this.last = null;
        }
        removedNode.next = null;
        this.size--;
        return removedNode.val;
    }
}

const queue = new Queue();
queue.enqueue(20);
queue.enqueue(30);
queue.dequeue();
