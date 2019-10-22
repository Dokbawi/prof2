import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../pages/component/Header';
// import { Header } from '../pages/component';


class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Route exact path="/" component={Home}/>
                {/* <Route path="/" component={About}/> */}
            </div>
        );
    }
}

export default App;