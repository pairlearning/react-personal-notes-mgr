import { combineReducers } from 'redux';

import user from './userReducer';
import loading from './loadingReducer';
import notes from './notesReducer';

const rootReducer = combineReducers({ user, loading, notes });

export default rootReducer;
