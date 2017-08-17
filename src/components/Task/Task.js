import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import './styles.less';

const Task = React.createClass({
    getInitialState() {
        return {
            isEditing: false
        };
    },

    handleEdit(e) {
        this.setState({ isEditing: true }, this.focusInput);
    },

    handleCancel() {
        this.setState({ isEditing: false });
    },

    handleSave() {
        this.props.onUpdate({ text: this.input.value });

        this.setState({ isEditing: false });
    },

    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    },

    render() {
        return (
            this.state.isEditing
            ?
                <div className='task editing'>
                    <input
                        className='task__input'
                        type='text'
                        defaultValue={this.props.text}
                        ref={ c => this.input = c }
                    />
                    <div className='task__toolbar'>
                        <div>
                            <RaisedButton primary onClick={this.handleSave} label='Save'/>
                            <FlatButton onClick={this.handleCancel} label='Cancel' />
                        </div>
                    </div>
                </div>
            :
                <div className='task'>
                    <Checkbox
                        className='task__checkbox'
                        checked={this.props.isCompleted}
                        onCheck={this.handleCheck}
                    />

                    <div className='task__text' onClick={this.handleEdit}>
                        <div className='task__title'>{ this.props.text }</div>
                    </div>

                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}>
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </IconMenu>
                </div>
        );
    }
});

export default Task;
