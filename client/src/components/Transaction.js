import React from 'react';
import { Button, Card, ListGroup } from "react-bootstrap"; 

const Transaction = ({transaction}) => {
    const { input, outputMap } = transaction;
    const recipients = Object.keys(outputMap);

    return (
        <div className='Transaction'>
                <Card className="transaction-card" bg="warning">
                <Card.Header>
                <div>From: {`${input.address.substring(0,30)}...`} | Balance: {input.amount} </div>

                </Card.Header>
                <Card.Text>
                {
                    recipients.map(recipient => (
                            <div key={recipient}>
                                To: {`${recipient.substring(0,30)}...`} | Sent: {outputMap[recipient]}
                            </div>
                    ))
                }
                </Card.Text>
                </Card>



        </div>
    );
};

export default Transaction;