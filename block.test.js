const Block = require('./block');
const {GENESIS_DATA} = require('./config');

describe('Block', () => {
	const timestamp = 'date';
	const lastHash = 'lhash' ;
	const hash = 'hash';
	const data = 'data';
	const block = new Block({
		timestamp: timestamp,
		lastHash: lastHash,
		hash: hash,
		data: data
	});
	it('has all the properties', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
	});

	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		console.log(genesisBlock);

		it('returns a Block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});

		it('returns the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
	});
});


const { GENESIS_DATA } = require('./config')

class Block {
	constructor({timestamp, lastHash, hash, data}) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}

	static genesis() {
		return new this(GENESIS_DATA);
	}
}

module.exports = Block;

const Block = require('./block');
const {GENESIS_DATA} = require('./config');

describe('Block', () => {
	const timestamp = 'date';
	const lastHash = 'lhash' ;
	const hash = 'hash';
	const data = 'data';
	const block = new Block({
		timestamp: timestamp,
		lastHash: lastHash,
		hash: hash,
		data: data
	});
	it('has all the properties', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
	});

	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		console.log(genesisBlock);

		it('returns a Block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});

		it('returns the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
	});
});