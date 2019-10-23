import React from 'react';
import SubMenu from './component/SubMenu';
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


const ShowData = () =>{
    return (
        <>
            <div>
                GetData
            </div>
        </>
    )
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