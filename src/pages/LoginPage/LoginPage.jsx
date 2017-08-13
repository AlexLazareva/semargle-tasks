import React from 'react';

import SessionStore from './../../stores/SessionStore';
import SessionActions from './../../actions/SessionActions';

import RaisedButton from 'material-ui/lib/raised-button';
import './styles.less';

function getStateFromFlux() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    };
}

const LoginPage = React.createClass({

    getInitialState() {
        return getStateFromFlux();
    },

    componentDidMount() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUpdate(nextProps, nextState) {
        if (nextState.isLoggedIn) {
            this.context.router.replace('/about');
        }
    },

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange);
    },

    handleLogIn() {
        SessionActions.authorize();
    },

    render() {
        return (
            <div className="loginPage">
                <div className="loginPage__banner">
                    <div className="loginPage__text">
                        <h1>Semargle Tasks</h1>
                        <p>Organise your life!</p>
                        <RaisedButton
                            className="login-button"
                            label="Login with Google"
                            onClick={this.handleLogIn}
                        />
                    </div>
                </div>
                <img
                    src="/img/desk.png"
                    className="loginPage_image"
                />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default LoginPage;