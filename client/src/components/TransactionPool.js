import React, { Component } from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { Button } from "react-bootstrap";
import history from "../history";

const POLL_INTERVAL_MS = 10000;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class TransactionPool extends Component {
    state = {transactionPoolMap: {}, nullMap: true };

    fetchTransactionPoolMap = () => {
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({transactionPoolMap: json});
                if(!isEmpty(json)) {
                    this.setState({nullMap: false});  
                }
            });
    }

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
        .then(response => {
            if(response.status === 200) {
                alert('success');
                this.setState({nullMap: true})
                history.push('/blocks'); 
            } else {
                alert('The mine transactions block request did not complete');
            }
        });
    }

    componentDidMount() {
        this.fetchTransactionPoolMap();

        this.fetchPoolMapInterval = setInterval(
            () => this.fetchTransactionPoolMap(),
            POLL_INTERVAL_MS
        );
    }

    componentWillUnmount() {
        clearInterval(this.fetchPoolMapInterval);
    }

    render() {
        let isPoolNull = this.state;
        return (
            <div className="TransactionPool">
                <Link to='/'>Home</Link>
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(
                        transaction => {
                            return (
                                <div key={transaction.id}>
                                    <hr />
                                    <Transaction transaction={transaction}/>
                                </div>
                            )
                        }
                    )
                }
                <hr />
                {
                    this.state.nullMap ? null : 
                    <Button 
                    bsStyle="danger"
                    onClick = {this.fetchMineTransactions}
                    >
                    Mine the Transactions
                    </Button>
                }
            </div>
        );
    }
}

export default TransactionPool;