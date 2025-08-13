# 🤑 ATM Management System

A simple command-line based ATM management system built with Node.js. This application demonstrates the use of Node.js core modules like `fs` for file system persistence and `events` for handling operations in an event-driven manner.

## Features

- **User Authentication**: Secure login using a unique Account ID and PIN.
- **Account Creation**: Onboard new users with automatically generated credentials.
- **Check Balance**: View current account balance.
- **Deposit**: Add funds to your account.
- **Withdraw**: Take money from your account with an insufficient funds check.
- **Transaction History**: View a log of all past transactions.
- **Data Persistence**: All user data and transactions are saved to a `users.json` file.
- **Interactive CLI**: A user-friendly command-line interface powered by `inquirer`.

## Project Structure

atm-management-system/
|- index.js              # Main application entry point, CLI logic
|- atm.js                # ATM class with EventEmitter for operations
|- userManager.js        # Handles all file I/O for users.json
|- users.json            # Database file for storing user data
|- package.json          # Project dependencies and scripts
|- README.md             # This file

## Setup and Installation

1.  **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed on your machine (version 14.x or higher is recommended).

2.  **Clone or Download**: Get the project files onto your local machine.

3.  **Install Dependencies**:
    Navigate into the project directory and install the required `inquirer` package by running:
    ```bash
    npm install
    ```

## How to Run

1.  Start the application by running the following command in your terminal from the project's root directory:
    ```bash
    node index.js
    ```
2.  The application will start, presenting you with the main menu to either **Login**, **Create New Account**, or **Exit**.

3.  If you are a new user, select **Create New Account** and follow the prompts. Your new Account ID and PIN will be displayed. Make sure to save them!

4.  Use your credentials to **Login**. Once authenticated, you will have access to all standard ATM operations.

## How It Works

This project is built on a few key principles:

-   **`userManager.js`**: This module acts as the data access layer. It is solely responsible for reading from, writing to, and updating the `users.json` file. All operations that modify user data go through this module.

-   **`atm.js`**: This module defines an `ATM` class that inherits from Node.js's `EventEmitter`. When an operation like `deposit` is requested, the `ATM` instance doesn't perform the action directly. Instead, it **emits** an event (e.g., `atm.emit('deposit', { ...data })`). This decouples the user's intent from the action's execution.

-   **`index.js`**: This file sets up the CLI and the **event listeners** (e.g., `atm.on('deposit', ...)`). These listeners contain the core logic. When an event is emitted, the corresponding listener catches it, performs the necessary calculations, updates the user object, and calls `userManager.js` to save the changes to the disk. This separation of concerns makes the code more modular and easier to manage.
