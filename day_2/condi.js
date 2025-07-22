#!/usr/bin/env node


const numbr = 45;
if (numbr%2 == 1) {
  console.log("The number is odd");
} else {
  console.log("The number is even");
}

const day = 5;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Unvalid Day");
}

let a = 15;
let b = 6;
let c = 12.6;

let max = a;

max = max < b ? b : max;
max = max < c ? c : max;

console.log(max);

const grade = 83;

if (grade > 85) {
  console.log("A");
} else if (grade <= 85 && grade > 70) {
  console.log("B");
} else if (grade <= 70 && grade > 55) {
  console.log("C");
} else if (grade <= 55 && grade > 40) {
  console.log("D");
} else if (grade <= 40 && grade > 15) {
  console.log("E");
} else {
  console.log("D");}

let test = "5" - 2;

console.log(test);
