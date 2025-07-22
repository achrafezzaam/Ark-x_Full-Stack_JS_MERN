#!/usr/bin/env node

arr = [1,3,1,6,1,6,8,7]
console.log(arr);

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return `The number you're looking for is at the position: ${i}`;
    }
  }
}

console.log(linearSearch(arr, 6));
