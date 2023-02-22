const mergeSort = require("./helpers/mergeSort");
const prettyPrint = require("./helpers/prettyPrint");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  cleanArray() {
    return [...new Set(mergeSort(this.array))];
  }

  arrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.arrayToBST(arr, start, mid - 1);
    node.right = this.arrayToBST(arr, mid + 1, end);
    return node;
  }

  buildTree() {
    this.array = this.cleanArray();
    this.root = this.arrayToBST(this.array, 0, this.array.length - 1);
  }

  insert(value, node = this.root) {
    if (node == null) return new Node(value);
    if (node.value == value)
      return console.log("Number already in use. No duplicates please.");
    if (value < node.value) node.left = this.insert(value, node.left);
    else {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, node) {
    if (node == null) return node;

    // If value is below current node's value, recurse either to the right or left
    if (value < node.value) node.left = this.delete(value, node.left);
    else if (value > node.value) node.right = this.delete(value, node.right);
    else {
      // If single branches found, return that branch
      if (node.left == null) return node.right;
      else if (node.right == null) return node.left;

      // Go to the right sub tree, traverse down the left side of that
      // until you reach the end (successor value)
      node.value = this.minValue(node.right);

      // Traverse the right subtree of the found node, this time
      // set the value to be deleted as the successor value
      node.right = this.delete(node.value, node.right);
    }
    return node;
  }

  // Find the successor value to a node by going down it's left sub-trees
  minValue(node) {
    let minv = node.value;
    while (node.left != null) {
      minv = node.left.value;
      node = node.left;
    }
    return minv;
  }

  // Accept a value and print the node with the given value
  find(value, node = this.root) {
    if (node == null) return console.log("Value not found");
    if (value < node.value) node = this.find(value, node.left);
    else if (value > node.value) node = this.find(value, node.right);
    else {
      console.log(node);
    }
  }

  // Breadth-first traversal of tree from root node
  levelOrder(node) {
    if (node == null) return;
    const queue = [];
    queue.push(node);
    while (queue.length != 0) {
      let current = queue[0];
      console.log(current.value);
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);
      queue.shift();
    }
  }

  // Tweaked the traversals so they return an array instead
  inorder(node = this.root, array = []) {
    if (node != null) {
      this.inorder(node.left, array);
      array.push(node.value);
      this.inorder(node.right, array);
    }
    return array;
  }

  preorder(node = this.root, array = []) {
    if (node != null) {
      array.push(node.value);
      this.preorder(node.left, array);
      this.preorder(node.right, array);
    }
    return array;
  }

  postorder(node = this.root, array = []) {
    if (node != null) {
      this.postorder(node.left, array);
      this.postorder(node.right, array);
      array.push(node.value);
    }
    return array;
  }

  // Return height of node (longest path from given node to leaf node)
  height(node) {
    if (node == null) return 0;
    else {
      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  // Return the number of edges from node to tree's root
  depth(node, root = this.root) {
    if (node == null) return console.log("Node not found");
    if (node.value == root.value) return 0;
    if (node.value < root.value) root = root.left;
    else root = root.right;
    return this.depth(node, root) + 1;
  }

  isBalanced(root = this.root) {
    if (root == null) return null;
    let difference =
      Math.abs(this.height(root.left) - this.height(root.right)) <= 1;
    this.isBalanced(root.left);
    this.isBalanced(root.right);
    return difference;
  }

  // Rebalance unbalanced tree
  rebalance() {
    this.array = this.inorder(this.root);
    this.root = this.arrayToBST(this.array, 0, this.array.length - 1);
  }

  print() {
    prettyPrint(this.root);
  }
}

module.exports = Tree;
