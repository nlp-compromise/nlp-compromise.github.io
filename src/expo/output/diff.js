import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'
import hljs from 'highlight.js'
import chooseTag from '../../shared/colors';
const style = styler`
plaintext
  width:100%
  white-space: pre-wrap
  word-wrap: break-word
  color: darkgrey
  marginLeft:15
  marginRight:15
`

class Diff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
  }

  render() {
    let {props, css} = this
    let result=props.result.clone()
    let html=result.list.map((ts,i)=>{
      let terms=ts.terms.map((t,o)=>{
        let style={}
        console.log(t.dirty)
        if(t.dirty){
          style={
            color:'steelblue'
          }
        }
        return (
          <span key={i+''+o} style={style}>
            {t.whitespace.before+t.text+t.whitespace.after}
          </span>
        )
      })
      return (
        <div>
          {terms}
        </div>
      )
    })
    let txt = props.result.out('text')
    return (
      <div style={css.plaintext} >
        {txt}
      </div>
    )
  }
}
Diff = Radium(Diff);
module.exports = Diff
