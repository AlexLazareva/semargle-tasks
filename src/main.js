import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import api from './api';

import App from './App.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';

window.handleGoogleApiLoaded = () => {
    api.authorize({ immediate: false });
};

renderApp();

function renderApp() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <Route path='/login' component={LoginPage} />
            </Route>
        </Router>,
        document.getElementById('mount-point')
    );
}


