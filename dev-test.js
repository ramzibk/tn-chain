const Block = require('./blockchain/block');

const genesis = Block.genesis();
console.log(genesis.toString());
