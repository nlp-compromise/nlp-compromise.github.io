import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import style from './style'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import './lib/codemirror.css';
import './lib/mytheme.css';

const examples = {
  node: `import nlp from 'compromise'

var r = nlp('dinosaur').nouns().toPlural();
var str = r.normal();

console.log(str);
//'dinosaurs'
`,
  html: `<script src="https://unpkg.com/compromise@latest/builds/compromise.min.js"></script>
<script>
  var r = window.nlp('dinosaur').nouns().toPlural();

  var str = r.normal();
  document.body.innerHTML= str;
  //'dinosaurs'
</script>
`
}

class Install extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
  }
  componentDidMount() {
    let {state} = this
  }
  render() {
    let {css, state} = this
    const node={
      mode: 'javascript',
      theme: 'spencertheme',
      readOnly: true
    }
    const html={
      mode: 'htmlmixed',
      theme: 'spencertheme',
      readOnly: true
    }
    return (
      <div>
        <div style={[css.headline, {
          marginTop: 20,
          fontSize: 25,
          marginLeft: 100
        }]}>
          {'so'}
          <span style={[css.orange, {marginLeft: 15}]}>
            {'um,'}
          </span>
        </div>
        <div style={css.code}>
          {'npm install compromise'}
        </div>

        <div style={css.install}>
          <div style={css.mode}>
            <Codemirror options={node} value={examples.node}/>
           </div>
          <div style={css.mode}>
            <Codemirror options={html} value={examples.html}/>
           </div>
        </div>
      </div>
    )
  }
}
Install = Radium(Install);

module.exports = Install
