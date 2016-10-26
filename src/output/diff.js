import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'

const style = styler`
`

class Diff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = {}
  }
  render() {
    let {props, state, css} = this
    return (
      <div>

      </div>
    )
  }
}
Diff = Radium(Diff);
module.exports = Diff
