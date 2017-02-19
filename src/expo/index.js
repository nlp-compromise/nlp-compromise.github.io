import React from 'react';
import ChooseText from '../shared/textarea/chooseText';
import Radium from 'radium';
import Dirty from './dirty';
import Code from './code';
import exec from './eval';
import demos from '../demos/demos';
// import debounce from './debounce';
import styler from 'react-styling';
import { nlp } from '../shared/nlp';
import Logo from '../shared/logo';
import HomeIcon from 'react-icons/lib/md/keyboard-arrow-left'
import '../shared/index.css'

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
logo:
  position:absolute;
  left:5
  top:20
  text-decoration:none
textarea
  // margin-left:50
subline:
  color:lightgrey
  font-size:15
home:
  margin-left:50
  color:grey
  position:relative
  top:-20px
title
  text-decoration:underline
  font-size:25
  position:relative
  left:-40
description
  marginBottom:20
  font-size:18
  marginLeft:50
  color:grey
`;

class Expo extends React.Component {
  constructor() {
    let demo = window.location.pathname.replace('/expo/', '') || 'uppercase-all-verbs-197792'
    let obj = demos[demo]
    obj = obj || {}
    super();
    this.state = {
      result: nlp(''),
      code: obj.code,
      text: obj.text,
      title: obj.title,
      description: obj.description,
      src: obj.src,
      valid: true,
      error: null
    };
    this.css = style;
    this.textChange = this.textChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.exec = this.exec.bind(this);
  // this.exec=debounce(this.exec, 100)
  }
  textChange(text) {
    this.setState({
      text: text,
    }, () => {
      this.exec()
    });
  }
  codeChange(code) {
    this.setState({
      code: code,
    }, () => {
      this.exec()
    });
  }
  exec() {
    exec(this.state, (r, err) => {
      if (err) {
        this.setState({
          valid: false,
          error: err.message
        })
      } else {
        this.setState({
          result: r,
          valid: true,
          error: null
        })
      }
    })
  }
  render() {
    let {state, css} = this;
    return (
      <div>
        <a href='./' style={css.logo}>
          <Logo height={10} width={150}/>
          <span style={css.home}>
            <HomeIcon size={20}/>
            {'compromise'}
          </span>
          { /*<div style={css.subline}>{'nlp in the browser'}</div>*/ }
        </a>
        <div style={css.container}>
          <div style={css.title}>
            {state.title}
          </div>
          <div style={css.description}>
            {state.description}
          </div>
          <div style={css.textarea}>
            <ChooseText whichText={state.whichText} text={state.text} callback={this.textChange}/>
          </div>
          <Code code={state.code} callback={this.codeChange} valid={state.valid} error={state.error}/>
          <Dirty result={state.result} />
        </div>
      </div>
      );
  }
}
Expo = Radium(Expo);
module.exports = Expo
