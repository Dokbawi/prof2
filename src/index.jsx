import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';
import { hot } from 'react-hot-loader/root';

const Hot = hot(Root);

ReactDOM.render(<Hot />,
    document.getElementById('root')
  );