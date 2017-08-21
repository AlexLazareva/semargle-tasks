import React from 'react';

import TasksStore from './../../stores/TasksStore';
import TaskListsStore from './../../stores/TasksListStore';
import TasksActions from './../../actions/TasksActions';
import TasksListsActions from './../../actions/TasksListActions';

import TaskCreateModal from './../../components/TaskCreateModal/TaskCreateModal';

import TasksPage from './../../pages/TasksPage/TasksPage';

import './styles.less';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks(),
        isLoadingTasks: TasksStore.isLoadingTasks(),
        taskList: TaskListsStore.getCurrentTaskList() || {}
    };
}

const TasksPageContainer = React.createClass({
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

    handleTaskStatusChange(taskId, { isCompleted }) {
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
                    isLoadingTasks={this.state.isLoadingTasks}
                    error={this.state.error}
                    onAddTask={this.handleAddTask}
                    onStatusChange={this.handleTaskStatusChange}
                    onTaskUpdate={this.handleTaskUpdate}
                    onTaskDelete={this.handleTaskDelete}
                    onDeleteTaskList={this.handleDeleteTaskList}
                />
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

export default TasksPageContainer;
