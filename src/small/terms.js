import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import chooseTag from './colors';

const style = styler`
term:
  position:relative
  margin:5px;
  border:1px solid grey
tagName:
  position:absolute
  bottom:-20
  right:15
  fontSize:11
terms
  color:#b4adad
  marginTop:0
  padding:0
  display:flex;
  text-align:center;
  font-family:Inconsolata
  fontSize:27
`;

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
    this.doTerm = this.doTerm.bind(this);
  }

  doTerm(t, i) {
    let {css} = this;
    let a = chooseTag(t);
    let tag = a[0];
    let color = a[1] || 'dimgrey';
    let highlight = {
      borderBottom: '4px solid ' + color
    };
    let space = {
      fontSize: 50
    };
    let bottom = {
      color: color,
      marginLeft: 10
    };
    let text = t.text.trim()
    if (t.silent_term) {
      text = t.silent_term
    }
    return (
      <span key={i} style={css.term}>
        <span style={highlight}>
          {text}
        </span>
        <span style={space}>
          {' '}
        </span>
        <span style={[css.tagName, bottom]}>
          {tag}
        </span>
      </span>
      );
  }

  render() {
    let {props, css} = this;
    let the = props.result.flatten().list[0];
    if (!the) {
      return null;
    }
    return (
      <div style={css.terms}>
        {props.result.list.map((ts, i) => {
        return (
          <span key={i}>
              {ts.terms.map(this.doTerm)}
            </span>
          );
      })}
      </div>
      );
  }
}
Terms = Radium(Terms);
module.exports = Terms;
