import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'

const style = styler`
`

class Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = {}
    console.time('ashtml')
    // this.props.result.asHtml()
    console.timeEnd('ashtml')
  }
  render() {
    console.log('hi')
    let {props, state, css} = this
    return (
      <div>

      </div>
    )
  }
}
Html = Radium(Html);
module.exports = Html
