import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

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

    render() {
        return (
            <div className="taskPage">
                <div className="taskPage__header">
                    <h2 className="taskPage__title">List name</h2>
                    <div className="taskPage__tools">
                        <IconButton onClick={this.handleAddTask}>
                            <ContentAdd/>
                        </IconButton>
                    </div>
                </div>

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

            </div>
        );
    }
});

export default TasksPage;