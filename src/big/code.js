import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
const style = styler`
container
  display:flex;
  flex-direction:column
  width:400px
code:
  min-height:60
  outline:none;
  padding:15
  color:grey
  border-radius:7px 7px 0px 0px
runButton:
  height:20
  text-align:center
  background-color:coral
  color:white
  border-radius:0px 0px 7px 7px
result:
  min-height:30
  max-height:250
  border-radius:7px 7px 7px 7px
  padding:8
  color:grey
  border:1px solid linen
  margin-left:5
`;

class Code extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <textarea resize="none" style={css.code}> </textarea>
        <i style={css.runButton}>⚡</i>
        <textarea style={css.result}> </textarea>
      </div>
    );
  }
}
Code = Radium(Code);
module.exports = Code;
