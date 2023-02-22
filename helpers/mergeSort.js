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

module.exports = mergeSort;
