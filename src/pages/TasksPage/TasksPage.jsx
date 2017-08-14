import React from 'react';

import TasksStore from './../../stores/TasksStore';
import TasksActions from './../../actions/TasksActions';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import './styles.less';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks()
    };
}

const TasksPage = React.createClass({
    getInitialState() {
        return {
            ...getStateFromFlux()
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
                    Tasks
                </div>
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPage;