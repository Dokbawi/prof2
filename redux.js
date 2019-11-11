const { createStore, applyMiddleware, compose } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const { reducer } = require('./reducers/index');

const firestMiddleware = (store) => (dispatch) => (action) =>{
    dispatch(action);
}

const thunkMiddleware = (store) => (dispatch) => (action) =>{
    if(typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return dispatch(action);
}

// const enhancer = compose(
//     applyMiddleware(
//         firestMiddleware,
//         thunkMiddleware,
//     ),
// );

// const enhancer = composeWithDevTools(
//     applyMiddleware(
//         firestMiddleware,
//         thunkMiddleware,
//     ),
// );
const ware = applyMiddleware(
    firestMiddleware,
    thunkMiddleware,
);

const enhancer = process.env.NODE_ENV === 'production' ? 
    compose(ware)
    : composeWithDevTools(ware);

const initialState = {
    list : [],
};

const store = createStore(reducer, enhancer);


console.log('store : ', store);

module.exports = store;