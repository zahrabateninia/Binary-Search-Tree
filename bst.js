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
        if(node.data === null || node.data === value) return node;

        if(value < node.data ){
           return this.findValue(node.left, value)
        }else{
           return this.findValue(node.right, value)
        }
        
      }

      levelOrder(callback = null){
        // if there's no node to traverse
        if(!this.root) return [];

        let queue = [this.root];
        let result = [];

        while(queue.length > 0){ 
          const node = queue.shift(); // remove the first element in the queue 
          result.push(node.data)

          if (node.left) queue.push(node.left)
          if (node.right) queue.push(node.right)

          if (callback) callback(node);


        }
        return result;
      }

      inOrder(callback = null){
        let result = []
        this.inorderTraversal(this.root, result, callback)
        return result;
      }

      inorderTraversal(node, result, callback){
        if(node === null) return;
        
        this.inorderTraversal(node.left, result, callback); // Traverse the left subtree in inorder
        result.push(node.data)  // add the root node to the result array
        if (callback) return callback(node)
        this.inorderTraversal(node.right, result, callback) // Traverse the right subtree in inorder

      }

      preOrder(callback = null){
        let result = []
        this.preOrderTraversal(this.root, result, callback)
        return result;
      }

      preOrderTraversal(node, result, callback){
        if(node === null) return;
        result.push(node.data) 
        if (callback) return callback(node)

        this.preOrderTraversal(node.left, result, callback);
        
        this.preOrderTraversal(node.right, result, callback)

      }

      postOrder(callback = null) {
        const result = [];
        this.postOrderTraversal(this.root, result, callback);
        return result;
      }
    
      postOrderTraversal(node, result, callback) {
          if (node === null) return;
          this.postOrderTraversal(node.left, result, callback);
          this.postOrderTraversal(node.right, result, callback);
          result.push(node.data);
          if (callback) callback(node);
      }
    // return the given node's height 
    // height of a node: number of edges on the longest path from the node to a leaf node
    height(node = this.root) {
      if (node === null) {
          return -1; // Height of null node is -1
      } else {
          // Recursively calculate the height of left and right subtrees
          let leftHeight = this.height(node.left);
          let rightHeight = this.height(node.right);
          // Return the maximum height of left and right subtrees, plus 1 for the current node
          return Math.max(leftHeight, rightHeight) + 1;
      }
  }

  // return number of edges in the path from a given node to the tree’s root node.
  depth(node){
    return this.findDepth(this.root, node, 0)
  }

  findDepth(currentNode, targetNode, depth){
    // base case
    if(currentNode === null || currentNode === targetNode){
      return depth;
    }

    if(targetNode.data < currentNode.data){
      return this.findDepth(currentNode.left, targetNode, depth + 1)
    }else{
      return this.findDepth(targetNode.right, targetNode, depth + 1)
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
console.log("\nFind 324:")
console.log(tree.find(324))
console.log("\nTree in breadth-first level order:")
console.log(tree.levelOrder())
console.log("\nTree in inOrder:")
console.log(tree.inOrder());
console.log("\nTree in preOrder:");
console.log(tree.preOrder())
console.log("\nTree in postOrder:");
console.log(tree.postOrder())
console.log("\nHeight of the node with the data of 8:")
console.log(tree.height(tree.find(8)))
console.log("\nDepth of the node with the data of 324:")
console.log(tree.depth(tree.find(324)))

