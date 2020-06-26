const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION',
    SUPPLY : 'SUPPLY'
}

class PubSub {
    constructor({blockchain, transactionPool, redisUrl, totalSupply}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.totalSupply = totalSupply;
        this.publisher = redis.createClient(redisUrl);
        this.subscriber = redis.createClient(redisUrl);

        this.subscribeToChannels();

        this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);

        const parsedMessage = JSON.parse(message);
  
        switch(channel) {
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, true, () => {
                    this.transactionPool.clearBlockchainTransactions({
                        chain: parsedMessage
                    });
                });
                break;
                
            case CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;

            case CHANNELS.SUPPLY :
                console.log('Parsed message ', parsedMessage);
                this.totalSupply.updateSupply(parsedMessage);
                break;

            default:
                return;
        }


    }

    subscribeToChannels() {
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        })
    }

    publish({channel, message}) {
        this.subscriber.unsubscribe(channel, () => {
            this.publisher.publish(channel, message, () => {
                this.subscriber.subscribe(channel);
            });
        });
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }

    broadcastSupply(newSupply){
        console.log("The new supply ",JSON.stringify(newSupply));
        this.publish({
            channel: CHANNELS.SUPPLY,
            message: JSON.stringify(newSupply)
        });
    }

}


module.exports = PubSub;