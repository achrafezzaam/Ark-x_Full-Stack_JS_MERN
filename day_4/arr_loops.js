#!/usr/bin/env node

function sum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

function countEven(numbers) {
  let evenCount = 0;
  for (let i = 0; i < numbers.length; i++) {
    evenCount += (numbers[i]%2 == 0) ? 1 : 0;
  }
  return evenCount;
}

function double(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = 2 * numbers[i];
  }
}

function sockMerchant(socks) {
  let count = {};
  let pairs = 0;
  socks.forEach( elem => {
    count[elem] = (count[elem] || 0) + 1;
  });
  for (elem in count) {
    pairs += Math.floor(count[elem] / 2);
  };
  return pairs;
}
