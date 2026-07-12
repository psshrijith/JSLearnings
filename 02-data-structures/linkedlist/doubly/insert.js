class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val){
        const newNode = new Node(val);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    pop(){
        if(!this.head) return undefined;

        let removedNode = this.tail;

        if(this.length === 1){
            this.head = null;
            this.tail = null;
        }
        else{
            this.tail = removedNode.prev;
            this.tail.next = null;
            removedNode.prev = null;
        }
        this.length--;
        console.log("this", this)
        return removedNode;
    }

    shift(){

        let removedNode = this.head;
        let nextNode = removedNode.next;

        nextNode.prev = null;
        this.head = nextNode;
        removedNode.next = null;

        this.length--;
        return removedNode;
    }

    unshift(val){
        const newNode = new Node(val);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            let oldHead = this.head;
            newNode.next = this.head;
            oldHead.prev = newNode;
            this.head = newNode;
            this.length++;
        }
        return this;
    }
}

const list = new DoublyLinkedList();
list.push(10);
list.push(20);
console.log(list.unshift(5));
