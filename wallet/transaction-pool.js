const Transaction = require('../wallet/transaction');

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);
        if(transactionWithId){
            this.transactions[this.transactions.indexOf(transactionWithId)]= transaction;
        }else{
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
    }

    validTransactions(){
        return this.transactions.filter( transaction => {
            // verify that the transaction outputs amount equals the input amount
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amount;
            },0);
            
            if( transaction.input.amount !== outputTotal){
                console.log(`Invalid transaction from ${transaction.input.address}.`);
                // skip this invalid transaction
                return;
            }
            // verify the signature of the transaction
            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Invalid signature from ${transaction.input.address}.`);
                // skip the transaction with invalid signature
                return;
            }

            return transaction;
        });
    }

    clear(){
        this.transactions = [];
    }
}

module.exports = TransactionPool;