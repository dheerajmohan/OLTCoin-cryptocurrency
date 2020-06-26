const Transaction = require('./transaction')
const { STARTING_BALANCE, TOTAL_STORE } = require('../config');
const { ec, cryptoHash } = require('../util');

class TotalSupply {

    constructor() { //supply
        
        this.currentSupply = TOTAL_STORE; //supply

    }

    

    updateSupply( newSupply ) { //supply
        if(newSupply >= this.currentSupply) {
            console.error('The updated supply must be lesser');
            return;
        }
        console.log('updating current supply with ', newSupply);
        this.currentSupply = newSupply;

            
    }
    
};

module.exports = TotalSupply;