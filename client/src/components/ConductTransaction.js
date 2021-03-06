//Conduct Transaction Page

import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";
import Navigation from "./Navigation";

class ConductTransaction extends Component {
    state = { recipient: '', amount: '', knownAddresses: [], errorText: '', isValid: false};

//Fetch previously encountered addresses
    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({knownAddresses: json}));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        const val = event.target.value;
        if(isNaN(val)) {
            this.setState({ amount: val, errorText: 'Enter a number', isValid: false });
        }
        else if(val <= 0) {
            this.setState({ amount: val, errorText: 'Enter a number greater than zero', isValid: false });

        }
        else {
            this.setState({ amount: Number(event.target.value), errorText: '', isValid: true});
        }
    }

    //Transaction function after input form validation
    conductTransaction = () => {
        const {recipient, amount} = this.state;

        if(this.state.isValid && this.state.recipient != '') {
            fetch(`${document.location.origin}/api/transact`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({recipient, amount})
            }).then(response => response.json())
              .then(json => {
                  alert(json.message || json.type);
                  history.push('/transaction-pool');
              });
        }


    }

    render() {
        return (
            <div className='ConductTransaction'>
                <Navigation/>
                <h3 className="heading">Conduct a Transaction</h3>
                <br />
                <h4 className="keyText">Known Addresses</h4>
                {
                    this.state.knownAddresses.map(knownAddress => {
                        return (
                            <div key={knownAddress}>
                                <div className="valueText">{knownAddress}</div> 
                                <br />
                            </div>
                        );
                    })
                }
                <br />
                <Form className="transactionForm">
                    <Form.Group>
                        <Form.Label>Recipient Address</Form.Label>
                        <FormControl 
                        input = 'text'
                        placeholder = 'Public address of recipient'
                        value = {this.state.recipient}
                        onChange = {this.updateRecipient}
                        />                        
                        {/* <Form.Text className="text-muted">
                        You should not enter your own address
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Transaction Amount</Form.Label>
                        <FormControl 
                        input = 'number'
                        placeholder = 'Amount'
                        value = {this.state.amount}
                        onChange = {this.updateAmount}
                        />                      
                        <Form.Text className="text-muted">
                            <span style={{color: "red"}}>{this.state.errorText}</span>
                        </Form.Text>
                    </Form.Group>

                    <div>
                    <Button 
                        variant="danger"
                        bsStyle="danger"
                        onClick = {this.conductTransaction}
                    >
                        Submit
                    </Button>
                    </div>
                </Form>

            </div>
        );
    }
};

export default ConductTransaction;  
