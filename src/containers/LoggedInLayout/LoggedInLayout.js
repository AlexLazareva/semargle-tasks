import React from 'react';

import './styles.less';

const LoggedInLayout = React.createClass({
    render() {
        return (
            <div className="loggedInLayout">
                <div className="loggedInLayout__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default LoggedInLayout;