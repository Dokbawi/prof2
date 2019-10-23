import React from 'react';
import './SubMenu.css';


const SubMenu = (props) =>{
    const Active = {
        border : '2px solid #e2e2e2',
        borderTopLeftRadius : '4px',
        borderTopRightRadius : '4px',
        borderBottom : 'none'
    };

    const Disabled = {
        borderBottom : '2px solid #e2e2e2'
    }

    return (
        <>
            <div className="subMenu-bar">
                {
                    props.menuList.map((v, idx) => {
                        return (
                            <div className="subMenu-bar-box" key={idx} onClick={()=> props.handleClick(idx)} style={idx == props.onMenuIdx ? Active : Disabled}>
                                {v}
                            </div>
                        );
                    })

                }
            </div>
            
        </>
    )   
}

export default SubMenu;