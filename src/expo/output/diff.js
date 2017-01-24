import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';
import { diffWords } from 'diff';
const style = styler`
container
  marginLeft:10%
  marginRight:10%
  width:100%
  white-space: pre-wrap
  word-wrap: break-word
  color: darkgrey
  marginLeft:15
  marginRight:15
`;

class Diff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: []
    };
    this.css = style;
    this.doDiff = this.doDiff.bind(this);
    this.doDiff();
  }
  doDiff() {
    let cmp = this.props.cmp;
    let r = cmp.state.result;
    let oldStr = cmp.state.text;
    let newStr = r.plaintext();
    this.setState({
      diff:diffWords(newStr, oldStr)
    });
  }
  render() {
    let {state, css} = this;
    let diff = state.diff.map((o) => {
      let css = {
        color: 'grey'
      };
      if (o.added) {
        css.color = '#b30000';
        css.backgroundColor = '#fadad7';
      }
      if (o.removed) {
        css.color = '#406619';
        css.backgroundColor = '#eaf2c2';
      }
      return <span style={css}>{o.value}</span>;
    });
    return (
      <div style={css.container}>
        {diff}
      </div>
      );
  }
}
Diff = Radium(Diff);
module.exports = Diff;
