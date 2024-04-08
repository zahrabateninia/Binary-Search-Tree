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
        return this.constructBST(uniqueSortedArray, 0, uniqueSortedArray.length -1)
        
    }

    constructBST(array, start, end){
        // base case
        if(start>end){
            return null;
        }

        // get the middle element of the array and make it root
        

    }

}
