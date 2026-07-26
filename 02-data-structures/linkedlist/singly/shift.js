class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  shift() {
    if (!this.head) return undefined;

    const removedNode = this.head;
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }
    return removedNode;
  }
}

const list = new SingleLinkedList();
console.log(list);
