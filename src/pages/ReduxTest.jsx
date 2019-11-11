import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getList } from '../../actions/list';

import './ReduxTest.css';


const ReduxTest = () => {

    return (
        <>
            <div className="ReduxTest-main">
                <DataConpoment />
            </div>
        </>
    )
}


const DataConpoment = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(({ list }) => list.isLoading);
    const dataList = useSelector(({ list }) => list.list);
    const onClick = useCallback(() => {
        dispatch(getList());
    })
    return (
        <>
            <div className="ReduxTest-compoment">
                {
                    isLoading ? 
                    <div className="ReduxTest-data-compoment">
                        Loading
                    </div>:

                    <div className="ReduxTest-data-compoment">
                        {
                            dataList.length === 0 ? 
                            "NoData" :

                            dataList.map((v, idx) => {
                                return (
                                    <div className="ReduxTest-data-list" key={idx}>
                                        <div className="ReduxTest-data-item">
                                            Title : {v.title}
                                        </div>
                                        <div className="ReduxTest-data-item">
                                            Content : {v.content}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <div className="ReduxTest-data-btn" onClick={onClick}>
                    Get Data
                </div>
            </div>

        </>
    )
}



export default ReduxTest;