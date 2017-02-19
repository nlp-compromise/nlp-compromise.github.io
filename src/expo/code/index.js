import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import formatter from 'js-beautify'
import Zap from 'react-icons/lib/go/zap'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../../shared/codemirror/codemirror.css';
import '../../shared/codemirror/mytheme.css';

const style = styler`
  container
    // margin-left:10%
    max-width:700px;
  error
    color:darkred;
    margin-left:50px;
  valid
    border:1px solid lightgrey;
  invalid
    border:2px solid darkred;
  go:
    width:100%
    height:25px
    color:white
    font-weight:700
    paddingTop:5px
    font-size:18px
    text-align:center
    background-color:steelblue
    border-radius:0 0 7px 7px
    cursor:pointer;
`

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      result: null,
      dirty: true,
      code: this.formatCode(props.code || '')
    }
    this.callback = props.callback || function() {}
    this.css = style
    this.go = this.go.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.hasChanged = this.hasChanged.bind(this)
  }
  formatCode(code) {
    return formatter(code, {
      indent_size: 2
    })
  }
  go() {
    this.setState({
      dirty: false
    });
    this.callback(this.state.code)
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
  hasChanged(newCode) {
    this.setState({
      code: newCode,
      dirty: true
    });
  }
  render() {
    let {state, props, css} = this
    var options = {
      // lineNumbers: true,
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
    let button = {
      backgroundColor: '#7caed8',
      color: 'lightgrey',
      opacity: 0.7
    // height: 10
    }
    // let title = null
    if (this.state.dirty) {
      button = {
        backgroundColor: 'steelblue'
      }
    }
    return (
      <div style={css.container}>
        <div style={border}>
          <Codemirror value={state.code} onChange={this.hasChanged} options={options} onFocusChange={this.onFocusChange}/>
        </div>
        <div style={css.error}>{props.error || ''}</div>
        <div style={[css.go, button]} onClick={this.go}>
          <span>
            {'run  '}
            <Zap/>
          </span>
        </div>
      </div>
    )
  }
}
Code = Radium(Code);
module.exports = Code
