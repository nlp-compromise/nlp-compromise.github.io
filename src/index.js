import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './splash/index';
import Expo from './expo/index';
import Demos from './demos/index';
import Docs from './splash/docs/index';
import Api from './splash/docs/api';
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/docs" component={Docs} />
    <Route path="/api" component={Api} />
    <Route path="/demos" component={Demos} />
    <Route path="/expo/:id" component={Expo} />
    <Route path="/expo" component={Expo} />
    <Route path="*" component={Main} />
  </Router>,
  document.getElementById('root')
);
