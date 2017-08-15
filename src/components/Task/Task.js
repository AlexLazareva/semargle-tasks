import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';

import './styles.less';

const Task = React.createClass({
    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    },
    render() {
        return (
            <div className='task'>
                <Checkbox
                    className='task__checkbox'
                    checked={this.props.isCompleted}
                    onCheck={this.handleCheck}
                />

                <div className='task__text'>
                    <div className='task__title'>{ this.props.text }</div>
                </div>
            </div>
        );
    }
});

export default Task;
