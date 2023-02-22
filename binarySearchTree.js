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

  cleanArray(array) {
    return [...new Set(mergeSort(array))];
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
    this.array = this.cleanArray(this.array);
    this.root = this.arrayToBST(this.array, 0, this.array.length - 1);
  }

  insert(value) {
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
  find(value) {
    if (node == null) return console.log("Value not found");
    if (value < node.value) node = this.find(value, node.left);
    else if (value > node.value) node = this.find(value, node.right);
    else {
      console.log(node);
    }
  }

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

  inorder(node) {
    if (node != null) {
      this.inorder(node.left);
      console.log(node.value);
      this.inorder(node.right);
    }
  }

  preorder(node) {
    if (node != null) {
      console.log(node.value);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  postorder(node) {
    if (node != null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.value);
    }
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

  print() {
    prettyPrint(this.root);
  }
}

const unsortedArray = [
  5, 20, 15, 2, 3, 6, 19, 7, 24, 28, 39, 12, 11, 17, 24, 30,
];
const tree = new Tree(unsortedArray);
tree.buildTree();
const treeRoot = tree.root;
tree.print(treeRoot);
//
//
//
//
//
//
//
//
//
// Helper functions below
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// Code provided by odin to print the tree to the console
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

// Merge sort algorithm from previous section
function mergeSort(array) {
  if (array.length <= 1) return array;
  let leftHalf = mergeSort(array.slice(0, Math.floor(array.length / 2)));
  let rightHalf = mergeSort(
    array.slice(Math.floor(array.length / 2), array.length)
  );
  return merge(leftHalf, rightHalf);
}

function merge(leftHalf, rightHalf) {
  let a = 0,
    b = 0,
    c = [],
    totalLength = leftHalf.length + rightHalf.length;

  for (let counter = 0; counter < totalLength; counter++) {
    if (a == leftHalf.length) {
      for (let k = b; k < rightHalf.length; k++) {
        c.push(rightHalf[k]);
      }
      return c;
    }

    if (b == rightHalf.length) {
      for (let k = a; k < leftHalf.length; k++) {
        c.push(leftHalf[k]);
      }
      return c;
    }

    if (leftHalf[a] < rightHalf[b]) {
      c.push(leftHalf[a]);
      a++;
    } else {
      c.push(rightHalf[b]);
      b++;
    }
  }
  return c;
}
