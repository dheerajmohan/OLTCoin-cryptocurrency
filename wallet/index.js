const { STARTING_BALANCE} = require('../config');
const { ec,cryptoHash } = require('../util');
const Transaction = require('./transaction')

class Wallet {
	constructor({totalSupply, pubsub}) {

		this.pubsub = pubsub;

		if ( totalSupply.currentSupply >= STARTING_BALANCE ) {
			this.balance = STARTING_BALANCE;
            		totalSupply.updateSupply(totalSupply.currentSupply - STARTING_BALANCE);
            		this.pubsub.broadcastSupply(totalSupply.currentSupply - STARTING_BALANCE);
            		console.log('TotalSupply', totalSupply.currentSupply);
        	}

        	else {
            		this.balance = 0 ;
        	}

		this.keyPair = ec.genKeyPair();

		this.publicKey = this.keyPair.getPublic().encode('hex');
	}

	sign(data){
		return this.keyPair.sign(cryptoHash(data))
	}

	createTransaction({recipient,amount, chain}){

		if(!amount || amount<1) {
            throw new Error('Invalid amount');  //new addition
        }

        if(recipient === this.publicKey) {
            throw new Error('Recipient address is same as yours'); //new addition
        }
        
        if (chain) {
            this.balance = Wallet.calculateBalance({ chain, address: this.publicKey });
        }   
        if (amount+2 > this.balance){   //changed
            throw new Error ('Amount exceeds the balance');
        }

        return new Transaction({ senderWallet : this, recipient, amount });
    }

	static calculateBalance({chain,address}){
		let hasConductedTransaction = false;

		let outputsTotal = 0;
		for (let i=chain.length-1; i>0 ;i--){

			const block = chain[i];

			for (let transaction of block.data){
				if(transaction.input.address === address){
				 hasConductedTransaction = true;
				}

				const addressOutput = transaction.outputMap[address];

				if(addressOutput) {
					outputsTotal = outputsTotal + addressOutput;

				}
			}
			if(hasConductedTransaction){
				break;
			}
		}

		return hasConductedTransaction ? outputsTotal: STARTING_BALANCE + outputsTotal;
	}
}; 

module.exports = Wallet;