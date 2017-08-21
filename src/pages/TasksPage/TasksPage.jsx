import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import CircularProgress from 'material-ui/lib/circular-progress';

import Task from './../../components/Task/Task';

import './styles.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const TasksPage = React.createClass({
    getInitialState() {
        return {
            isEditingTaskList: false
        };
    },

    handleEditTaskList() {
        this.setState({
            isEditingTaskList: true
        }, () => this.taskList.focus());
    },

    handleSubmitTaskList() {
        this.saveTaskList();
    },

    handleTaskListEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTaskList();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelEditingTaskList();
        }
    },

    saveTaskList() {
        this.props.onUpdateTaskList({
            name: this.taskList.value
        });

        this.cancelEditingTaskList();
    },

    cancelEditingTaskList(){
        this.setState({ isEditingTaskList: false});
    },

    renderTasks() {
        return (
            <div className="tasksPage__tasks">
                {
                    this.state.tasks.map(task =>
                        <Task
                            key={task.id}
                            text={task.text}
                            note={task.note}
                            due={task.due}
                            isCompleted={task.isCompleted}
                            onDelete={this.props.onTaskDelete.bind(null, task.id)}
                            onStatusChange={this.handleStatusChange.bind(null, task.id)}
                            onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                        />
                    )
                }
            </div>
        );
    },

    render() {
        return (
            <div className="taskPage">
                <div className="taskPage__header">
                    {
                        this.state.isEditingTaskList
                        ?
                            <input
                                ref={c => this.taskList = c}
                                className='taskPage__title-input'
                                defaultValue={this.props.taskList.name}
                                onKeyDown={this.handleTaskListEditKeyDown}
                                onBlur={this.cancelEditingTaskList}
                            />
                        :
                            <h2
                                className="taskPage__title"
                                onClick={this.handleEditTaskList}
                            >
                                {this.props.taskList.name}
                            </h2>
                    }

                    <div className="taskPage__tools">
                        <IconButton onClick={this.handleAddTask}>
                            <ContentAdd/>
                        </IconButton>
                    </div>
                </div>
                {
                    this.props.isLoadingTasks
                    ?
                        <CircularProgress />
                    :
                        this.renderTasks()
                }

            </div>
        );
    }
});

export default TasksPage;