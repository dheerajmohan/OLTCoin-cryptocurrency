import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import {Navbar, Nav, NavItem, MenuItem} from "react-bootstrap";
import olt from '../assets/olt.png';


 export default class Navigation extends Component {

    render() {
        return (
            <div >
                <Navbar className="nav-style" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/"><img  className='olt' src={olt}></img>{' '}OLTCoin</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Link to='/'>HOME</Link>

                        </Nav.Item>
                        <Nav.Item>
                            <Link to='./blocks'>BLOCKS</Link>

                        </Nav.Item> 
                        <Nav.Item>
                            <Link to='./conduct-transaction'>TRANSACT</Link>

                        </Nav.Item> 
                        <Nav.Item>
                            <Link to='./transaction-pool'>POOL</Link>

                        </Nav.Item>                    
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

