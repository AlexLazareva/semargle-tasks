import React from 'react';

import TasksStore from './../../stores/TasksStore';
import TasksActions from './../../actions/TasksActions';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Task from './../../components/Task/Task';

import './styles.less';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks()
    };
}

const TasksPage = React.createClass({
    getInitialState() {
        return {
            ...getStateFromFlux(),
            isCreatingTask: false
        };
    },

    componentWillMount() {
        TasksActions.loadTasks(this.props.params.id);
    },

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        TasksStore.addChangeListener(this._onChange);
    },

    handleStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    },

    handleTaskUpdate(taskId, { text }) {
        TasksActions.updateTask({
            taskListId: this.props.params.id,
            taskId: taskId,
            text: text
        });
    },

    render() {
        return (
            <div className="taskPage">
                <div className="taskPage__header">
                    <h2 className="taskPage__title">List name</h2>
                    <div className="taskPage__tools">
                        <IconButton>
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
                                isCompleted={task.isCompleted}
                                onStatusChange={this.handleStatusChange.bind(null, task.id)}
                                onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                            />
                        )
                    }
                </div>
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPage;