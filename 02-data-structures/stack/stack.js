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

    pop() {
        if (!this.top) {
            return null;
        }
        const poppedNode = this.top;
        this.top = this.top.next;
        this.size--;
        return poppedNode.value;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());
