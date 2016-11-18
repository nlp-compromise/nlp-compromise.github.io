'use strict';
import React from 'react';
import styler from 'react-styling/flat';
import Codemirror from 'react-codemirror'
import formatter from 'js-beautify'
import nlp from 'nlp_compromise';
window.nlp = nlp
import './lib/codemirror.css';
import './lib/mytheme.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint.css'
// import 'codemirror/theme/base16-light.css'
// import 'codemirror/theme/mdn-like.css'

const style = styler`
  container
    margin-left:10%
    max-width:700px;
  error
    color:darkred;
    margin-left:50px;
  valid
    border:1px solid lightgrey;
  invalid
    border:2px solid darkred;

`
let placeholder = `var context = {}
return nlp(myText, context).match('#Verb')
`


class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.code || placeholder,
      error: null,
      valid: true,
      result: null
    }
    this.state.code = this.formatCode(this.state.code)
    this.css = style
    this.updateCode = this.updateCode.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.eval = this.eval.bind(this)
  }
  componentDidRecieveProps() {
    this.eval()
  }
  formatCode(code) {
    return formatter(code, {
      indent_size: 2
    })
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  eval() {
    console.log('-eval')
    let {state, props} = this
    window.myText = props.text || ''
    try {
      let code = state.code || ''
      code = `(function(){
        ` + code + `
      })()`
      state.result = eval(code)
      console.log(state.result)
      state.error = null
      state.valid = true
      let cmpState = props.cmp.state
      cmpState.result = state.result
      props.cmp.setState(cmpState)
    } catch (e) {
      state.result = null
      state.error = e.toString()
      state.valid = false
      console.log(e)
    }
    state.code = this.formatCode(state.code)
    this.setState(state)
  // CodeMirror.runMode(myCodeMirror.getValue(), "application/javascript", document.getElementById("run_result"));
  }
  onFocusChange(focused) {
    if (!focused) {
      this.eval()
    }
  }
  render() {
    let {state, css} = this
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'spencertheme',
      styleActiveLine: true,
      tabSize: 2,
      gutters: ["CodeMirror-lint-markers"],
      lint: true
    };
    let border = css.valid
    if (!state.valid) {
      border = css.invalid
    }
    return (
      <div style={css.container}>
        <div style={css.error}>{state.error}</div>
        <div style={border}>
          <Codemirror value={state.code}  onChange={this.updateCode}  options={options} onFocusChange={this.onFocusChange}/>
        </div>
      </div>
    )
  }
}
module.exports = Code
