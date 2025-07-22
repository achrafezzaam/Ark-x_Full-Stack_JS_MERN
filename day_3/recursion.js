#!/usr/bin/env node

let num = 5;

function factorial(number) {
  if (number == 1) {
    return 1;
  } else {
    return number * factorial(number - 1);
  }
}

console.log(factorial(num));
