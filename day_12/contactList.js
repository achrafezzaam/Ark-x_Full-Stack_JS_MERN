#!/usr/bin/env node

import * as readline from 'readline';

const askQuestion1 = () => {
  const rl1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl1.question("Enter your name: ", (entry) => {
    rl1.close();
    askQuestion2(entry); 
  });
};

const askQuestion2 = (name) => {
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl2.question("Enter your phone number: ", (entry) => {
    rl2.close();
    return [name, entry]
  });
};

const data = askQuestion1();

