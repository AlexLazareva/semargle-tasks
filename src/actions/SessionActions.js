import AppDispatcher from './../dispatcher/AppDispatcher';
import AppConstants from './../constants/AppConstants';

import api from './../api';

const SessionActions = {
    authorize(immediate = false) {
        api.authorize({immediate})
            .then(() => {
                AppDispatcher.dispatch({
                    type: AppConstants.SESSION_AUTHORIZE_SUCCESS
                });
            })
            .catch((err) => {
                AppDispatcher.dispatch({
                    type: AppConstants.SESSION_AUTHORIZE_FAIL,
                    error: err
                });
            });
    }
};

export default SessionActions;
