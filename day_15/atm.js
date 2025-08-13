const EventEmitter = require('events');

class ATM extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * The methods below do not contain logic. They simply emit events.
     * The logic is handled by the event listeners in index.js.
     */

    checkBalance(user) {
        console.log(`\nYour current balance is: $${user.balance.toFixed(2)}`);
        this.emit('operationComplete', user);
    }

    deposit(user, amount) {
        this.emit('deposit', { user, amount });
    }

    withdraw(user, amount) {
        this.emit('withdraw', { user, amount });
    }

    viewTransactions(user) {
        console.log('\n--- Transaction History ---');
        if (user.transactions.length === 0) {
            console.log('No transactions found.');
        } else {
            // Sort transactions by date for better readability
            user.transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .forEach(tx => {
                    console.log(`Date: ${tx.date}, Type: ${tx.type.padEnd(8)}, Amount: $${tx.amount.toFixed(2)}`);
                });
        }
        console.log('---------------------------\n');
        this.emit('operationComplete', user);
    }
}

module.exports = ATM;
