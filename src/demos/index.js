import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import Firebase from './firebase';

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
demo:
  margin:50
title:
  color:steelblue
  text-decoration:none
about:
  color:lightgrey
  padding:8
`;

class Demos extends React.Component {
  constructor() {
    super();
    this.state = {
      demos:{}
    };
    this.css = style;
    this.db = new Firebase();
    this.db.fetchDemos((obj)=>{
      this.setState({demos:obj})
    });
    this.printDemos=this.printDemos.bind(this)
  }
  printDemos(){
    let {state,css}=this
    let demos=state.demos||{}
    return Object.keys(demos).map((k)=>{
      return (<div style={css.demo}>
        <a href={'./expo/'+k} style={css.title}>{demos[k].title}</a>
        <div style={css.about}>{demos[k].about}</div>
      </div>
    )
    })
  }
  render() {
    let {css} = this;
    return (
    <div style={css.container}>
      demos!
      <ul>
        {this.printDemos()}
      </ul>
    </div>
      );
  }
}
Demos = Radium(Demos);
module.exports = Demos
