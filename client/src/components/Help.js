import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";
import Navigation from "./Navigation";
import olt from '../assets/olt.png';

class Help extends Component {


    render() {
        return (
            <div className='ConductTransaction'>
                <Navigation/>
                <h3 className="heading">Help</h3>
                <br />
                <p className="Help">
                    New to OLTcoin? Spare a minute!
                    <ul>
                        <li>The minimum transaction amount is 1 <img  className='helpBalance' src={olt}></img> </li>
                        <li>Unit</li>
                        <li>Each transaction costs you 2 OLT</li>
                        <li>On mining transactions, the miner gets the corresponding transaction fee and also an additional 50 OLtcoins. Each miner is rewarded 50 oltcoins by the blockchain and alsogets reward to the number of transactions added and also, an additional 50 oltcoins</li>
                        <li>Unit</li>
                        <li>Unit</li>
                    </ul>
                </p>

            </div>
        );
    }
};

export default Help;  