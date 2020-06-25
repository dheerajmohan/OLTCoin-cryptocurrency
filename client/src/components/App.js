import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import Navigation from "./Navigation";
import {Container, Row, Col, Jumbotron} from "react-bootstrap";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
)

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
                        <Col xs={12} md={6}>
                            <img className='logo' src={logo}></img>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className = 'title'>
                                <h2 style={{fontSize: 55}}>Welcome to</h2>  
                                <h1 style={{fontSize: 100}}>OLTCoin</h1>                
                            </div>     
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <br />
                <Container>
                        <Row>
                            <Col md={6}>
                                <span className="keyText">Address </span>
                            </Col>
                            <Col md={6}>
                                <span className="keyText">Balance </span>

                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={6}>
                            <span className="valueText">{address}</span>

                            </Col>
                            <Col md={6}>
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