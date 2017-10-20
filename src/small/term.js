import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import chooseTag from './colors';

const style = styler`
term:
  padding:8px;
  position:relative;
tagName:
  fontSize:10px
  text-align:right;
  margin-top:3px;
above:
  fontSize:10px
  position:absolute;
  top:-2px;
  left:10px;
`;

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
  }
  render() {
    let {css, props} = this;
    let {term, i} = props
    let a = chooseTag(term);
    let tag = a[0];
    let color = a[1] || 'dimgrey';
    let highlight = {
      borderBottom: '4px solid ' + color
    };
    let above = ''
    let text = term.text.trim()
    if (term.silent_term) {
      highlight.color = 'lightgrey'
      text = term.silent_term
      above = term.text || ' '
    }

    let tagName = Object.assign({}, css.tagName)
    tagName.color = color

    return (
      <div key={i} style={css.term}>
        <div style={css.above}>
          {above}
        </div>
        <div style={highlight}>
          {text}
        </div>
        <div style={tagName}>
          {tag}
        </div>
      </div>
      );
  }
}
// Terms = Radium(Terms);
export default Terms;
