class SingleLinkedList {
  insertAtIndex(index, value) {
    const newNode = new Node(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let count = 0;

    while (current) {
      current = current.next;
      count++;

      if (count === index - 1) {
        const nextNode = current.next;

        current.next = newNode;
        newNode.next = nextNode;
        return;
      }
    }
  }
}

const list = new SingleLinkedList();
console.log(list);
