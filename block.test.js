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

	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({lastBlock, data});

		it('returns a Block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});

		it('sets the `data`', () => {
			expect(minedBlock.data).toEqual(data);
		});

		it('sets a `timestamp`', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		})
	});
});

