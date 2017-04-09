import React, { Component } from 'react';
import Radium from 'radium';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../../shared/codemirror/codemirror.css';
import '../../shared/codemirror/mytheme.css';
import styler from 'react-styling';
const style = styler`
code:
  color:dimgrey
  display:inline
  padding:2px 7px 2px 7px
  position:relative
  marginLeft:90
  top:10
  font-size:22
  background-color:whitesmoke
  border:1px solid lightgrey;
  border-radius:5
install:
  position:relative
  marginTop:15
  marginLeft:10%
  marginRight:10%
mode:
  border:1px solid lightgrey
  color:lightgrey
  width:50%
`

const examples = {
  node: `var nlp = require('compromise')

var word = nlp('dinosaur')
//inflects/pluralizes
word.nouns().toPlural();

console.log(word.out('text'));
//'dinosaurs'
`,

  html: `<script src="https://unpkg.com/compromise/builds/compromise.min.js"></script>
<script>
  var num = nlp('five-hundred and twenty')
  num.values().toNumber();

  document.body.innerHTML = num.out('text');
  //'520'
</script>
`
}

class Install extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
  }
  render() {
    let {css} = this
    const node = {
      mode: 'javascript',
      theme: 'spencertheme',
      readOnly: true
    }
    const html = {
      mode: 'htmlmixed',
      theme: 'spencertheme',
      readOnly: true
    }
    return (
      <div>
        <div style={[css.headline, {
        marginTop: 45,
        marginLeft: 100
      }]}>
        <b>compromise</b> is a one single javascript file, and is only about 210kb
        <br/>
         so just go:
        </div>
        <div style={css.code}>
          {'npm install compromise'}
        </div>

        <table style={css.install}>
          <tbody>
            <tr style={{
        color: 'grey'
      }}>
              <td>{'on a server:'}</td>
              <td>{'in a browser:'}</td>
            </tr>
            <tr>
              <td style={css.mode}>
                <Codemirror options={node} value={examples.node}/>
               </td>
              <td style={css.mode}>
                <Codemirror options={html} value={examples.html}/>
               </td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }
}
Install = Radium(Install);

module.exports = Install
