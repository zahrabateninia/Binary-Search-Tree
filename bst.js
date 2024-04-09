#!/usr/bin/env node

class Node{
    constructor(data){
        this.data = data;
        this.left = this.right = null;
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }

    // The buildTree function should return the level-0 root node.
    buildTree(array){
        // remove duplicates and sort array
        let uniqueArray = Array.from(new Set(array));
        let uniqueSortedArray = uniqueArray.sort((a, b) => a - b)
        return this.constructBST(uniqueSortedArray, 0, uniqueSortedArray.length -1)
        
    }

    constructBST(array, start, end){
        // base case
        if(start>end){
            return null;
        }

        // get the middle element of the array and make it root
        let mid = Math.floor((start+end)/2);
        let rootNode = new Node(array[mid])

        // recursive case ( recursively construct left and right subtrees)
        rootNode.left = this.constructBST(array, start, mid -1);
        rootNode.right = this.constructBST(array, mid+1, end);

        return rootNode;
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

      // A new key is always inserted at the leaf by maintaining the property of the binary search tree.
      //  We start searching for a key from the root until we hit a leaf node. Once a leaf node is found,
      //  the new node is added as a child of the leaf node. 
     

}

// Example usage:
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.prettyPrint(tree.root);
console.log(tree)