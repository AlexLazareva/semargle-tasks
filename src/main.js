import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './App.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='/login' component={LoginPage} />
        </Route>
    </Router>,
    document.getElementById('mount-point')
);

