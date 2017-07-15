import React, { Component } from 'react';
import Radium from 'radium';
import CodeMirror from '../lib/codemirror';
import styler from 'react-styling';
const style = styler`
container:
  padding:50
  color:grey
  border-left:5px solid #f39c73
both:
  display:flex
  margin:20
console:
  color:dimgrey
  display:inline
  padding:2px 7px 2px 7px
  position:relative
  marginLeft:15
  // top:10
  font-size:22
  background-color:whitesmoke
  border:1px solid lightgrey;
  border-radius:5
link:
  color:steelblue
  text-decoration:none;
right:
  position:relative
  right:0
  float:right
  top:-20
`;

const examples = {
  node: `var nlp = require('compromise')

var doc = nlp('dinosaur')

doc.nouns().toPlural();
console.log(doc.out('text'));
// 'dinosaurs'
`,

  html: `<script src="https://unpkg.com/compromise/builds/compromise.min.js"></script>
<script>
  var doc = window.nlp('five-hundred and twenty')

  doc.values().toNumber();
  document.body.innerHTML = doc.out('text');
  // '520'
</script>`
};

class Install extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <span style={{ fontSize: 25 }}>🙌 </span> only
        <span style={css.console}>npm install compromise</span>
        <div style={css.both}>
          <div>
            server-side:
            <CodeMirror type={'js'} readOnly={true} code={examples.node} />
          </div>
          <div>
            client-side:
            <CodeMirror type={'html'} readOnly={true} code={examples.html} />
          </div>
        </div>
        <div style={css.right}>
          install in <a style={css.link} href="https://github.com/nlp-compromise/compromise/wiki/QuickStart">funnier-places</a>
        </div>
      </div>
    );
  }
}
Install = Radium(Install);

module.exports = Install;