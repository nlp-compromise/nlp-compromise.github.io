import React from 'react';
import { Router, Route } from 'react-router';

import All from './all';

const Routes = (props) => (
  <Router>
    { /* <Route path='/' component={All} /> */ }
    { /* <Route path="/about" component={About} /> */ }
    <Route path='*' component={All} />
  </Router>
);

export default Routes;
