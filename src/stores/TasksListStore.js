import { EventEmitter } from 'events';

import AppDispatcher from './../dispatcher/AppDispatcher';
import AppConstants from './../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _taskLists = [];
let _error = null;

function formatTaskList(data) {
    return {
        id: data.id,
        name: data.title
    };
}

const TasksListStore = Object.assign({}, EventEmitter.prototype, {
    getTaskList() {
        return _taskLists;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    switch(action.type) {
        case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
            _taskLists = action.items.map(formatTaskList);

            TasksListStore.emitChange();
            break;
        }

        case AppConstants.TASK_LISTS_LOAD_FAIL: {
            _taskLists = [];
            _error = action.error;

            TasksListStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_SUCCESS: {
            const newTaskList = formatTaskList(action.taskList);
            _taskLists.push(newTaskList);

            TasksListStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_FAIL: {
            _error = action.error;

            TasksListStore.emitChange();
            break;
        }

        default: {

        }
    }
});

export default TasksListStore;