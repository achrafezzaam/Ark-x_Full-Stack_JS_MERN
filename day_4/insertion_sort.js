#!/usr/bin/env node

arr = [1,3,1,6,1,6,8,7]

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    while(j >= 0 && arr[j] >= current) {
      arr[j+1] = arr[j];
      j--;
    }

    arr[j+1] = current;
  }
}
