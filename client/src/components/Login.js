import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";
import Navigation from "./Navigation";
import olt from '../assets/olt.png';
import {Container, Row, Col, Jumbotron} from "react-bootstrap";
import logo from '../assets/logo.png';

class Login extends Component {
    state = {username: '', password:'', errorText: '' };

    updateUsername = event => {
        this.setState({ username: event.target.value });
    }

    updatePassword = event => {
        this.setState({ password: event.target.value });
    }

    authenticate = () => {
        const {username, password} = this.state;
        
        if(username === "admin" && password === "password") {
            console.log("success");
            history.push('/home');
 
        }

        else {
            this.setState({errorText: 'Invalid credentials'})
        }
    }

    render() {
        return (
            <div className='ConductTransaction'>
                <br />
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <img  className='logo' src={logo}></img>
                        </Col>
                    </Row>
                </Container>
                <br />
                <h3 className="heading">Login</h3>
                <br />
                <Form className="loginForm">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl 
                        input = 'text'
                        placeholder = 'Enter your username'
                        value = {this.state.username}
                        onChange = {this.updateUsername}
                        />                        
                        {/* <Form.Text className="text-muted">
                        You should not enter your own address
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <FormControl 
                        input = 'password'
                        type='password'
                        placeholder = 'Enter your password'
                        value = {this.state.password}
                        onChange = {this.updatePassword}
                        />                      
                        <Form.Text className="text-muted">
                            <span style={{color: "red"}}>{this.state.errorText}</span>    
                        </Form.Text>
                    </Form.Group>

                    <div>
                    <Button 
                        variant="danger"
                        bsStyle="danger"
                        onClick = {this.authenticate}
                    >
                        Submit
                    </Button>
                    </div>
                </Form>

            </div>
        );
    }
};

export default Login;  