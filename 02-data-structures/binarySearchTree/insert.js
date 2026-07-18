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
        else{
            let current = this.root;
            while(true){
                if(val < current.val){
                    if(current.left === null){
                        current.left = newNode;
                        return this;
                    }
                    else {
                        current = current.left;
                    }
                }
                else{
                    if(current.right === null){
                        current.right = newNode;
                        return this;
                    }
                    else {
                        current = current.right;
                    }
                }
            }
        }
    }
}

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(100);
binarySearchTree.insert(120);
binarySearchTree.insert(80);
binarySearchTree.insert(70);
console.log(binarySearchTree.insert(60));



