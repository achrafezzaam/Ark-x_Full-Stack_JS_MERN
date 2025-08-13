#!/usr/bin/env node

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const askQuestion = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const name = await rl.question("Enter your name: ");
  const phone = await rl.question("Enter your phone number: ");
  
  rl.close();

  return [name, phone];
};

const main = async () => {
  const data = await askQuestion();
  console.log(data);
}

main();
