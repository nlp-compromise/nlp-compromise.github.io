import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'
const style = styler`
  container
    border:1px solid lightgrey
    border-radius:3px
    min-width:250
    min-height:50
    padding:15
    line-height:175%
    display:inline-block
  term
    color:dimgrey
`
class Dirty extends React.Component {
  constructor(props) {
    super(props);
    this.css = style
    this.renderText = this.renderText.bind(this)
    this.renderArray = this.renderArray.bind(this)
  }
  renderArray() {
    let {props} = this
    return <pre>{JSON.stringify(props.result, null, 2)}</pre>
  }
  renderText() {
    let {css, props} = this
    return props.result.list.map((ts, i) => {
      let sen = ts.terms.map((t, o) => {
        let c = {}
        if (t.dirty) {
          c.color = 'steelblue'
        }
        return <span key={o} style={[css.term, c]}>{t.out('text')}</span>
      })
      return <div key={i}>{sen}</div>
    })
  }
  render() {
    let {css, props} = this
    let result = props.result
    let output = null
    if (typeof result === 'string') {
      output = (<pre>{result}</pre>)
    } else if (typeof result === 'object') {
      if (result.isA === 'Text') {
        output = this.renderText()
      } else {
        output = this.renderArray()
      }
    }
    return (
      <pre style={css.container}>
        {output}
      </pre>
    )
  }
}
Dirty = Radium(Dirty);
module.exports = Dirty
