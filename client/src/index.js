import React from 'react';
import { render } from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/Login';
import Help from './components/Help';



render(
    <Router history={history} >
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={App} />
            <Route path='/blocks' component={Blocks} />
            <Route path='/conduct-transaction' component={ConductTransaction} />
            <Route path='/transaction-pool' component={TransactionPool} />
            <Route exact path='/help' component={Help} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

