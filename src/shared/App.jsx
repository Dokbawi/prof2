import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatchPage from '../pages/component/NoMatchPage';
import Header from '../pages/component/Header';
import Home from '../pages/Home';
import DataProcessing from '../pages/DataProcessing';
import Timer from '../pages/Timer';
import ReduxTest from '../pages/ReduxTest';
import './App.css';

class App extends Component {
    render() {
        return (
            <>
                <Header />
                
                <div className="App-main">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/DataProcessing" component={DataProcessing}/>
                        <Route exact path="/Timer" component={Timer}/>
                        <Route exact path="/ReduxTest" component={ReduxTest}/>
                        <Route component={NoMatchPage} />
                    </Switch>

                </div>
                
            </>
        );
    }
}

export default App;