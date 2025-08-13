const inquirer = require('inquirer');
const userManager = require('./userManager');
const ATM = require('./atm');

const atm = new ATM();

// --- Event Listeners Setup ---
// These listeners handle the logic when an event is emitted from the ATM class.

atm.on('deposit', ({ user, amount }) => {
    user.balance += amount;
    user.transactions.push({
        type: 'deposit',
        amount: amount,
        date: new Date().toISOString().slice(0, 10) // Format: YYYY-MM-DD
    });
    userManager.updateUser(user);
    console.log(`\n✅ Deposit successful. New balance: $${user.balance.toFixed(2)}`);
    atm.emit('operationComplete', user);
});

atm.on('withdraw', ({ user, amount }) => {
    if (amount > user.balance) {
        console.error('\n❌ Error: Insufficient funds.');
    } else {
        user.balance -= amount;
        user.transactions.push({
            type: 'withdraw',
            amount: amount,
            date: new Date().toISOString().slice(0, 10)
        });
        userManager.updateUser(user);
        console.log(`\n✅ Withdrawal successful. New balance: $${user.balance.toFixed(2)}`);
    }
    atm.emit('operationComplete', user);
});

// This event brings the user back to the authenticated menu after an operation.
atm.on('operationComplete', (user) => {
    setTimeout(() => authenticatedMenu(user), 1500); // Delay for readability
});

// --- CLI Menu Functions ---

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Welcome to the ATM! 🤑 What would you like to do?',
            choices: ['Login', 'Create New Account', 'Exit'],
        },
    ]);

    switch (action) {
        case 'Login': await login(); break;
        case 'Create New Account': await createAccount(); break;
        case 'Exit':
            console.log('\nThank you for using the ATM. Goodbye! 👋');
            process.exit(0);
    }
};

const login = async () => {
    const credentials = await inquirer.prompt([
        { type: 'input', name: 'accountID', message: 'Enter your Account ID:' },
        { type: 'password', name: 'pin', message: 'Enter your PIN:', mask: '•' },
    ]);

    const user = userManager.findUser(credentials.accountID, credentials.pin);

    if (user) {
        console.log(`\nWelcome, ${user.name}!`);
        authenticatedMenu(user);
    } else {
        console.error('\n❌ Error: Invalid Account ID or PIN. Please try again.');
        setTimeout(mainMenu, 1500);
    }
};

const createAccount = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter your full name:",
            validate: input => input ? true : 'Name cannot be empty.'
        }
    ]);

    const newUser = userManager.addUser(name);
    console.log('\n✅ Account created successfully!');
    console.log('--- Please save these details securely ---');
    console.log(`   Account ID: ${newUser.accountID}`);
    console.log(`   PIN: ${newUser.pin}`);
    console.log('-----------------------------------------');
    setTimeout(mainMenu, 4000); // Give user time to read details
};

const authenticatedMenu = async (user) => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an operation:',
            choices: ['Check Balance', 'Deposit Money', 'Withdraw Money', 'View Transaction History', 'Logout'],
        },
    ]);

    switch (action) {
        case 'Check Balance': atm.checkBalance(user); break;
        case 'Deposit Money': await handleTransaction(user, 'deposit'); break;
        case 'Withdraw Money': await handleTransaction(user, 'withdraw'); break;
        case 'View Transaction History': atm.viewTransactions(user); break;
        case 'Logout':
            console.log('\nLogged out successfully.');
            setTimeout(mainMenu, 1000);
            break;
    }
};

const handleTransaction = async (user, type) => {
    const { amount } = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: `Enter amount to ${type}:`,
            validate: value => (value > 0) ? true : 'Please enter a positive number.'
        }
    ]);

    if (type === 'deposit') {
        atm.deposit(user, amount);
    } else {
        atm.withdraw(user, amount);
    }
};

// --- Start Application ---
mainMenu();
