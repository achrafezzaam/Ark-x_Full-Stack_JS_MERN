#!/usr/bin/env node

const firstname = "Achraf";
const lastname = "Ezzaam";
const PI = 3.14;
const radius = 684;
const favoriteSuperhero = "Spide-man miles morales";
const favoriteQuote = "Difficult roads often leads to beautiful destinations";

const fullname = firstname + " " + lastname;
const area = PI * radius**2;
const perimeter = 2*PI*radius;
const motivation = "A wise man named " + favoriteSuperhero + ": " + favoriteQuote;

let a = 3;
let b = 10;

let save = a;
a = b;
b = save;

console.log("After swapping: a = ", a, " and b = ", b); // should output: After swapping: a = 10 and b = 5
