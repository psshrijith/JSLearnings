class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }   
}

class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.size++;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
