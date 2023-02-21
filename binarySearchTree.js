/*
To-do:
- 
- Find function
- Level Order
- preorder, inorder, postorder traversal
- Height Function
- Depth
- isBalance
- reBalance
*/

class Node {
  constructor(data) {
    this.data = data;
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

  insert(value, node = this.root) {
    if (node == null) return new Node(value);
    if (node.data == value)
      return console.log("Number already in use. No duplicates please.");
    if (value < node.data) node.left = this.insert(value, node.left);
    else {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, root = this.root) {
    if (root == null) return root;

    // If value is below current node's data, recurse either to the right or left
    if (value < root.data) root.left = this.delete(value, root.left);
    else if (value > root.data) root.right = this.delete(value, root.right);
    else {
      // If single branches found, return that branch
      if (root.left == null) return root.right;
      else if (root.right == null) return root.left;

      // Go to the right sub tree, traverse down the left side of that
      // until you reach the end (successor value)
      root.data = this.minValue(root.right);

      // Traverse the right subtree of the found node, this time
      // set the value to be deleted as the successor value
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  // The successor value is always in the right-side branch, then as far left as you can go
  minValue(root) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
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
// tree.delete(39);
tree.print();

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
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
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
