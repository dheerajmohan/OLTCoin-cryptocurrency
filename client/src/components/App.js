import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import olt from '../assets/olt.png';

import Navigation from "./Navigation";
import {Container, Row, Col, Jumbotron} from "react-bootstrap";


class App extends Component {
    state = {
        walletInfo: {}, total: {}    
    };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({walletInfo: json}));

       fetch(`${document.location.origin}/api/total-supply`)
            .then(response => response.json())
            .then(json => this.setState({total: json}));
            // .then(console.log(total));
        
        
    }

    render() {
        const {address, balance} = this.state.walletInfo;
        const {total} = this.state.total;

        return (
            <div className='App'>
                <Navigation/>
                <Container>
                    <Row>
                        <Col className="oltLogo" xs={12} md={6}>
                            <img  className='logo' src={logo}></img>
                        </Col>
                        <Col xs={12} md={6}>
                            <br />
                            <br />
                            <div className = 'title'>
                                <h2 style={{fontSize: "2.5em"}}>Welcome to</h2>  
                                <h1 style={{fontSize: "4em"}}>OLTCoin</h1>                
                            </div>     
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container>
                        <Row>
                            <Col xs={7} md={6}>
                                <span className="keyText">Address </span>
                            </Col>
                            <Col xs={5} md={6}>
                                <span className="keyText">Balance </span>

                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={7} md={6}>
                            <span className="valueText">{address}</span>

                            </Col>
                            <Col xs={5} md={6}>
                                <span className="balance">
                                    {balance}{' '} 
                                    <img  className='oltBalance' src={olt}></img>
                                </span>                                


                            </Col>
                        </Row>
                </Container>
                <br />
                <Container>
                        <Row className="totalRow">
                            <Col xs={12} md={12}>
                            <span className="keyText">Total Supply</span>

                            </Col>
                            <Col xs={12} md={12}>
                                <span className="balance">
                                    {total}{' '} 
                                    <img  className='oltBalance' src={olt}></img>
                                </span>                                


                            </Col>
                        </Row>
                </Container>
                <br />
            </div>
        );
    }
}

export default App;