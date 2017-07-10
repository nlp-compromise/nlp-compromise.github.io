import React, { Component } from 'react';
import Radium from 'radium';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import './codemirror.css';
import './mytheme.css';
import styler from 'react-styling';
const style = styler`
code:
  flex:1
  // margin:10
  padding:2px 7px 2px 7px
  position:relative
  font-size:22
  text-align:left;
  background-color:white
  border:1px solid lightgrey;
  border-radius:5
`;

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
    this.html = {
      mode: 'htmlmixed',
      theme: 'spencertheme',
      readOnly: props.readOnly
    };
    this.js = {
      mode: 'javascript',
      theme: 'spencertheme',
      readOnly: props.readOnly
    };
  }
  render() {
    let { css, props } = this;
    let options = this.js;
    if (props.type === 'html') {
      options = this.html;
    }
    return (
      <div style={css.code}>
        <Codemirror options={options} value={props.code} />
      </div>
    );
  }
}
Code = Radium(Code);
module.exports = Code;
