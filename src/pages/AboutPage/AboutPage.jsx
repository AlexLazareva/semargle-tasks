import React from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/lib/paper';
import './styles.less';

const AboutPage = React.createClass({
    render() {
        return (
            <div className="aboutPage">
                <Paper
                    zDepth={1}
                    className="aboutPage__content"
                >
                    <h2>Semargle Google Tasks</h2>
                </Paper>
            </div>
        );
    }
});

export default AboutPage;