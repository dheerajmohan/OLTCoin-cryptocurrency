import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import Navigation from "./Navigation";
import {Container, Row, Col, Jumbotron} from "react-bootstrap";


class App extends Component {
    state = {
        walletInfo: {}
    };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({walletInfo: json}));
    }

    render() {
        const {address, balance} = this.state.walletInfo;

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
                            <Col xs={8} md={6}>
                                <span className="keyText">Address </span>
                            </Col>
                            <Col xs={4} md={6}>
                                <span className="keyText">Balance </span>

                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={8} md={6}>
                            <span className="valueText">{address}</span>

                            </Col>
                            <Col xs={4} md={6}>
                                <span className="balance">{balance}</span>
                            </Col>
                        </Row>
                </Container>
                <br />
            </div>
        );
    }
}

export default App;