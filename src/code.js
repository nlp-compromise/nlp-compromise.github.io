'use strict';
import React from 'react';
import styler from 'react-styling/flat';
import Codemirror from 'react-codemirror'
import './lib/codemirror.css';
import './lib/mytheme.css';
import 'codemirror/mode/javascript/javascript'
// import 'codemirror/theme/base16-light.css'
// import 'codemirror/theme/mdn-like.css'

const style = styler`
  code
    width:80%
    border: 1px solid steelblue
`
class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `let x=3;
for(var x=3; x<=6; x++){
//fs
  function(s){
    console.log(s)
    "asdf"
  }
}
nlp(mything).match('#lkjsdfj').filter(()=>{})
`
    }
    this.css = style
  }
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  render() {
    let {state, css} = this
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'spencertheme',
      styleActiveLine: true,
      tabSize: 2
    };
    return <Codemirror value={state.code}  onChange={this.updateCode}  options={options} />
  }
}
module.exports = Code
