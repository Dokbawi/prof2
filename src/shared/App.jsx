import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatchPage from '../pages/component/NoMatchPage';
import Header from '../pages/component/Header';
import Home from '../pages/Home';
import DataProcessing from '../pages/DataProcessing';
import './App.css';

class App extends Component {
    render() {
        return (
            <>
                <Header />
                
                <div className="App-main">
                    <Switch>
                        <Route exact={true} path="/" component={Home}/>
                        <Route exact path="/DataProcessing" component={DataProcessing}/>
                        <Route component={NoMatchPage} />
                    </Switch>

                </div>
                
            </>
        );
    }
}

export default App;