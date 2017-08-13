import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import SessionActions from './actions/SessionActions';
import SessionStore from './stores/SessionStore';

import App from './App.jsx';
import LoggedInLayout from './containers/LoggedInLayout/LoggedInLayout';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import TasklistsPage from './pages/TaskslistsPage/TasklistsPage.jsx';
import TaskPage from './pages/TasksPage/TasksPage.jsx';

window.handleGoogleApiLoaded = () => {
    SessionActions.authorize(true, renderApp);
};

function renderApp() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <Route path='/login' component={LoginPage} />
                <Route component={LoggedInLayout} onEnter={requireAuth}>
                    <Route path='/about' component={AboutPage} />
                    <Route path='/lists' component={TasklistsPage}>
                        <Route path='/lists/:id' component={TaskPage}/>
                    </Route>
                </Route>
            </Route>
        </Router>,
        document.getElementById('mount-point')
    );
}

function requireAuth(nextState, replace) {
    if (!SessionStore.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}


