# 🪙 TN-Chain

**TN-Chain** is a simple **blockchain and cryptocurrency implementation from scratch** written in **Node.js and TypeScript**, with unit tests in **Jest**.
This project demonstrates fundamental blockchain concepts such as blocks, hashing, wallets, and transactions — built as a learning and portfolio project.

---

## 🚀 Overview

This repository contains a minimal blockchain system you can run locally to understand how a blockchain works internally.
It is **not production-grade**, but is suitable for learning, demos, and showcasing backend and distributed-system thinking.

Key components include:

* 🔗 Blockchain structure
* 🧱 Blocks and hashing
* 💼 Wallets and basic transactions
* 🧪 Unit tests using Jest
* 📦 Built with Node.js & TypeScript

---

## 🧠 Features

* Custom blockchain data structure
* Wallet generation and transaction creation
* Proof-of-Work concepts (simple mining)
* TypeScript for type safety and clarity
* Test suite validating blockchain integrity

---

## 📁 Tech Stack

| Category  | Technologies        |
| --------- | ------------------- |
| Language  | Node.js, TypeScript |
| Testing   | Jest                |
| Dev Tools | npm                 |

---

## 📦 Getting Started

### Go into the project folder:

```bash
cd tn-chain
```

### Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Project

To compile the TypeScript and run the application:

```bash
npm run build
npm start
```

---

## 🧪 Running Tests

To execute the unit tests with Jest:

```bash
npm test
```

Your test suite validates core blockchain functionality, such as block creation, chain validation, and wallet behavior.

---

## 📜 Project Structure

```
.
├── app/                # Application entry points and logic
├── blockchain/         # Core blockchain classes and logic
├── wallet/             # Wallet and transaction modules
├── jest.config.js      # Jest testing config
├── tsconfig.json       # TypeScript config
├── package.json        # Dependencies + scripts
```

---

## 🛠 How It Works (High Level)

This simple blockchain demonstrates:

* Block creation with hashes
* Chain linking via previous block hashes
* Transactions between wallets
* Basic proof-of-work / mining concept
* Test cases validating integrity

This project is educational in nature and **not intended as a secure or decentralized currency implementation.**

---

## 🙌 Contributions

Contributions are welcome! You can help by:

* Adding new features (e.g., networking nodes, consensus mechanisms)
* Improving tests and documentation
* Refactoring or optimizing code

To contribute:

1. Fork this repository
2. Create a new feature branch
3. Submit a pull request

---

## 📝 License

Feel free to use and adapt this project. If you choose to add a license, include it here — e.g., MIT, Apache 2.0, etc.

