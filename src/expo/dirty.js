import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'
const style = styler`
  container
    border-top:1px solid lightgrey
    border-left:1px solid lightgrey
    border-radius:7px 0 0 0
    padding:15
    line-height:175%
  term
    color:dimgrey
`
class Dirty extends React.Component {
  constructor(props) {
    super(props);
    this.css = style
    this.renderText = this.renderText.bind(this)
  }
  renderText() {
    let {css, props} = this
    return props.result.list.map((ts) => {
      let sen = ts.terms.map((t) => {
        let c = {}
        if (t.dirty) {
          c.color = 'steelblue'
        }
        return <span style={[css.term, c]}>{t.out('text')}</span>
      })
      return <div>{sen}</div>
    })
  }
  render() {
    let {css} = this
    return (
      <pre style={css.container}>
        {this.renderText()}
      </pre>
    )
  }
}
Dirty = Radium(Dirty);
module.exports = Dirty