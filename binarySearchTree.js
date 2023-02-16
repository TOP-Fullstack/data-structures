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
    return [...new Set(sort(array))];
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

  insert(value) {}

  delete(value) {
    // Will have to deal with caes such as when
    // a node has children or not
  }

  find(value) {
    // Return node with given value
  }
}

const unsortedArray = [
  113, 171, 49, 136, 81, 64, 48, 191, 34, 172, 200, 4, 72, 185,
];
const tree = new Tree(unsortedArray);
console.time("Time: ");
tree.buildTree();
console.timeEnd("Time: ");
tree.insert("f");

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
function sort(array) {
  if (array.length <= 1) return array;
  let leftHalf = sort(array.slice(0, Math.floor(array.length / 2)));
  let rightHalf = sort(array.slice(Math.floor(array.length / 2), array.length));
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
