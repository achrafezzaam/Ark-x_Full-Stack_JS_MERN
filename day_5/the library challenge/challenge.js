#!/usr/bin/env node
const books = require("./books.json");

function priceOfBook(bookName) {
  // write your code here
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === bookName) {
      return books[i].price;
    }
  }
}

function affordableBooks(budget) {
  // write your code here
  let affBooks = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].price <= budget) {
      affBooks.push(books[i]);
    }
  }
  return affBooks;
}

function findBookByGenre(genre) {
  // write your code here
  new_list = [];
  for (let i = 0; i < books.length; i++) {
    genres = books[i].genres;
    for (let j = 0; j < genres.length; j++) {
      if (genres[j] === genre) {
        new_list.push(books[i]);
      }
    }
  }
  return new_list;
}

function groupByGenre() {
  // write your code here
  new_list = {};
  for (let i = 0; i < books.length; i++) {
    genres = books[i].genres;
    for (let j = 0; j < genres.length; j++) {
      if (!new_list[genres[j]]) {
        new_list[genres[j]] = []
      }
      new_list[genres[j]].push(books[i]);
    }
  }
  return new_list;
}

function sortBooksByPrice() {
  // write your code here
  for (let i = 1; i < books.length; i++) {
    let current = books[i];
    let j = i - 1;

    while(j >= 0 && books[j].price >= current.price) {
      books[j+1] = books[j];
      j--;
    }

    books[j+1] = current;
  }
  return books;
}

(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
    }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
    }
    if (Object.keys(groupByGenre()).length !== 30) {
      throw new Error("groupByGenre is not working properly.");
    }
    if (sortBooksByPrice()[0].price !== 5.99) {
      throw new Error("sortBooksByPrice is not working properly.");
    }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log(error);
  }
})();
