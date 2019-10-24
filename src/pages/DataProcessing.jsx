import React, { useState } from 'react';
import axios from 'axios';
import SubMenu from './component/SubMenu';
import './DataProcessing.css'
class DataProcessing extends React.Component {
 
    menuList = [
        'Show Data',
        'Save Data',
    ]

    state = {
        idx : 0
    };

    getIdx = (index) => {
        this.setState({
            idx: index
        });
    }

    showContent = () => {
        return this.state.idx === 0 ? <ShowData /> : <SaveData />; 
    }

    render() {
        return (
            <>

                <SubMenu menuList={this.menuList} handleClick={this.getIdx.bind(this)} onMenuIdx={this.state.idx} />
                {this.showContent()}
            </>
        )   
    };
}


class ShowData extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            key : [],
            val : []
        };
        this.getData();
        this.key = [];
        this.val = [];
        
    }

    getData = () => {

        console.log('?');
        axios.post('/DataProcessing/getData').then((res) =>{

            let key = [];
            let val = [];
            for(let tempKey in res.data) {
                this.key.push(key);
                this.val.push(res.data[tempKey]);
            }

            this.setState({
                key: this.key,
                val: this.val,
            })
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <>
                {
                    this.state.key.map((v, idx) => {
                         return (
                            <DataList key={idx} data={this.state.val[idx]} title={v} />
                         )
                    })
                }
            </>
        )
    }
}

class DataList extends React.Component {

    constructor(props){
        super(props);
        this.list = [];
        this.listKey = []
        for(let key in this.props.data) {
            this.list.push(this.props.data[key]);
            this.listKey.push(key);
        }
    }

   
    show = () => {

        return  (
            <>
                <div className="DataProcessing-data-list-detail"> 
                    {
                        this.list.map((v, idx) => {
                            return (
                                <div className="DataProcessing-data-list-detail-list" key={v} >
                                    {this.listKey[idx]} : {v}
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    render(){
        return (
            <>
                <div className="DataProcessing-data-list-bar">
                    <div className="DataProcessing-data-list-title">
                        { this.props.data.title }
                    </div>
                    { this.show() }
                </div>
            </>
        )
    }
}

const SaveData = () =>{
    return (
        <>
            <div>
                SetData
            </div>
        </>
    )
}

export default DataProcessing;