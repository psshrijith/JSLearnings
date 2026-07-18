class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }

    insert(val){
        const newNode = new Node(val);
        if(this.root === null){
            this.root = newNode;
            return this;
        }

    }
}

const binarySearchTree = new BinarySearchTree();
console.log(binarySearchTree.insert(100));



