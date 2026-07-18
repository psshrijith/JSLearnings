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
                        current.left = val;
                        return this;
                    }
                }
                else{
                    current = current.left;
                }
            }
        }
    }
}

const binarySearchTree = new BinarySearchTree();
console.log(binarySearchTree.insert(100));



