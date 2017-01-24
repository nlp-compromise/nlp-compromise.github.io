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
  padding:2
  paddingLeft:7
  paddingRight:7
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
  node: `import nlp from 'compromise'

var r = nlp('dinosaur').nouns().toPlural();
var str = r.normal();

console.log(str);
//'dinosaurs'
`,
  html: `<script src="https://unpkg.com/compromise/builds/compromise.min.js"></script>
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
        fontSize: 25,
        marginLeft: 100
      }]}>
          {'so'}
          <span style={[css.orange, {
        marginLeft: 15
      }]}>
            {'um,'}
          </span>
        </div>
        <div style={css.code}>
          {'npm install compromise'}
        </div>

        <table style={css.install}>
          <tr style={{
        color: 'grey'
      }}>
            <td>{'on a server:'}</td>
            <td>{'or in a client:'}</td>
          </tr>
          <tr>
            <td style={css.mode}>
              <Codemirror options={node} value={examples.node}/>
             </td>
            <td style={css.mode}>
              <Codemirror options={html} value={examples.html}/>
             </td>
          </tr>
        </table>

      </div>
    )
  }
}
Install = Radium(Install);

module.exports = Install
