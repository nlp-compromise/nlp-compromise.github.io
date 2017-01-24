import React from 'react';
import ReactDOM from 'react-dom';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import Logo from './logo';
import ShowOff from './showOff';
import QuickStart from './quickStart';
import Usage from './usage';
import styler from 'react-styling';

import Zap from 'react-icons/lib/go/zap'
import Bowtie from 'react-icons/lib/io/bowtie'
import Code from 'react-icons/lib/io/code'
import Twitter from 'react-icons/lib/fa/twitter'
import Slack from 'react-icons/lib/fa/slack'
import GitHub from 'react-icons/lib/fa/github'

import 'react-select/dist/react-select.css';
import './index.css'
const style = styler`
container
  marginTop: 50
  padding: 8
headline:
  color:steelblue;
  font-size:34
  marginLeft:20%
headline2
  color:lightgrey
  font-size:30
  marginLeft:25%
headline3
  color:palevioletred
  font-size:30
  marginLeft:25%
  marginTop:25
orange:
  color: #f39c73
spacer:
  padding:60
`


class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {state, css} = this;
    return (
      <div>
        <Logo />
        <div style={css.container}>
          <div style={css.headline}>
            {'cuz using language is hard'}
          </div>
          <div style={css.headline2}>
            {'\'and there\'s a gazillion words'}
          </div>
          <div style={css.headline}>
            <span style={css.orange}>{'compromise'}</span>
            {' interprets and '}
            <b>{'pre-parses'}</b>
            {' text'}
          </div>
          <div style={css.headline3}>
            {'so that it\'s much easier.'}
          </div>

          <ShowOff />
          <QuickStart id='quickstart'/>
          <Usage id='usage'/>
          <div style={css.spacer}/>

        </div>
      </div>
      );
  }
}
Main = Radium(Main);
module.exports = Main
