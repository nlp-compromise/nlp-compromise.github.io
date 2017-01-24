import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Main from './splash/index'
import Expo from './expo/index'
import Docs from './docs/index'
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
    <Route path='/docs' component={Docs} />
    <Route path='/expo' component={Expo} />
  </Router>
  ),
  document.getElementById('root')
);
