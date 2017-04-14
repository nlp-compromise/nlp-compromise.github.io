'use strict';
import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import { docs } from '../../shared/nlp';

const style = styler`
section:
  display:block
  width:80%
  height:80
  methods:
    marginLeft:50
  title:
    display:inline-block
    marginTop:15
    marginLeft:25
    paddingBottom:10
    paddingLeft:10
    borderLeft:2px dotted lightsteelblue
    font-size:18px;
    width:80
method:
  width:150px
  height:40
  color:silver
  text-align:center
  paddingTop:10
  paddingBottom:80
  title:
    display:inline-block;
    marginLeft:60
    paddingLeft:5
    paddingRight:5
    border-bottom:1px dotted lightsteelblue
`
class Api extends React.Component {
  constructor() {
    super()
    this.css = style;
    this.section = this.section.bind(this)
    this.method = this.method.bind(this)
  }
  method(obj, fn) {
    let method = this.css.method
    return (
      <span style={method} key={fn}>
        <span style={method.title}>{'.' + fn + '()'}</span>
      </span>
    )
  }
  section(obj, k) {
    let section = this.css.section
    let methods = Object.keys(obj[k]).map((fn) => this.method(obj[k][fn], fn))
    return (
      <div style={section} key={k}>
        <span style={section.title}>
          {k + ':'}
        </span>
        <div style={section.methods}>
          {methods}
        </div>
      </div>
    )
  }
  render() {
    let css = this.css
    console.log(docs)
    let api = Object.keys(docs.generic).map((k) => this.section(docs.generic, k))
    let subsets = Object.keys(docs.subsets).map((k) => this.section(docs.subsets, k))
    return (
      <div style={css.container}>
        api:
        {api}
        <hr/>
        subsets:
        {subsets}
      </div>
    )
  }
}

Api = Radium(Api);
module.exports = Api
