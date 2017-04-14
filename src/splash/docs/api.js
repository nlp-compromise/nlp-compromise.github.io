'use strict';
import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import { docs } from '../../shared/nlp';

const style = styler`
section:
  display:block
  position:relative;
  width:80%
  min-height:80
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
showing:
  marginLeft:80
  text-align:left
  paddingTop:20
  paddingBottom:20
  height:5
method:
  width:150px
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

  drawFn(obj, k) {
    let {state, css} = this
    if (state[k]) {
      return (
        <div style={css.showing}>
          {state[k]}
        </div>
      )
    }
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
        {this.drawFn(obj, k)}
      </div>
    )
  }
  render() {
    let css = this.css
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
