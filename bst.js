#!/usr/bin/env node

class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
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
        return uniqueSortedArray
    }

}
