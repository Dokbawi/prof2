import axios from 'axios';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';



export const getList = () => {
    return (dispatch) => {
        dispatch({type:GET_LISTS_START});
        axios.post('/ReduxTest/getData').then((res) =>{
            const list = res.data || [];
            dispatch({type:GET_LISTS, data : list});  
        });
    }
};


 