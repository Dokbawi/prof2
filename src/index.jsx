import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import 'babel-polyfill';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import  store  from '../redux';


import './index.css';

const Hot = hot(Root);

ReactDOM.render(
  <Provider store={store}>
    <Hot />
  </Provider>,
    document.getElementById('root')
  );