const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('wallet', () => {
    let wallet, tp, transaction, recipient, sendAmount;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
        sendAmount = 50;
        recipient = 'r4nd-4ddr355';
        transaction = wallet.createTransaction(recipient, sendAmount, tp);
    });

    describe('creates a transaction twice', () => {
        beforeEach(() => {
            wallet.createTransaction(recipient, sendAmount, tp);
        });

        it('doubles the sendAmount `substracted` from the wallet balance', () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - sendAmount * 2);
        });

        it('clones the `sendAmount`output for  the reipient', () => {
            expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount))
            .toEqual([sendAmount, sendAmount]);
        });
    });
});