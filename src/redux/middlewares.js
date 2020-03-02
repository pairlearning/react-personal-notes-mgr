import axios from 'axios';

import * as constants from './constants';
import { logoutUser } from './actions/authActionCreators';

export const apiMiddleware = ({ dispatch, getState }) => next => action => {
    if (action.type !== constants.API) return next(action);

    dispatch({ type: constants.TOGGLE_LOADER });
    const BASE_URL = 'http://localhost:3300';
    const AUTH_TOKEN = getState().user.token;
    if (AUTH_TOKEN)
        axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    const { url, method, success, data, postProcessSuccess, postProcessError } = action.payload;

    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null
    }).then((response) => {
        dispatch({ type: constants.TOGGLE_LOADER });
        if (success) dispatch(success(response.data));
        if (postProcessSuccess) postProcessSuccess(response.data);
    }).catch(err => {
        dispatch({ type: constants.TOGGLE_LOADER });
        if (!err.response) console.warn(err);
        else {
            if (err.response && err.response.status === 403)
                dispatch(logoutUser());
            if (err.response.data.error.message) {
                if (postProcessError) postProcessError(err.response.data.error.message);
            }
        }
    })
};
