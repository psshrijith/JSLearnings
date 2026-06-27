class SingleLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
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
}