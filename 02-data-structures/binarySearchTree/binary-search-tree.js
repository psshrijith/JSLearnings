class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (val < current.val) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (val > current.val) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        } else {
          return;
        }
      }
    }
  }

  search(searchValue) {
    if (this.root === null) {
      return 'Root not found';
    }
    let current = this.root,
      found = false;
    while (current && !found) {
      if (searchValue < current.val) {
        current = current.left;
      } else if (searchValue > current.val) {
        current = current.right;
      } else {
        found = true;
      }
    }
    return false;
  }

  bfs(target) {
    const queue = [];
    const visited = [];
    let node = [];

    queue.push(this.root);
    while (queue.length) {
      node = queue.shift();
      visited.push(node.val);
      if (node.val === target) return node;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return visited;
  }

  dfsInorder() {
    const visited = [];
    const stack = [];
    let current = this.root;

    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      visited.push(current.val);
      current = current.right;
    }
    return visited;
  }
}

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(100);
binarySearchTree.insert(120);
binarySearchTree.insert(80);
binarySearchTree.insert(70);
binarySearchTree.insert(60);
binarySearchTree.bfs(80);
console.log(binarySearchTree.dfsInorder());
