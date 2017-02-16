import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import {docs} from '../shared/nlp';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../shared/codemirror/codemirror.css';
import '../shared/codemirror/mytheme.css';

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
border
  border:1px solid whitesmoke
about
  width:100%;
  display:flex
  flex-flow:space-between
desc:
  flex:2
return:
  flex:1
class:
  color:darkred;
  font-weight:600
method:
  color:steelblue
each:
  padding:8
`;
console.log(docs)
class Docs extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.css = style;
    this.renderMethod=this.renderMethod.bind(this)
  }
  renderMethod(obj, k, i){
    let {css}=this
    let options = {
      // lineNumbers: true,
      mode: 'javascript',
      theme: 'spencertheme',
      styleActiveLine: true,
      tabSize: 2,
      gutters: ['CodeMirror-lint-markers'],
      lint: false
    };
    return (
      <div key={i} style={css.each}>
        <h3 style={css.method}>{'.'+k+'()'}</h3>
        <div style={css.about}>
          <span style={css.desc}>{obj.desc}</span>
          <div style={css.return}>
            {'returns: '}
            <span style={css.class}>{obj.returns}</span>
          </div>
        </div>
        <div style={css.border}>
          <Codemirror style={css.code} value={obj.example} options={options}/>
        </div>
      </div>
    )
  }
  render() {
    let {css} = this;
    let generic=Object.keys(docs.generic).map((k,i)=>{
      return this.renderMethod(docs.generic[k], k, i)
    })
    return (
      <div style={css.container}>
        docs!
        <ul>
          {generic}
        </ul>
      </div>
      );
  }
}
Docs = Radium(Docs);
module.exports = Docs
