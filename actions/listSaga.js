import axios from 'axios';
import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects'

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';

export function* getList() {
    yield put({ type: GET_LISTS_START });
    console.log('hello');
    const data = yield call(list);
    yield put({type:GET_LISTS, data : data});  
}

export function* watchGetList() {
  yield takeEvery('GET_LIST_ASYNC', getList)
}


export default function* rootSaga() {
    yield all([
        watchGetList()
    ])
}

const list = async () => {
    return await axios.post('/ReduxTest/getData').then((res) =>{
        const list = res.data || [];
        return list;
    });
}

 