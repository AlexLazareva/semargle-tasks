import React from 'react';

const LoginPage = React.createClass({
    handleLogIn() {
        console.log('Login clicked');
    },

    render() {
        return (
            <div className="loginPage">
                Login Page
            </div>
        );
    }
});

export default LoginPage;