import React from 'react';
import styler from 'react-styling/flat';
import formatter from 'js-beautify'
import nlp from 'compromise';
window.nlp = nlp

import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../../shared/codemirror/codemirror.css';
import '../../shared/codemirror/mytheme.css';

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
    let code=props.code || placeholder
    this.state = {
      error: null,
      valid: true,
      result: null,
      code : this.formatCode(code)
    }
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
      let result = eval(code)
      console.log(result)
      props.cmp.setState({
        result : result
      })
      this.setState({
        result:result,
        code:this.formatCode(state.code),
        error: null,
        valid : true
      })
    } catch (e) {
      this.setState({
        result:null,
        error : e.toString(),
        valid : false
      })
      console.log(e)
    }
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
      gutters: ['CodeMirror-lint-markers'],
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
