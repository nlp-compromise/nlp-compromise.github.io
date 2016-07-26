import React, { Component } from 'react';

class Code extends Component {
  render() {
    let data = this.props.data
    let code = 'nlp_compromise(str)'
    for (let i = 0; i < data.methods.length; i++) {
      let m = data.methods[i]
      let title = m.title
      //support strings as transformations
      if (!title) {
        title = '\'' + m.method + '\''
      }
      code += `.${m.kind}(${title})`
    }
    if (data.render) {
      code += `.render('${data.render}')`
    }
    let css = {
      // color: 'black',
      fontFamily: 'Roboto Mono monospace'
    }
    return (
      <div style={css}>
        {code}
      </div>
    )
  }
}
module.exports = Code
