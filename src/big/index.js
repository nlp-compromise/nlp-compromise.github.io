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
  justify-content: center;
  align-items: center;
  flex-wrap:wrap
result:
  display:block
  textAlign:left
  position:relative
  min-height:20
  max-height:400px
  overflow:auto
  border-bottom:1px solid linen;
  width:60%;
  margin-left:20%;
  min-width:200
  overflow:auto;
`;

class Big extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
      running: false
    };
    this.css = style;
    this.eval = this.eval.bind(this);
  }
  componentDidMount() {
    this.eval();
  }
  eval() {
    let text = this.refs.text.state.text;
    let code = this.refs.code.state.code;
    this.setState({
      running: true
    });
    exec({
      text: text,
      code: code
    }, (r, err) => {
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
      this.setState({
        result: r,
        running: false
      });
    });
  }
  render() {
    let {css, state} = this;
    let bottom = Object.assign({}, css.result)
    if (state.running) {
      bottom.opacity = 0.3
      console.log('running!')
    }
    return (
      <div>
        <div style={css.container}>
          <div style={css.header}>kick it around a bit:</div>
          <div style={css.flex}>
            <Code ref='code' cmp={this} />
            <Text ref='text' cmp={this} />
          </div>
        </div>
        <div style={bottom}>
          <CodeMirror code={state.result} readOnly={true} />
        </div>
        <div style={css.footer}>
          {'see the '}
          <a style={css.link} href='https://github.com/nlp-compromise/compromise/wiki/Accuracy'>
            results on tests
          </a>
        </div>
      </div>
      );
  }
}
export default Big;
