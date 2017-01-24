import React from 'react';
import styler from 'react-styling'
import Radium from 'radium'

const style = styler`
`

class Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
Html = Radium(Html);
module.exports = Html
