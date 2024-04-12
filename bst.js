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
      insert(value){
        this.root = this.insertValue(this.root, value);
      }

      insertValue(node, value){
        // base case
        if(node === null){
          return new Node(value);
        }

        if(value < node.data){
          node.left = this.insertValue(node.left, value) 
        }
        else if(value > node.data){
          node.right = this.insertValue(node.right, value)
        }
        return node;
      }
     
      deleteItem(value){
        this.root = this.deleteNode(this.root, value);
      }

      // take the value and when its node is found delete the node and return the new root
      deleteNode(node, value){
        // base case
        if(node === null){
          return this.root;
        }

        if(value < node.data){
          node.left = this.deleteNode(node.left, value)
        }else if(value > node.data){
          node.right = this.deleteNode(node.right, value)
        }else{
          // Node with one child or no child
          if(node.left === null){
            return node.right;
          }else if(node.right === null){
            return node.left;
          }

          // Node with two children, we should find its inorder successor
          // Inorder Successor: the smallest value in the right subtree
          node.data = this.findInorderSuccessor(node.right)

          // Replace the inorder successor with the node to be deleted
          // And then delete the inorder successor in our right subtree

          // Delete the inorder successor
          node.right = this.deleteNode(node.right, node.data)

        }
        return node;
      }

      findInorderSuccessor(node){
        if(node === null){
          return null;
        }
        let inorderSucc = node.data;
        while(node.left !== null){
          inorderSucc = node.left.data;
          node = node.left 
        }
        return inorderSucc;
      }

      // Return the node with the given value
      find(value){
        return this.findValue(this.root, value)
      }

      findValue(node, value){
        // base case
        if(node.data === null || node.data === value) return node.data;

        if(value < node.data ){
           return this.findValue(node.left, value)
        }else{
           return this.findValue(node.right, value)
        }
        
      }

}

// Example usage:
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.prettyPrint(tree.root);
console.log(tree)
tree.deleteItem(67); 
console.log("\nTree after deletion of value 67:");
tree.prettyPrint(tree.root);
console.log(tree.find(324))
tree.prettyPrint(tree.root)