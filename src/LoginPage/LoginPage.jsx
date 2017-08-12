import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import './styles.less';

const LoginPage = React.createClass({
    handleLogIn() {
        console.log('Login clicked');
    },

    render() {
        return (
            <div className="loginPage">
                <div className="loginPage__banner">
                    <div className="loginPage__text">
                        <h1>Semargle Tasks</h1>
                        <p>Organise your life!</p>
                    </div>
                    <RaisedButton
                        className="login-button"
                        label="Log in"
                        onClick={this.handleLogIn}
                    />
                </div>
                <img src="/img/desk.png" />
            </div>
        );
    }
});

export default LoginPage;