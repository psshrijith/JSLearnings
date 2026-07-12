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

    get(index){
        if(index < 0 || index >= this.length) return null;

        let current = this.head;
        let count = 0;
        while(current){
            if(count === index){
                return current;
            }
            current = current.next;
            count++;
        }
        return null;
    }

    set(index, val){
        let foundNode = this.get(index);
        if(foundNode){
            foundNode.val = val;
            return foundNode;
        }
        return null;
    }
}


const list = new DoublyLinkedList();
list.push(10);
list.push(20);
list.push(30);
list.push(40);
console.log(list.set(2, 100));
