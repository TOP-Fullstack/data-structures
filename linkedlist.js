class Node {
  constructor(value, nextNode) {
    value ? (this.value = value) : (this.value = null);
    nextNode ? (this.nextNode = nextNode) : (this.nextNode = null);
  }
}

class LinkedList {
  constructor() {
    this.nodes = {};
  }

  // Add a node containing 'value' to the end of the list
  append(value) {
    let root = this.nodes;
    if (root.value == undefined) this.nodes = new Node(value, null);
    else {
      let currentNode = this.nodes;
      while (currentNode.nextNode != null) currentNode = currentNode.nextNode;
      currentNode.nextNode = new Node(value, null);
    }
  }

  // Add a new node containing 'value' to start of list
  prepend(value) {
    let root = this.nodes;
    let tmp = root;
    this.nodes = new Node(value, tmp);
  }

  // Return total number of nodes in list
  size() {
    // Initialize counter, check if there is a root node present
    let counter = 0;
    let root = this.nodes.value;
    if (root) counter++;

    // Loop through the nodes and add 1 to counter for every node found
    let currentNode = this.nodes;
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      counter++;
    }
    return counter;
  }

  // Return the fist node in the list
  head() {
    let head = this.nodes;
    head.nextNode = null;
    return head;
  }

  // Return last node in the list
  tail() {
    let tail = this.nodes;
    while (tail.nextNode != null) tail = tail.nextNode;
    return tail;
  }

  // Return node at a given index
  at(index) {
    let currentNode = this.nodes;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
    return currentNode;
  }

  // Remove last element from the list
  pop() {
    let currentNode = this.nodes;
    if (currentNode.nextNode == null) this.nodes = {};
    else {
      while (currentNode.nextNode.nextNode != null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = null;
    }
  }

  // Check if list contains a certain value
  contains(value) {
    let currentNode = this.nodes;
    if (currentNode.value == value) return true;
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      if (currentNode.value == value) return true;
    }
    return false;
  }

  // Return the index of the node containing 'value'
  find(value) {
    let index = 0;
    let currentNode = this.nodes;
    if (currentNode.value == value) return index;
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      index++;
      if (currentNode.value == value) return index;
    }
    return null;
  }

  toString() {
    let string = "";
    let currentNode = this.nodes;
    if (currentNode.value) string += `( ${currentNode.value} ) -> `;
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      string += `( ${currentNode.value} ) -> `;
    }
    return (string += "null");
  }

  // OPTIONAL TO-DO: Add insertAt(value, index) method
  // OPTIONAL TO-DO: Add removeAt(index) method
}
