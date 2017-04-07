'use strict';
import React from 'react';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import '../../shared/codemirror/codemirror.css';
import '../../shared/codemirror/mytheme.css';
const options = {
  mode: 'javascript',
  theme: 'spencertheme',
  readOnly: true
}
//
const Code = (props) => {
  let container = {
    border: '1px solid lightgrey',
    borderRadius: 5,
    display: 'block',
    maxWidth: 600
  }
  return (
    <div style={container}>
      <Codemirror options={options} value={props.code} />
    </div>
  )
}
module.exports = Code
