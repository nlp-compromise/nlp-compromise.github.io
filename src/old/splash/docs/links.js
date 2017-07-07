'use strict';
import React from 'react';
import Radium from 'radium';
import Twitter from 'react-icons/lib/fa/twitter'
import Slack from 'react-icons/lib/fa/slack'
import GitHub from 'react-icons/lib/fa/github'
import styler from 'react-styling';

const style = styler`
container:
  text-align:center;
table:
  width:90%
  border-spacing: 10
  marginLeft:5%
  marginRight:5%
  margin-top:75
  text-align:center;
  color:black;
  link:
    font-size:12
    color:darkgrey
  href:
    text-decoration:none
    color:black
`
class Links extends React.Component {
  constructor() {
    super()
    this.css = style;
  }
  render() {
    let css = this.css
    return (
      <div style={css.container}>
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
              <a style={css.table.href} href='https://www.twitter.com/nlp_compromise'>
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
      <p>
        <a href='https://github.com/nlp-compromise/compromise/wiki/Contributing'>YOU SHOULD ALSO COME AND HELP</a>
      </p>
      we're cool, and it's a big-time project.
      <p style={css.left}>
        compromise was made by <a href='http://spencermounta.in'>spencer kelly</a> and <a href='https://github.com/nlp-compromise/compromise/graphs/contributors'>contributors</a>
      </p>
      MIT
      </div>
    )
  }
}

Links = Radium(Links);
module.exports = Links
