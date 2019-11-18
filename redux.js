import createSagaMiddleware from 'redux-saga'
import rootSaga from './actions/listSaga'
const { createStore, applyMiddleware, compose } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
// const createSagaMiddleware = require('redux-saga');
const { reducer } = require('./reducers/index');

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

const sagaMiddleware = createSagaMiddleware();

const ware = applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
);

const enhancer = process.env.NODE_ENV === 'production' ? 
    compose(ware)
    : composeWithDevTools(ware);

const initialState = {
    list : [],
};

// const store = createStore(reducer, enhancer);
// module.exports = store;

export default createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);