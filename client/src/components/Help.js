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
                <h3 className="heading">OLTCoin Guidelines</h3>
                <br />
                <p className="Help">
                    New to OLTcoin? Spare a minute!
                    <ul>
                        <li>The minimum transaction amount is 1 <img  className='helpBalance' src={olt}></img> </li>
                        <li>Each transaction costs you 2 <img  className='helpBalance' src={olt}></img> </li>
                        <li>On mining transactions, you get 50 <img  className='helpBalance' src={olt}></img> block reward in addition to the transaction fee corresponding to the mined block. </li>
                        <li>A new user is given 1000 <img  className='helpBalance' src={olt}></img>. This provision and block reward will be unavailable once the total supply of OLTcoins gets depleted </li>
                    </ul>
                </p>

            </div>
        );
    }
};

export default Help;  