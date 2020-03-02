import * as constants from './../constants';

const defaultState = {
    userId: null,
    fullName: null,
    token: null,
    isLoggedIn: false
};
const userInfo = localStorage.getItem('USER_INFO');
const INITIAL_STATE = userInfo ? JSON.parse(userInfo) : defaultState;

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case constants.SET_USER_INFO:
            return { ...action.payload };
        case constants.RESET_USER_INFO:
            return { ...defaultState };
        default:
            return state;
    }
};
