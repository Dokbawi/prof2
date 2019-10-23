import React from 'react';
const NoMatchPage = () => {
    const style = {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    };

    return (
        <>
        <div style={style}>
            <h1>
                404 Not Page
            </h1>            
        </div>
        </>
    );
};

export default NoMatchPage;