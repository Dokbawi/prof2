import { combineReducers } from 'redux';
import listReducer from './listReducer';

export const reducer = combineReducers({
    list : listReducer
});

// export default reducer;