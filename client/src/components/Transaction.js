import React from 'react';
import { Button, Card, ListGroup } from "react-bootstrap"; 
import olt2 from '../assets/olt2.png';

const Transaction = ({transaction}) => {
    const { input, outputMap } = transaction;
    const recipients = Object.keys(outputMap);

    return (
        <div className='Transaction'>
                <Card className="transaction-card" bg="warning">
                <Card.Header>
                <div>
                    <span className="smallKey">From: </span>
                    <span className="valueText2"> {`${input.address.substring(0,30)}...`} </span>
                    <span className="smallKey">| Balance: </span>
                    <span className="valueText2"> {input.amount} 
                        <span>{' '}<img  className='transOlt' src={olt2}></img></span>  
                    </span>

                </div>

                </Card.Header>
                <Card.Text>
                {
                    recipients.map(recipient => (
                            <div key={recipient}>
                                <span className="smallKey">To: </span>
                                <span className="valueText2"> {`${recipient.substring(0,30)}...`} </span>
                                <span className="smallKey"> | Sent:  </span>
                                <span className="valueText2"> {outputMap[recipient]}
                                    <span>{' '}<img  className='transOlt' src={olt2}></img></span>  
                                 </span>                                
                            </div>
                    ))
                }
                </Card.Text>
                </Card>



        </div>
    );
};

export default Transaction;