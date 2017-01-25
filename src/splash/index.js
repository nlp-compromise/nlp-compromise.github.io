import React from 'react';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import Logo from './logo';
import ShowOff from './showOff';
import QuickStart from './quickStart';
import Usage from './usage';
import styler from 'react-styling';

// import Zap from 'react-icons/lib/go/zap'
// import Bowtie from 'react-icons/lib/io/bowtie'
// import Code from 'react-icons/lib/io/code'
import Twitter from 'react-icons/lib/fa/twitter'
import Slack from 'react-icons/lib/fa/slack'
import GitHub from 'react-icons/lib/fa/github'
import '../shared/index.css'
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
table:
  width:90%
  border-spacing: 10
  marginLeft:5%
  marginRight:5%
  text-align:center
  link:
    font-size:12
    color:darkgrey
  href:
    text-decoration:none
    color:black
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
trigger:
  position:fixed
  display:block
  z-index:4
  bottom:10
  font-size:12
  right:10
  width:60
  height:60
  border-radius:50%
  background-color:#f39c73;
  text-align:center;
  marginTop:20
  cursor:pointer
  border:1px solid white
  href
    text-decoration:none
    color:#fdfeff;
    :hover
      color:#6393b9
`


class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
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
          <table style={css.table}>
            <tbody>
              <tr>
                <td>
                  <a style={css.table.href} href='https://github.com/nlp-compromise/compromise'>
                    <GitHub size={50}/>
                    <div style={css.table.link}>github</div>
                  </a>
                </td>
                <td>
                  <a style={css.table.href} href='https://www.twitter.com/compromisejs'>
                    <Twitter size={50}/>
                    <div style={css.table.link}>twitter</div>
                  </a>
                </td>
                <td>
                  <a style={css.table.href} href='http://slack.compromise.cool'>
                    <Slack size={50}/>
                    <div style={css.table.link}>slack</div>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={css.spacer}/>
          <div style={{color:'steelblue'}}>
            <i>
              {' ... but really,'}
            </i>
            {' you should just see '}
            <a href="./demos" style={{color:'steelblue', fontWeight:600}}>
              {'the demos >'}
            </a>
          </div>
          <div style={css.spacer}/>
          <div style={css.trigger}>
            <a style={css.trigger.href} href='./demos'>
              <div style={{
        fontSize: 42
      }}>{'>'}</div>
            </a>
          </div>
        </div>
      </div>
      );
  }
}
Main = Radium(Main);
module.exports = Main
