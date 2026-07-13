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

    insert(index, val){
        if (index < 0 || index > this.length) return;
        if (index === 0) {
            return this.unshift(val);
        }
        if (index === this.length) {
            return this.push(val);
        }
        let newNode = new Node(val);
        let foundNode = this.get(index);
        let previousNode = foundNode.prev;
        if(foundNode){
            newNode.prev = previousNode
            newNode.next = foundNode
        }
        previousNode.next = newNode;
        foundNode.prev = newNode;
        this.length++;
        return this;
    }

    remove(index){
        if (index < 0 || index > this.length-1) return;
        if (index === 0){
            return this.shift();
        }
        if (index === this.length-1){
            return this.pop();
        }
        const removedNode = this.get(index);
        const previousNode = removedNode.prev;
        const nextNode = removedNode.next;

        previousNode.next = removedNode.next;
        nextNode.prev = previousNode;

        removedNode.prev = null;
        removedNode.next = null;
        this.length--;
        return this;
    }
}


const list = new DoublyLinkedList();
list.push(10);
list.push(20);
list.push(30);
console.log(list.remove(1));
