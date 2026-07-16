class Node{
    constructor(val){
        this.val = val;
        this.right = null;
        this.left = null;
    }
}

class BinarySearchTree{
    constructor(val){
        this.root = null;
    }
}

const tree = new BinarySearchTree();
tree.root = new Node(100);
tree.root.right = new Node(50);
tree.root.left = new Node(70);
