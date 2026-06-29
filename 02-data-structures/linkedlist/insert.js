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
}

const list = new SingleLinkedList();
list.push(20);
list.push(30);
list.push(40);
list.push(100);
list.push(110);
console.log(list.remove(2));


