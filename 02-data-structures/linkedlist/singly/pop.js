class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newtail = current;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return current;
    }

    while (current.next) {
      newtail = current;
      current = current.next;
    }

    this.tail = newtail;
    this.tail.next = null;
    this.length--;

    return current;
  }
}

const list = new SingleLinkedList();
console.log(list);
