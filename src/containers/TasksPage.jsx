import React from 'react';

import TasksStore from '../stores/TasksStore';
import TaskListsStore from '../stores/TasksListStore';
import TasksActions from '../actions/TasksActions';
import TasksListsActions from '../actions/TasksListActions';

import TasksPage from './../components/TasksPage/TasksPage.jsx';

import TaskCreateModal from '../components/TaskCreateModal/TaskCreateModal';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks(),
        error: TasksStore.getError(),
        isLoadingTasks: TasksStore.isLoadingTasks(),
        taskList: TaskListsStore.getCurrentTaskList() || {}
    };
}

const TasksPageContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            ...getStateFromFlux(),
            isCreatingTask: false
        };
    },

    componentWillMount() {
        TasksActions.loadTasks(this.props.params.id);
        TasksListsActions.loadTaskLists(this.props.params.id);
    },

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
        TaskListsStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            TasksActions.loadTasks(nextProps.params.id);
            TasksListsActions.loadTaskLists(nextProps.params.id);
        }
    },

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
        TaskListsStore.removeChangeListener(this._onChange);
    },

    handleTaskStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    },

    handleTaskUpdate(taskId, task) {
        TasksActions.updateTask({
            taskListId: this.props.params.id,
            taskId: taskId,
            ...task
        });
    },

    handleTaskDelete(taskId) {
        TasksActions.deleteTask({
            taskListId: this.props.params.id,
            taskId: taskId
        });
    },

    handleAddTask() {
        this.setState({ isCreatingTask: true });
    },

    handleTaskCreateModalClose() {
        this.setState({ isCreatingTask: false });
    },


    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;

        TasksActions.createTask({ taskListId, ...task});

        this.setState({ isCreatingTask : false });
    },

    handleDeleteTaskList() {
        const isConfirmed = confirm('Are you sure you want delete this task list? All tasks in it will be deleted too');

        if (isConfirmed) {
            TasksListsActions.handleDeleteTaskList({
                taskListId: this.props.params.id
            });
        }

        this.context.router.push('/lists');
    },

    handleUpdateTaskList({ name }) {
        TasksListsActions.updateTaskList({
            taskListId: this.props.params.id,
            name
        });
    },

    render() {
        return (
            <div>
                <TasksPage
                    taskList={this.state.taskList}
                    tasks={this.state.tasks}
                    error={this.state.error}
                    isLoadingTasks={this.state.isLoadingTasks}
                    onUpdateTaskList={this.handleUpdateTaskList}
                    onAddTask={this.handleAddTask}
                    onTaskStatusChange={this.handleTaskStatusChange}
                    onTaskUpdate={this.handleTaskUpdate}
                    onTaskDelete={this.handleTaskDelete}
                    onDeleteTaskList={this.handleDeleteTaskList}
                />
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleTaskCreateModalClose}
                />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPageContainer;
