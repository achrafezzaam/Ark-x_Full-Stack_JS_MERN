#!/usr/bin/env node

arr = [0,4,7,10,14,23,45,47,53]

function binarySearch(arr, target) {
  if (arr.length == 0) {
    return "The number is not in the list";
  }
  let pivot = Math.floor(arr.length/2)
  if (arr[pivot] == target) {
    return "The number is in the list";
  } else if (arr[pivot] > target) {
    return binarySearch(arr.slice(0, pivot), target);
  } else {
    return binarySearch(arr.slice(pivot + 1), target);
  }
  return "The number is not in the list";
}

console.log(binarySearch(arr, 7));
