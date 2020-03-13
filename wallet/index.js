const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE} = require('../config');

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');

    }

    toString(){
        return `Wallet - 
            publicKey:  ${this.publicKey}
            balance:    ${this.balance}`;
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool, blockchain){
        console.log(`blockchain.chain: ${blockchain.chain}`);
        this.balance = this.calculateBalance(blockchain);
        
        if(amount > this.balance){
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);
        if(transaction){
            transaction.update(this, recipient, amount);
        }else{
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

    calculateBalance(blockchain){
        let balance = this.balance;
        let transactions = [];
        
        // get blockchain transactions
        blockchain.chain.forEach(block => block.data.forEach(transaction =>  {
            transactions.push(transaction);
        }));

        // select transactions  sent to his wallet
        const walletInputTs = transactions.filter(transaction => transaction.input.address === this.publicKey);
        
        let startTime = 0;
        if(walletInputTs.length > 0){  // reduce function returns undefined for empty arrays
            // select the most recent input transaction sent from this wallet
            const recentInputT = walletInputTs.reduce(
                (prev, curr) => prev.input.timestamp > curr.input.timestamp ? prev : curr
            );
            
            // get the most recent output amount sent to this wallet
            balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputT.input.timestamp;
        }

        // add all transaction output amounts sent to this wallet after the the most recent input
        transactions.forEach(transaction => {
            if( transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey){
                        balance += output.amount;
                    }
                });
            }
        });

        return balance;

    }

    static blockchainWallet(){
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}

module.exports = Wallet;