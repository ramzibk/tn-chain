const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain Test', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('start with genesis block', () => {
      expect(bc.chain[0].data).toEqual(Block.genesis().data);  
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });;

    it('validates a chain', () => {
        bc2.addBlock('zoo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('validates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('goo');
        bc2.chain[1].data = 'corrupt data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock('boo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less than or equal to length', () =>{
        bc.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain); 
    });
});