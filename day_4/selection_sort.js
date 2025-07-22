#!/usr/bin/env node

arr = [1,3,1,6,1,6,8,7]

console.log(arr);

function selectionSort() {
  for (let i = 0; i < arr.length; i++) {
    let smaller = i;
    for (let j = i + 1; j < arr.length; j++) {
      smaller = (arr[j] < arr[smaller]) ? j : smaller;
    }
    let temp = arr[i];
    arr[i] = arr[smaller];
    arr[smaller] = temp;
  }
}
