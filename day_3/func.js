#!/usr/bin/env node

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

var num_1 = 10000000000000;
function nDigits(number) {
  let n = 0;
  do {
    n += 1;
  } while (num_1/(10**n) >= 1)
  return n;
}

function numberToDay(number) {
  switch (number) {
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
}

function max(a, b, c) {
  let max = a;

  max = max < b ? b : max;
  max = max < c ? c : max;

  return max;
}

function myGrade(score) {

  if (score > 85) {
    console.log("A");
  } else if (score <= 85 && score > 70) {
    console.log("B");
  } else if (score <= 70 && score > 55) {
    console.log("C");
  } else if (score <= 55 && score > 40) {
    console.log("D");
  } else if (score <= 40 && score > 15) {
    console.log("E");
  } else {
    console.log("D");
  }
}

function combinator(n, p) {
  return factorial(n) / (factorial(p)*factorial(n-p))
}

function calculator(a, op, b) {
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function mul(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }

  function mod(a, b) {
    return a % b;
  }

  switch (op) {
    case "+":
      console.log(add(a, b));
      break;
    case "-":
      console.log(sub(a, b));
      break;
    case "*":
      console.log(mul(a, b));
      break;
    case "/":
      console.log(div(a, b));
      break;
    case "%":
      console.log(mod(a, b));
      break;
    case "c":
      console.log(combinator(a, b));
  }
}
