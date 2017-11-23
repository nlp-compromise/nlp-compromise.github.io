import React from 'react';
import styler from 'react-styling';
import Header from './header';
import Intro from './intro';
import Small from './small';
import Big from './big';
import Install from './install';
import Footer from './footer';
import Graphs from './graphs';
import Shows from './shows';
import Docs from './docs';
import Tagset from './tagset';
import './index.css';
const style = styler`
container
  position:relative;
  display:flex;
  flex-direction: column;
  width:100%;
  font-family: Raleway,serif;
spacer
  flex: 1,
  margin-top: 40px
  margin-bottom: 40px
  marginLeft: 25%
  marginRight: 25%
hr
  border: 0;
  border-bottom: 2px solid #ccc;
  background: lightgrey;
`;

const Spacer = function() {
  return (<div style={style.spacer}>
    <hr style={style.hr}/>
  </div>)
}

class All extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {css} = this;
    return (
      <div style={css.container}>
       <Header />
       { /* <Intro />
       <Small />
       <Graphs />
       <Shows />
       <Install />
       <Spacer />
       <Big /> */ }
       <Tagset/>
       { /* <Docs /> */ }
       { /* <Footer /> */ }
      </div>
      );
  }
}
export default All;
