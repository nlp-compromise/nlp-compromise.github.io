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
  right:20
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
    return (
      <span key={i} style={css.container}>
       <span style={{borderBottom: '4px solid ' + color}}>
         {t.text.trim()}
       </span>
       <span style={{fontSize: 50}}>
         {' '}
        </span>
       <span style={[css.tagName, {color: color}]}>
         {tag}
       </span>
     </span>
    )
  }

  render() {
    let {props, css} = this
    let terms = props.result.flatten().list[0].terms
    return (
      <div style={css.demo}>
       {terms.map(this.doTerm)}
      </div>
    )
  }
}
Result = Radium(Result);
module.exports = Result
