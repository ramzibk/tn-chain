const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(timestamp, lastHash, hash, data){
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString(){
     return `Block -
     Timestamp: ${this.timestamp}
     LastHash:  ${this.lastHash.substring(0, 10)}
     Hash:      ${this.hash.substring(0, 10)}
     Data:      ${this.data}`
  }

  static genesis(){
    return new this(Date.now(),"---------",SHA256("GenesisBlock"+Date.now()).toString(),["Genesis data"]);
  }

  mineBlock(lastBlock, data){
     const timestamp = Date.now();
     const lastHash = lastBlock.hash;
     const hash = hash(timestamp, lastHash, data);
     return new Block(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, hash, data){
    return SHA256('${timestamp}${lastHash}${data}').toString();
  }
}

module.exports = Block;
