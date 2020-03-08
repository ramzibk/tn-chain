const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');

describe('wallet', () => {
    let wallet, tp, transaction, recipient, sendAmount, bc;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
        sendAmount = 50;
        recipient = 'r4nd-4ddr355';
        bc = new Blockchain();
        transaction = wallet.createTransaction(recipient, sendAmount, tp, bc);
    });

    describe('creates a transaction twice', () => {
        
        beforeEach(() => {
            wallet.createTransaction(recipient, sendAmount, tp, bc);
        });

        it('doubles the sendAmount `substracted` from the wallet balance', () => {
            console.log(JSON.stringify(bc));

            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - sendAmount * 2);
        });

        it('clones the `sendAmount`output for  the reipient', () => {
            expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount))
            .toEqual([sendAmount, sendAmount]);
        });
    });
});