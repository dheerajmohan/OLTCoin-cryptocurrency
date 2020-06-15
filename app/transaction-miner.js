
const Transaction = require('../wallet/transaction');

class TransactionMiner {

	constructor({ blockchain,transactionPool,wallet,pubsub }) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.pubsub = pubsub;

	}

    mineTransactions() {

		const validTransactions = this.transactionPool.validTransactions();
		if(validTransactions.length === 0)
		{	this.transactionPool.clear(); return;}///////////////////////////////////////


		let totalTransactionCount =0 ; /////////////////////////////////////////
		for(let transaction of validTransactions){

			totalTransactionCount += transaction.count; /////////////////////
		}


		validTransactions.push(
			Transaction.rewardTransaction({minerWallet:this.wallet,totalTransactionCount})); ///////////////////////////////////

		this.blockchain.addBlock({data: validTransactions});

		this.pubsub.broadcastChain();
		console.log(this.transactionPool);

		this.transactionPool.clear();

 
	} 

}

module.exports = TransactionMiner;