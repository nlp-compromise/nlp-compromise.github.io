import React from 'react';
import Text from './text/index';
import Code from './code';
import exec from './eval';

import CodeMirror from '../lib/codemirror';
import styler from 'react-styling';
const style = styler`
main
  margin-top:50
  margin-bottom:50
  padding:50
container
  flex:1;
  width:100%;
  text-align:center
  border-left:3px solid #6393b9
  box-sizing: border-box;
header:
  margin:10
  color:silver
  font-size:30
footer:
  margin:10
  color:silver
  text-align:right;
  margin-right:10%
  font-size:14
link:
  color:steelblue
  text-decoration:none
flex:
  display:flex;
  flex-wrap:wrap
result:
  display:block
  textAlign:left
  position:relative
  min-height:20
  width:50%;
  max-height:400px
  overflow:auto
  border-bottom:1px solid linen;
  margin-left:25%;
  overflow:auto;
`;

class Big extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    };
    this.css = style;
    this.eval = this.eval.bind(this);
  }
  eval(code) {
    let text = this.refs.text.state.text;
    exec({ text: text, code: code }, (r, err) => {
      if (err) {
        console.log(err);
      }
      if (r) {
        if (r.isA === 'Text') {
          if (r.length > 100) {
            r = r.slice(0, 100);
          }
          r = r.out('array');
          // console.log(r.length);
          // r.push('[-truncated result to 100-]');
        }
        r = JSON.stringify(r, null, 2);
      }
      this.setState({ result: r });
    });
  }
  render() {
    let { css, state } = this;
    return (
      <div>
        <div style={css.container}>
          <div style={css.header}>kick it around a bit:</div>
          <div style={css.flex}>
            <Code eval={this.eval} cmp={this} />
            <Text ref="text" cmp={this} />
          </div>
        </div>
        <div style={css.result}>
          <CodeMirror code={state.result} readOnly={true} />
        </div>
        <div style={css.footer}>
          {'see the '}
          <a style={css.link} href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">
            results on tests
          </a>
        </div>
      </div>
    );
  }
}
module.exports = Big;
