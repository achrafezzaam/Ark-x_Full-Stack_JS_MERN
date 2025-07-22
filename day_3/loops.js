#!/usr/bin/env node

let num = 5;
let fact = 1;

for (let i = 1; i <= num; i++) {
  fact *= i;
}

console.log(fact);

var num_1 = 10000000000000;
let n = 0;
do {
  n += 1;
} while (num_1/(10**n) >= 1)

console.log(n);

for (let i = 0; i < 4; i++) {
  console.log(" ".repeat(3-i) + "*".repeat(2*i+1));
}
console.log(" ".repeat(3) + "|");
