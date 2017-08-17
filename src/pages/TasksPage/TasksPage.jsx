import React from 'react';

import TasksStore from './../../stores/TasksStore';
import TasksActions from './../../actions/TasksActions';

import TaskCreateModal from './../../components/TaskCreateModal/TaskCreateModal';

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

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !==nextProps.params.id) {
            TasksActions.loadTasks(nextProps.params.id);
        }
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

    handleAddTask() {
        this.setState({ isCreatingTask: true });
    },

    handleClose() {
        this.setState({ isCreatingTask: false });
    },

    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;

        TasksActions.createTask({ taskListId, ...task});

        this.setState({ isCreatingTask : false });
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
                                isCompleted={task.isCompleted}
                                onStatusChange={this.handleStatusChange.bind(null, task.id)}
                                onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                            />
                        )
                    }
                </div>
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleClose}
                />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPage;