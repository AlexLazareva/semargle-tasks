import React from 'react';

import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ListIcon from 'material-ui/lib/svg-icons/action/view-list';
import HomeIcon from 'material-ui/lib/svg-icons/action/home';
import ExitIcon from 'material-ui/lib/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/lib/svg-icons/file/folder';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import './styles.less';

const TasklistPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render() {
        const { router } = this.context;

        return (
            <div className="taskslistPage">
                <div className="taskslistPage__menu">
                    <List className='tasklistsPage__list'>
                        <h3 className="taskslistPage__title">Semargle Google Tasks</h3>
                        <Divider/>
                        <List className="taskslistPage__list">
                            <ListItem
                                leftIcon={<HomeIcon/>}
                                primaryText="Home"
                                onClick={router.push.bind(null, `/lists`)}
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={router.push.bind(null, `/lists`)}
                            />
                        </List>
                        <Divider/>
                        <List className="taskslistPage__list" subheader="Tasks List">
                        </List>
                        <Divider/>
                        <List className="taskslistPage__list" >
                            <ListItem
                                leftIcon={<ExitIcon />}
                                primaryText="Log out"
                                onClick={this.handleLogOut}
                            />
                        </List>
                    </List>
                </div>
                <div className="taskslistPage__tasks">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default TasklistPage;