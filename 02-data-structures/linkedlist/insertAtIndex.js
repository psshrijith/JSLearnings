class SingleLinkedList{
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
}