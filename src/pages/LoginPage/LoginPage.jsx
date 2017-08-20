import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import './styles.less';

const LoginPage = React.createClass({

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
                            onClick={this.props.onLogIn}
                        />
                    </div>
                </div>
                <img
                    src="/img/desk.png"
                    className="loginPage_image"
                />
            </div>
        );
    }
});

export default LoginPage;