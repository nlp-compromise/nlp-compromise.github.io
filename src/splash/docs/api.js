'use strict';
import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import { docs, version } from '../../shared/nlp';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../../shared/codemirror/codemirror.css';
import '../../shared/codemirror/mytheme.css';

docs.generic.subsets = docs.subsets

const style = styler`
container:
  position:relative;
  margin-top:50
  margin-left:50
heading
  font-size:30px;
  color:steelblue;
border
  border:1px solid whitesmoke
subset:
  color:lightsteelblue;
  font-weight:300;
each:
  marginLeft:15
  height:100px;
  paddingBottom:10
  paddingTop:10
  paddingLeft:20
  marginLeft:80
  borderLeft:2px dotted lightsteelblue
  margin:40
about
  width:100%;
  display:flex
  flex-flow:space-between
desc:
  flex:2
  flex-basis:80px
  color:grey
  margin-left:20
  padding-right:30
title:
  color:steelblue
  text-decoration:none;
  font-weight:600
  font-size:20
return:
  color:lightgrey
  font-size:12
  flex:1
section:
  display:block
  position:relative;
  width:80%
  min-height:80
  methods:
    marginLeft:50
  title:
    display:inline-block
    marginTop:25
    marginLeft:25
    paddingBottom:10
    paddingLeft:10
    borderLeft:2px dotted lightsteelblue
    font-size:18px;
    width:200
showing:
  marginLeft:80
  text-align:left
  paddingTop:20
  paddingBottom:20
  height:5
method:
  width:250px
  height:40
  color:silver
  text-align:center
  paddingTop:10
  paddingBottom:80
  title:
    display:inline-block;
    cursor:pointer;
    marginLeft:15
    marginRight:15
    min-width:75px;
    marginTop:15
    paddingLeft:2
    paddingRight:2
    border-bottom:1px dotted lightsteelblue;
    shown:
      color:steelblue
      border-bottom:1px solid steelblue;
    :hover{
      color:steelblue
    }
`
class Api extends React.Component {
  constructor() {
    super()
    this.css = style;
    this.state = {}
    this.section = this.section.bind(this)
    this.method = this.method.bind(this)
    this.showMethod = this.showMethod.bind(this)
    this.drawFn = this.drawFn.bind(this)
    this.drawFns = this.drawFns.bind(this)
  }
  showMethod(fn, k) {
    if (this.state[k] === fn) {
      this.state[k] = null
    } else {
      this.state[k] = fn
    }
    this.setState(this.state)
  }

  method(obj, fn, k) {
    let method = this.css.method
    let show = {}
    if (this.state[k] === fn) {
      show = method.title.shown
    }
    return (
      <span style={method} key={fn}>
        <span style={[method.title, show]} key={k + fn} onClick={this.showMethod.bind(this, fn, k)}>
          {'.' + fn + '()'}
        </span>
      </span>
    )
  }

  drawFns(obj, k) {
    let {state} = this
    if (state[k] && docs.generic[k]) {
      let doc = docs.generic[k][state[k]]
      if (doc.data && typeof doc.data === 'object') {
        console.log(doc)
        let subset = '.' + state[k] + '()'
        return Object.keys(doc).map((name) => this.drawFn(doc[name], name, subset))
      }
      return this.drawFn(doc, k, '')
    }
  }

  drawFn(doc, k, subset) {
    let {state, css} = this
    let options = {
      readOnly: true,
      mode: 'javascript',
      theme: 'spencertheme',
      tabSize: 2,
      lint: false
    };
    subset = <span style={css.subset}>{subset || ''}</span>
    return (
      <div key={k} style={[css.showing, css.each]}>
          <div style={css.title}>
            {subset}
            {'.' + (state[k] || k) + '()'}</div>
          <div style={css.about}>
            <span style={css.desc}>{doc.desc}</span>
            <div style={css.return}>
              {'returns: '}
              <span style={css.class}>{doc.returns}</span>
            </div>
          </div>
          <div style={css.border}>
            <Codemirror style={css.code} value={doc.example} options={options}/>
          </div>
        </div>
    )
  }
  section(obj, k) {
    let section = this.css.section
    let methods = Object.keys(obj[k]).map((fn) => this.method(obj[k][fn], fn, k))
    return (
      <div style={section} key={k}>
        <span style={section.title}>
          {k + ':'}
        </span>
        <div style={section.methods}>
          {methods}
        </div>
        {this.drawFns(obj, k)}
      </div>
    )
  }
  render() {
    let css = this.css
    let api = Object.keys(docs.generic).map((k) => this.section(docs.generic, k))
    return (
      <div style={css.container}>
        <b style={css.heading}>api:</b> <i>(latest)</i>
        {api}
      </div>
    )
  }
}

Api = Radium(Api);
module.exports = Api
