import React from 'react';
import styler from 'react-styling';
import Header from './header';
import Intro from './intro';
import Small from './small';
import './index.css';
const style = styler`
container
  position:relative;
  display:flex;
  flex-direction: column;
  width:100%;
  font-family: Raleway,serif;
`;

class All extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <Header />
        <Intro />
        <Small />
      </div>
    );
  }
}
module.exports = All;
