import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import Firebase from './firebase';
import demos from './demos';
import Logo from '../shared/logo';
import HomeIcon from 'react-icons/lib/md/keyboard-arrow-left'

const style = styler`
container
  width: 80%
  margin: 65
  padding: 8
demo:
  margin:50
description
  color:grey
title:
  color:steelblue
  text-decoration:none
about:
  color:lightgrey
  padding:8
home:
  margin-left:50
  color:grey
  position:relative
  top:-20px
link:
  text-decoration:none
`;

class Demos extends React.Component {
  constructor() {
    super();
    this.state = {
      demos: demos
    };
    this.css = style;
    // this.db = new Firebase();
    // this.db.fetchDemos((obj)=>{
    //   this.setState({demos:obj})
    // });
    this.printDemos = this.printDemos.bind(this)
  }
  printDemos() {
    let {state, css} = this
    let demos = state.demos || {}
    return Object.keys(demos).map((k, i) => {
      return (<div key={i} style={css.demo}>
        <a href={'./expo/' + k} style={css.title}>{demos[k].title}</a>
        <div style={css.about}>{demos[k].about}</div>
        <ul style={css.description}>{demos[k].description}</ul>
      </div>
      )
    })
  }
  render() {
    let {css} = this;
    return (
      <div>
        <a href='../' style={css.link}>
          <Logo height={10} width={150}/>
          <span style={css.home}>
            <HomeIcon size={20}/>
            {'compromise'}
          </span>
        </a>

        <div style={css.container}>
          demos!
          <ul>
            {this.printDemos()}
          </ul>
        </div>
      </div>
      );
  }
}
Demos = Radium(Demos);
module.exports = Demos
