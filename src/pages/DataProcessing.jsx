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
            data : []
        };
        this.getData();
    }

    getData = () => {
        axios.post('/DataProcessing/getData').then((res) =>{
            this.setState({
                data: res.data || []
            });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <>
                {
                    this.state.data.map((v, idx) => {
                         return (
                            <div className="DataProcessing-data-list-detail" key={idx}>
                                <div className="DataProcessing-data-list-detail-list">
                                    {idx + 1}
                                </div>
                                <DataTr title="Title" content={v.title} key="title" />
                                <DataTr title="Name" content={v.name} key="name" />
                                <DataTr title="Age" content={v.age} key="age" />
                                <DataTr title="Info" content={v.info} key="info" />
                            </div>
                         )
                    })
                }
            </>
        )
    }
}

const DataTr = (props) => {
    return (
        <>
            <div className="DataProcessing-data-list-detail-list">
                { props.title } : { props.content }
            </div>
        </>
    )
} 

class SaveData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data : []
        };
        this.getData();
    }

    $title;
    $name;
    $age;
    $info;
    
    getData = () => {
        axios.post('/DataProcessing/getData').then((res) =>{
            this.setState({
                data:res.data || []
            });
        }).catch(error => {
            console.log(error.message);
        });
    }

    delData = (idx) => {
        this.setState({
            data : this.state.data.splice(idx, 1)
        });

        axios.post('/DataProcessing/updateData',{
            data: {
                dumy: this.state.data || []
            }
            }).then((res) => {
                this.getData();
            });
    }

    addData = () => {
        let tempObj = {}
        
        tempObj.title = this.$title.value;
        tempObj.name = this.$name.value;
        tempObj.age = this.$age.value;
        tempObj.info = this.$info.value;

        for(let key in tempObj) {
            if(tempObj[key].trim() === "") {
                alert('Empty : ' + key);
                return;
            }
        }
        this.state.data.push(tempObj);
        axios.post('/DataProcessing/updateData',{
            data: {
                dumy: this.state.data || []
            }
            }).then((res) => {
                this.getData();
                this.$title.value = "";
                this.$name.value = "";
                this.$age.value = "";
                this.$info.value = "";
            });
    }

    render() {
        return (
            <>
                {
                    this.state.data.map((v, idx) => {
                         return (
                            <div className="DataProcessing-data-list-detail" key={idx}>
                                <div className="DataProcessing-data-list-detail-list">
                                    {idx + 1}
                                </div>
                                <DataTr title="Title" content={v.title} key="title" />
                                <DataTr title="Name" content={v.name} key="name" />
                                <DataTr title="Age" content={v.age} key="age" />
                                <DataTr title="Info" content={v.info} key="info" />
                                <div className="DataProcessing-del-btn" onClick={()=>this.delData(idx)}>
                                        Del
                                </div>
                            </div>
                         )
                    })
                }
                <div className="DataProcessing-data-list-detail">
                    <div className="DataProcessing-data-list-detail-list">
                        Title : <input ref={(c) => this.$title = c } type="text"  />
                    </div>

                    <div className="DataProcessing-data-list-detail-list">
                        Name : <input ref={(c) => this.$name = c } type="text" />
                    </div>

                    <div className="DataProcessing-data-list-detail-list">
                        Age : <input ref={(c) => this.$age = c } type="text" />
                    </div>

                    <div className="DataProcessing-data-list-detail-list">
                        Info : <input ref={(c) => this.$info = c } type="text" />
                    </div>
                    <div className="DataProcessing-add-btn" onClick={this.addData}>
                        Add
                    </div>
                </div>
            </>
        )
    }
}

export default DataProcessing;