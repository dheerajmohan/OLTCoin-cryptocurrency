# OLTCoin
OLTCoin is a cryptocurrency developed from scratch. The blockchain and cryptocurrency is developed in JavaScript and runs on a Node.js backend. A front end application developed in React.js is also available. Cryptocurrency is digital money. It works on a distributed platform with cryptographic techniques to safeguard the immutable transaction ledger. After the invention of the first cryptocurrency-Bitcoin, which is backed by a blockchain network, thousands of such currencies
have evolved differentiating each other in terms of their features and functionalities. OLT coin created in this project is deployed on top of a blockchain network. The network is secured by using the SHA-256 encryption scheme for finding the cryptographic hash of the individual blocks of the chain and Elliptic Curve Cryptography for digitally signing each transaction by a wallet. OLT coin can be deployed into the market in order to be used as a currency, once its legal
formalities and marketing techniques are completed.

### Technologies

OLTCoin uses a number of open source projects to work properly:

* [React] - HTML enhanced for web apps!
* [React Bootstrap] - great UI framework for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [Jest] - for test driven development
* [Redis] - Publisher/Subscriber mechanism

### Installation

OLTCoin requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server. Run the following commands in the project directory.

```sh
$ npm install 
$ npm run dev
```
Verify the deployment by navigating to the the following link

```sh
127.0.0.1:3000
```

This will create a node in the blockchain. To create peer nodes, run the following command in different terminals.

```sh
$ npm run dev-peer
```
The peers will run on a randomly chosen port in the range 3000-4000. The port number can be found out in the logs
You can use [Postman](https://www.postman.com/) for making different API Calls defined in the project.

### API Calls

The API calls in the project are implemented using the library [Express.js](https://expressjs.com/). Make sure to add localhost:<PORT_NAME> before each API.

Example: 

```sh
localhost:3000/api/blocks
```
- /api/blocks' - GET Request
The API fetches the blockchain at that instant of time and returns it.

- '/api/blocks/length' - GET Request
The API returns the length of the chain

- '/api/blocks/:id' - GET Request
The API returns the blocks corresponding to the id which is the paginated id sent by the
client-side application. The blockchain is reversed first so as to send the most recent
blocks. Only 5 blocks are sent for one page. For example, id = 1 returns the last 5
blocks, id = 2 returns blocks 6-10 etc.

- '/api/transact' - POST Request
The API receives the recipient public key and amount to be transferred in the body of the
request. It then checks in the transaction pool if there exists a transaction initiated by the
same node. If found, it calls the update() function, otherwise a new transaction is created
using createTransaction(). The transaction is added to the transaction pool and then
broadcasted to all the other nodes.

- '/api/transaction-pool-map' -GET Request
The API fetches the transaction pool of the blockchain at that instant of time and returns
it.

- '/api/mine-transaction' - GET Request
The API calls the mineTransactions() function and then redirects to ‘/api/blocks’ which
returns the new blockchain.

- '/api/wallet-info'- GET Request
The API returns the balance amount of the particular node/wallet by calling the
calculateBalance(). A JSON object containing the wallet’s public key and balance is
returned.

- ‘/api/known-addresses’ - GET Request
The API returns a list of unique addresses that were involved in the transactions of the
blockchain. It loops through all the transactions in each block of the chain and adds
unique addresses to an object named addressMap. The keys of this object are returned
as the result.

### Todos

 - Improve the UI
 - Deploy it as a fully functional public blockchain

