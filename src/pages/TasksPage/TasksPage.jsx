import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import './styles.less';

const TasksPage = React.createClass({
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
    }
});

export default TasksPage;