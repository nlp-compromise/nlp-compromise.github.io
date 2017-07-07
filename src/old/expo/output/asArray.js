import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'
import hljs from 'highlight.js'
const style = styler`
json
  background-color: whitesmoke
  margin:20
`

class AsArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
  }
  componentDidUpdate() {
    let el = document.getElementById('asArr');
    hljs.highlightBlock(el);
  }
  render() {
    let {props, css} = this
    let arr = props.result.asArray()
    return (
      <div style={css.json} id='asArr'>
        <pre>{JSON.stringify(arr, null, 2)}</pre>
      </div>
    )
  }
}
AsArray = Radium(AsArray);
module.exports = AsArray
