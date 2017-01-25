import React from 'react';
import styler from 'react-styling'
import Radium from 'radium'

const style = styler`
html:
  color:grey
.nl-Noun {
  color:steelblue
}
`

class Html extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result:props.result
    }
    this.css = style
  }
  render() {
    let {state, css}=this
    let html=state.result.out('html')
    return (
      <div style={css} dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    )
  }
}
Html = Radium(Html);
module.exports = Html
