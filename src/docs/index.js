import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import { docs } from '../shared/nlp';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../shared/codemirror/codemirror.css';
import '../shared/codemirror/mytheme.css';

const style = styler`
container
  width: 90%
  margin: 2%
collection:
  padding: 8
border
  border:1px solid whitesmoke
about
  width:100%;
  display:flex
  flex-flow:space-between
desc:
  flex:2
  flex-basis:80px
  color:grey
return:
  color:lightgrey
  font-size:12
  flex:1
class:
  color:darkred;
  font-weight:600
method:
  color:steelblue
  text-decoration:none;
  font-weight:600
  font-size:18
each:
  marginLeft:50
  padding:25
collapse:
  color:darkgrey
  text-decoration:underline
`;

let options = {
  readOnly: true,
  mode: 'javascript',
  theme: 'spencertheme',
  tabSize: 2,
  lint: false
};

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.css = style;
    this.renderMethod = this.renderMethod.bind(this)
    this.renderCollection = this.renderCollection.bind(this)
  }
  renderCollection(obj, section, i) {
    let {css} = this
    return (
      <div key={i} id={section} style={css.collection}>
        <a href={'#' + section} style={css.collapse}>
          {section + ':'}
        </a>
        <div style={css.group}>
          {Object.keys(obj).map((fn, o) => this.renderMethod(obj[fn], fn, o, section))}
        </div>
      </div>
    )
  }
  renderMethod(obj, k, i, section) {
    let {css} = this
    let id = section + '/' + k
    return (
      <div key={i} id={id} style={css.each}>
        <a href={'#' + id} style={css.method}>{'.' + k + '()'}</a>
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
    let generic = Object.keys(docs.generic).map((k, i) => {
      return this.renderCollection(docs.generic[k], k, i)
    })
    let subsets = Object.keys(docs.subsets).map((k, i) => {
      return this.renderCollection(docs.subsets[k], k, i)
    })
    return (
      <div style={css.container}>
        docs!
        <ul>
          {generic}
          {subsets}
        </ul>
      </div>
      );
  }
}
Docs = Radium(Docs);
module.exports = Docs
