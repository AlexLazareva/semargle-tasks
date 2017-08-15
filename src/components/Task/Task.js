import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';

const Task = React.createClass({
    render() {
        return (
            <div className='task'>
                <Checkbox
                    className='task__checkbox'
                    checked={this.props.isCompleted}
                />

                <div className='task__text'>
                    <div className='task__title'>{ this.props.text}</div>
                </div>
            </div>
        );
    }
});

export default Task;
