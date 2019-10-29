import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {

    menuList = [{
            menuName : "Home",
            menuSrc : "/"
        },{
            menuName : "DataProcessing",
            menuSrc : "/DataProcessing"
        },{
            menuName : "Timer",
            menuSrc : "/Timer"
        },
    ];

    render() {
        return (
            <>
                <div className="Header-bar">
                    <div className="Header-menu">
                        {
                            this.menuList.map((v, idx) =>{
                                return (
                                    <HeaderMenu menuName={v.menuName} menuSrc={v.menuSrc} key={v.menuName}/>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        )   
    };
}

const HeaderMenu = (props) => {
    return (
        <>
            <Link to={props.menuSrc} key={props.menuName}>
                <div className="Header-menu-box">
                    {props.menuName}
                </div>
            </Link>
        </>
    );
}


export default Header;