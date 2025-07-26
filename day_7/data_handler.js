#!/usr/bin/env node

const fetchUserData = async () => {
  try {
    const data = await fetch("https://dummyjson.com/users");
    const response = await data.json();
    const processedData = processUserData(response);
    const totalAge = summarizeAge(response);
    console.log("The male user info: ");
    processedData.map(line => console.log("- ", line));
    console.log('');
    console.log("The total users age is: ", totalAge);
  } catch (error) {
    console.error("ERROR: ", error)
  }
}

const processUserData = data => {
  filteredData = data.users.filter(user => user.gender === "male");
  MappedData = filteredData.map(({firstName, lastName, age}) => {return `Name: ${firstName} ${lastName}, Age:${age}`});
  return MappedData;
}

const summarizeAge = data => {
  filteredData = data.users.filter(user => user.gender === "male");
  return filteredData.reduce((counter, {age}) => counter + age, 0);
}

fetchUserData();