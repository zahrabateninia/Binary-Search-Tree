# Binary Search Tree (BST)

This JavaScript module (`bst.js`) provides classes to work with binary search trees (BSTs). It includes implementations for creating a binary search tree from an array, inserting elements, deleting elements, searching for elements, traversing the tree in various orders, checking if the tree is balanced, and rebalancing the tree.

### Installation

Copy the `bst.js` file to your project directory.

### Importing

Import the `Tree` class into your JavaScript file:

```javascript
const Tree = require('./bst.js');
```

## Methods

### `constructor(array)`

Creates a new binary search tree instance with nodes initialized from the elements of the given array.

### `insert(value)`

Inserts a new value into the binary search tree while maintaining its properties.

### `deleteItem(value)`

Deletes the node with the given value from the binary search tree.

### `find(value)`

Searches for a node with the given value in the binary search tree and returns it if found.

### `inOrder(callback)`

Performs an inorder traversal of the binary search tree, executing the specified callback function for each visited node.

### `preOrder(callback)`

Performs a preorder traversal of the binary search tree, executing the specified callback function for each visited node.

### `postOrder(callback)`

Performs a postorder traversal of the binary search tree, executing the specified callback function for each visited node.

### `levelOrder(callback)`

Performs a level order traversal of the binary search tree, executing the specified callback function for each visited node.

### `isBalanced()`

Checks if the binary search tree is balanced, i.e., if the difference in heights between the left and right subtrees of every node is not more than 1.

### `rebalance()`

Rebalances the binary search tree if it becomes unbalanced, ensuring optimal performance for search, insertion, and deletion operations.

### `height(node)`

Returns the height of the given node in the binary search tree, i.e., the number of edges on the longest path from the node to a leaf node.

### `depth(node)`

Returns the depth of the given node in the binary search tree, i.e., the number of edges in the path from the node to the tree’s root node.

## Usage

For usage examples and further details on each method, refer to the comments and documentation within the `bst.js` file.
