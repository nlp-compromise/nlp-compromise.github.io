import nlp from '../../../nlp_compromise/src/index';
import React, { Component } from 'react';

class Output extends Component {
  render() {
    let data = this.props.data
    let result = nlp(data.input, data.context).render(data.render)
    let html = {
      __html: result
    }

    let css = {
      padding: '1%',
      minHeight: 250,
      margin: '10%',
      fontSize: 35,
      border: '1px dashed lightgrey',
      color: 'darkslategray',
      textAlign: 'center'
    }
    return (
      <div style={css}>
        <div dangerouslySetInnerHTML={html}/>
      </div>
    )
  }
}
module.exports = Output
