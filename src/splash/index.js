import React from 'react';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import Logo from '../shared/logo';
import ShowOff from './showOff';
import styler from 'react-styling';
import Tabs from './docs'
import '../shared/index.css'

const style = styler`
container
  marginTop: 50
  padding: 8
headline:
  color:steelblue;
  font-size:34
  line-height:105%
  marginLeft:20%
headline2
  color:lightgrey
  font-size:30
  line-height:105%
  marginTop:10px
  marginBottom:15px
  marginLeft:25%
headline3
  color:palevioletred
  font-size:30
  marginLeft:25%
  marginTop:15
  marginBottom:35
orange:
  color: #f39c73
title:
  color:steelblue;
  font-size:34
  marginLeft:7%
spacer:
  padding:60
center:
  text-align:center
top:
  marginRight:15
  text-align:right
  font-size:15
  href:
    text-decoration:none
    color:steelblue
    marginLeft:25
  byline:
    marginRight:90
    color:silver
`


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 1
    };
    this.css = style;
  }
  render() {
    let {css} = this;
    return (
      <div>
        <div style={css.top}>
          <span style={css.top.byline}>
            {'text is really just data - '}
          </span>
          <a style={css.top.href} href='./docs'>docs</a>
          <a style={css.top.href} href='https://github.com/nlp-compromise/compromise'>github</a>
        </div>
        <Logo />
        <div style={css.container}>
          <div style={css.headline}>
            {'cuz language is cѳmplicaťed.'}
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
            {'so life is way better.'}
          </div>

          <div style={css.center}>
            <ShowOff />
          </div>

          <div style={css.spacer}/>

          <div style={css.title}>
            {'This is the '}
            <img alt='beans' src='https://twemoji.maxcdn.com/36x36/2728.png'/>
            {':'}
          </div>
          <p></p>

          <Tabs />

          <div style={css.spacer}/>
          <div style={{
        color: 'steelblue'
      }}>
            <i>
              {' ... but really,'}
            </i>
            {' you should just see '}
            <a href='./demos' style={{
        color: 'steelblue',
        fontWeight: 600
      }}>
              {'the demos >'}
            </a>
          </div>
          <div style={css.spacer}/>
        </div>
      </div>
      );
  }
}
Main = Radium(Main);
module.exports = Main
