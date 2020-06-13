const uuid = require('uuid/v1');
const { verifySignature } = require('../util');
const { REWARD_INPUT, MINING_REWARD} = require( '../config');


 class Transaction {
 	constructor({ senderWallet,recipient,amount,outputMap,input}) {
 		this.id = uuid();
 		this.count = 1;																///////////////////////////////////////////////// count
 		this.outputMap = outputMap || this.createOutputMap({senderWallet ,recipient, amount});
 		this.input = input|| this.createInput({senderWallet, outputMap: this.outputMap});
 	}

 	createOutputMap({senderWallet, recipient, amount}){
 		const outputMap = {};
 		outputMap[recipient] = amount;
 		outputMap[senderWallet.publicKey] = senderWallet.balance - amount -2;  /////////////////////////////////////////////////////////////////// delete -2
 		return outputMap;

 	}

 	createInput({senderWallet, outputMap}) {
 		return {
 			timestamp: Date.now(),
 			amount : senderWallet.balance,
 			address : senderWallet.publicKey,
 			signature :senderWallet.sign(outputMap) 
 		};
 	}

 	update({senderWallet,recipient,amount}){

 		if(amount + 2 > this.outputMap[senderWallet.publicKey])  {		///////////////////////////////////////////// delete +2
 			throw new Error('Amount exceeds balance');
 		}
 		this.count +=1;															/////////////////////////////////////////////////
 		if(!this.outputMap[recipient]){
 			this.outputMap[recipient] = amount; 
 		} else {
 			this.outputMap[recipient] = this.outputMap[recipient] + amount ;


 		}

 
 		
 		this.outputMap[senderWallet.publicKey] =
 		 this.outputMap[senderWallet.publicKey] - amount - 2 ;  ////////////////////////////////////////////////////////// delete -2
 		
 		this.input = this.createInput({senderWallet,outputMap:this.outputMap});




 	}

 	static validTransaction(transaction){
 		
 		const {count, input :{ address, amount, signature}, outputMap} =transaction;

 		const outputTotal = Object.values(outputMap)
 		.reduce((total,outputAmount) => total+ outputAmount);

 		if(amount !== (outputTotal + 2*count)){//////////////////////////////////////////////////outputtotal
 			
 			return false;
 		}

 		if(!verifySignature({publicKey: address, data : outputMap,signature})){
 			
 			return false;

 		}
 		return true;
 	}

 	static rewardTransaction({minerWallet,totalTransactionCount})
 	{
 		return new this ({
 			input : REWARD_INPUT,
 			outputMap :{ [minerWallet.publicKey]:MINING_REWARD + totalTransactionCount*2 } ///////////////////////////////////////////
 		});
 	}
 }

 module.exports = Transaction;