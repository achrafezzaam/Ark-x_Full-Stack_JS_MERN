#!/usr/bin/env node

arr = [1,3,1,6,1,6,8,7]

function BubbleSort(arr) {
  do {
    flag = false;
    for (let i = 0; i < arr.length - 1; i++) {
      let temp;
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        flag = true;
      }
    }
  } while (flag);
}
BubbleSort(arr);
console.log(arr);
