const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTransactions = this.transactionPool.validTransactions();
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        // create a block consiting of the valid transactions
        const block = this.blockchain.addBlock(validTransactions);
        this.p2pServer.synchChains();
        this.transactionPool.clear();
        this.p2pServer.broadcastClearTransactions();
        return block;
    }
}

module.exports = Miner;