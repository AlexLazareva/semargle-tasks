import React from 'react';
import moment from 'moment';

import Checkbox from 'material-ui/lib/checkbox';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import NoteIcon from 'material-ui/lib/svg-icons/communication/message';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import './styles.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

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
        this.cancelTask()
    },

    handleSave() {
        this.saveTask()
    },

    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    },

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    },

    focusInput() {
        this.input.focus();
    },

    saveTask() {
        this.props.onUpdate({ text: this.input.value });

        this.setState({ isEditing: false });
    },

    cancelTask() {
        this.setState({ isEditing: false });
    },

    render() {
        const {text, note, due, isCompleted, onDelete} = this.props;
        return (
            this.state.isEditing
            ?
                <div className='task editing'>
                    <input
                        className='task__input'
                        type='text'
                        defaultValue={text}
                        onKeyDown={this.handleKeyDown}
                        ref={ c => this.input = c }
                    />

                    <textarea
                        className='task__note-input'
                        type='text'
                        defaultValue={note}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.note = c}
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
                        checked={isCompleted}
                        onCheck={this.handleCheck}
                    />

                    <div className='task__text' onClick={this.handleEdit}>
                        <div className='task__title'>
                            { text }
                            {
                                note
                                ?
                                    <span title={note}>
                                        <NoteIcon className='task__note'/>
                                    </span>
                                :
                                    null
                            }
                        </div>
                        {
                            due
                            ?
                                <div className='task__due'>
                                    {'due ' + moment(due).fromNow()}
                                </div>
                            :
                                null
                        }
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
