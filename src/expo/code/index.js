import React from 'react';
import styler from 'react-styling/flat';
import formatter from 'js-beautify'
import nlp from '../../shared/nlp';

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

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      result: null,
      code : this.formatCode(props.code||'')
    }
    this.callback=props.callback||function(){}
    this.css = style
    this.updateCode = this.updateCode.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
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
    this.callback(newCode)
  }
  onFocusChange(focused) {
    if (!focused) {
      this.callback(this.state.code)
    }
  }
  render() {
    let {state, props, css} = this
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
    if (!props.valid) {
      border = css.invalid
    }
    console.log(props.error)
    return (
      <div style={css.container}>
        <div style={border}>
          <Codemirror value={state.code} onChange={this.updateCode} options={options} onFocusChange={this.onFocusChange}/>
        </div>
        <div style={css.error}>{props.error||''}</div>
      </div>
    )
  }
}
module.exports = Code
