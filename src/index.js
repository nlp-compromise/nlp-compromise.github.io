import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './header';
import Footer from './footer';
import Docs from './docs';
import Demos from './shows';
import Tags from './tagset';
import All from './all';
const container = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: 'Raleway,serif'
}

render((
  <BrowserRouter>
    <div style={container}>
      <Header/>
      <Route path='/docs' component={Docs} />
      <Route path='/doc' component={Docs} />
      <Route path='/api' component={Docs} />
      <Route path='/demo' component={Demos} />
      <Route path='/demos' component={Demos} />
      <Route path='/tags' component={Tags} />
      <Route path='/tagset' component={Tags} />
      <Route exact path='/' component={All} />
      <Footer/>
    </div>
  </BrowserRouter>
  ), document.getElementById('root'));
