import React from 'react';
import Text from './text/index';
import Code from './code';

import styler from 'react-styling';
const style = styler`
container
  flex:1;
  width:100%;
  margin-top:50
  margin-bottom:50
  text-align:center
  padding:50
  border-left:3px solid #6393b9
header:
  margin:10
  color:silver
  font-size:30
footer:
  margin:10
  color:silver
  font-size:14
link:
  color:steelblue
  text-decoration:none
flex:
  display:flex;
  justify-content: center;
`;

class Big extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <div style={css.header}>
          kick it around a bit:
        </div>
        <div style={css.flex}>
          <Code cmp={this} />
          <Text cmp={this} />
        </div>
        <div style={css.footer}>
          expected <a style={css.link} href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">test results</a>
        </div>
      </div>
    );
  }
}
module.exports = Big;
