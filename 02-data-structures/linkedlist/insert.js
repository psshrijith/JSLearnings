class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class SingleLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value){
        const newNode = new Node(value);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }


    pop(){
        if(!this.head) return undefined;

        let current = this.head;
        let newtail = current;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
            return current;
        }

        while(current.next){
            newtail = current;
            current = current.next;
        }

        this.tail =  newtail;
        this.tail.next = null;
        this.length--;

        return current;
    }

    shift(){
        if(!this.head) return undefined;

        let removedNode = this.head;
        this.head = this.head.next;
        this.length--;

        if(this.length === 0){
            this.tail = null;
        }

        return removedNode;

    }

    get(index){

        if(index > this.length -1 || index < 0) return;
        let current = this.head;
        let count = 0;
        while(current){
            if (index === count){
                return current;
            }
            current = current.next;
            count ++;
        }
    }

    set(searchIndex, newValue){
        let node = this.get(searchIndex);
        if (node !== undefined){
            node.val = newValue;
            return node;
        }
    }

    insertAtIndex(index, value){
        const newNode = new Node(value);
        let current = this.head;
        let count = 0;

        if(index === 0){
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        while(current){
            current = current.next;
            count++;

            if(count === index - 1){
                let nextNode = current.next;

                current.next = newNode;
                newNode.next = nextNode;
                return;
            }
        }   
    }

    remove(index){
        let current = this.head;
        let nextNode = current;
        let count = 0;

        if(index < 0 || index >= this.length) return undefined;

        if(index === 0){
            let removedNode = this.shift();
            return removedNode;
        }

        else if(index === this.length-1){
            let removedPop = this.pop();
            return removedPop;
        }

        while(current){
            current = nextNode;
            nextNode = current.next;
            count++;

            if(count === index){
                current.next = nextNode.next;
                this.length --;
                console.log("list", list)
                console.log(list.length)
                return nextNode;
            }
        }
    }

    removeWithGet(index){
        let receivedNode = this.get(index-1);
        let current = receivedNode;
        let nextNode = current.next;

    }
}

const list = new SingleLinkedList();
list.push(20);
list.push(30);
list.push(40);
list.push(100);
list.push(110);
list.removeWithGet(3);


