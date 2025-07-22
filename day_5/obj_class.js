#!/usr/bin/env node

const achraf = {
  firstname :"Achraf",
  lastname : "Ezzaam",
  age : 31,
  
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  },

  set fullname(new_fullname) {
    save = new_fullname.split(" ");
    this.firstname = save[0];
    this.lastname = save[1];
  },
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  compareAge(person) {
    if (person.age > this.age) {
      console.log(`${person.name} is older than me`);
    } else if (person.age < this.age) {
      console.log(`${person.name} is younger than me`);
    } else {
      console.log(`${person.name} is the same age as me`);
    }
  }
}

function mostOccurred(numbers) {
  let save = {};
  numbers.forEach(elem => {
    save[elem] = (save[elem] || 0) + 1;
  });

  let most_occ = "";
  for (elem in save) {
    if (save[elem] > most_occ) {
      most_occ = elem;
    }
  }
  return most_occ;
}


