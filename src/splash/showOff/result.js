import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import chooseTag from '../../shared/colors';

const style = styler`
container:
  position:relative
tagName:
  position:absolute
  bottom:-20
  right:15
  fontSize:11
demo
  color:dimgrey
  marginTop:0
  padding:0
  font-family:Inconsolata
`;


class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
    this.doTerm = this.doTerm.bind(this)
  }

  doTerm(t, i) {
    let {css} = this
    let a = chooseTag(t)
    let tag = a[0]
    let color = a[1] || 'dimgrey'
    let highlight = {
      borderBottom: '4px solid ' + color
    }
    let space = {
      fontSize: 50
    }
    let bottom = {
      color: color,
      marginLeft: 10
    }
    console.log(t.silent_term)
    if (t.silent_term && !t.text) {
      tag = ''
    }
    if (t.text.length <= 2) {
      bottom.right = 10
      bottom.bottom = -30
    }
    return (
      <span key={i} style={css.container}>
       <span style={highlight}>
         {t.text.trim()}
       </span>
       <span style={space}>
         {' '}
        </span>
       <span style={[css.tagName, bottom]}>
         {tag}
       </span>
     </span>
    )
  }

  render() {
    let {props, css} = this
    let the = props.result.flatten().list[0]
    if (!the) {
      return null
    }
    let terms = the.terms
    return (
      <div style={css.demo}>
       {terms.map(this.doTerm)}
      </div>
    )
  }
}
Result = Radium(Result);
module.exports = Result
