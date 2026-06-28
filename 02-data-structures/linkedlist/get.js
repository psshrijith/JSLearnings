class SingleLinkedList{
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
}