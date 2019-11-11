import {
    GET_LISTS_START,
    GET_LISTS
} from '../actions/list';

const initialState = {
    isLoading : false,
    list : [],
};


const listReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_LISTS_START : 
            return {
                ...state,
                isLoading : true
            };
        case GET_LISTS : 
            return {
                ...state,
                isLoading : false,
                list : action.data
            }

        default : 
            return state;
    }
}

export default listReducer;