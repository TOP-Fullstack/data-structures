const Tree = require("./binarySearchTree");

function generateArray(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let number = Math.floor(Math.random() * 100);
    array.push(number);
  }
  return array;
}

// Build the tree and store reference to the root
const unsortedArray = generateArray(23);
const tree = new Tree(unsortedArray);
tree.buildTree();
const root = tree.root;

// Check whether the tree is balanced.
// Print out all elements in pre, post, and in order
console.log(tree.isBalanced());
console.log(`Inorder - ${tree.inorder()},
Preorder - ${tree.preorder()},
Postorder - ${tree.postorder()}`);

// Unbalance the tree by adding several numbers over the max limit set in the generateArray funciton
tree.insert(250), tree.insert(150), tree.insert(111), tree.insert(211);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(`Inorder - ${tree.inorder()},
Preorder - ${tree.preorder()},
Postorder - ${tree.postorder()}`);
