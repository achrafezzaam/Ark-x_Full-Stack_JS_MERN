const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to ensure users.json exists before reading/writing
const initializeUsersFile = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
    }
};

// Reads all users from the JSON file
const readUsers = () => {
    try {
        initializeUsersFile();
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

// Writes an array of users to the JSON file
const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to users file:', error);
    }
};

// Adds a new user with a generated ID and PIN
const addUser = (name) => {
    const users = readUsers();
    const newAccountId = `ACC${1001 + users.length}`;
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();

    const newUser = {
        accountID: newAccountId,
        name,
        pin: newPin,
        balance: 0,
        transactions: [],
    };

    users.push(newUser);
    writeUsers(users);
    return newUser;
};

// Finds a user by account ID and PIN for authentication
const findUser = (accountID, pin) => {
    const users = readUsers();
    return users.find(user => user.accountID === accountID && user.pin === pin);
};

// Updates a specific user's data
const updateUser = (updatedUser) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.accountID === updatedUser.accountID);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        writeUsers(users);
        return true;
    }
    return false;
};

module.exports = { addUser, findUser, updateUser };
