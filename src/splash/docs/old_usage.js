import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import ChooseText from '../../shared/textarea/chooseText';
const style = styler`
container:
  marginTop:65
title:
  color:steelblue;
  font-size:34
  marginLeft:7%
headline:
  color:steelblue;
  font-size:34
  marginLeft:20%
explain:
  color:grey;
  font-size:24
  marginLeft:25%
section:
  color:silver;
  font-size:20
  marginLeft:15%
  marginTop:25
dump:
  color:silver;
  font-size:20
  marginLeft:25%
code:
  color:lightgrey;
  font-size:11
  marginLeft:35%
param:
  color:palevioletred
  font-size:22
  // borderBottom:1px dotted palevioletred
  marginLeft:5
  marginBottom:10
param2:
  font-size:30
  margin:4
  color:#87a9c5
  fontFamily:'times mono'
  font-weight:300
freshprince:
  position:relative
  marginTop:15
  marginLeft:200
r:
  color:palevioletred
ns:
  color:#f39c73
transform
  marginTop:30
  display:inline
  marginBottom:0
  marginLeft:12%
  color:steelblue
  font-size:16
  font-weight:500
  border-bottom:1px solid steelblue
mono:
`
const code = `Text[
  Terms[ Term, Term, Term, Term],
  Terms[ Term, Term, Term]
]
`
const code2 = `Text[
  Place[ Term, Term ],
  Place[ Term ]
]
`
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
    this.update = this.update.bind(this)
  }
  update(obj) {
    // console.log(obj)
  }
  render() {
    let {css} = this
    let nouns = [{
      normal: 'bel-air',
      count: 2
    }, {
      normal: 'philidelphia',
      count: 1
    }]
    nouns = nouns.map((n, i) => {
      return (
        <li key={i}>
          {n.normal}
          <span style={{
          color: 'lightgrey'
        }}>
            {' - ' + n.count}
          </span>
        </li>
      )
    })
    return (
      <div style={css.container}>

        <div style={css.freshprince}>
          <ChooseText callback={this.update} />
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r = '}</span>
          {'nlp('}
          <span style={css.param} title='just a string'>{'myText'}</span>
          <span style={{}}>{' , '}</span>
          <span style={css.param} title='a key-value object of word-> POS'>{' [customLexicon] '}</span>
          {')'}
        </div>
        <div style={css.explain}>
          {'this automatically tokenizes and tags the input'}
        </div>
        <pre style={css.code}>{code}</pre>
        <div style={css.section}>
          {'if you run this:'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.out('}
          <span style={css.param}>{`'text' `}</span>
          {')'}
        </div>
        <div style={css.explain}>
        {'you\'ll get a pixel-perfect output of your text'}
        </div>
        <div style={css.dump}>
        {'"Now this is a story all about how..."'}
        </div>

        <p></p>

        <div style={css.section}>
          {'reach into specific parts of the text:'}
        </div>
        <div style={css.headline}>
          <span style={css.ns}>{'some = '}</span>
          <span style={css.r}>{'r'}</span>
        {'.places()'}
        </div>
        <pre style={css.code}>{code2}</pre>
          <div style={css.headline}>
            <span style={css.ns}>
              {'some'}
            </span>
            {'.sort('}
            <span style={css.param}>{`'alpha' `}</span>
            {').slice('}
            <span style={css.param2}>{` 0, `}</span>
          <span style={css.param2}>{` 2 `}</span>
            {').data()'}
          </div>
          <ul style={{
        marginLeft: 285,
        fontSize: 20,
        color: 'lightsteelblue'
      }}>
            {nouns}
        </ul>
        <div style={css.section}>
          {'transform things how you\'d like:'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.sentences( '}
          <span style={css.param2}>{` 0 `}</span>
          {' ).append('}
          <span style={css.param2}>{` 'So,' `}</span>
          {')'}
        </div>
        <div style={css.explain}>
        {'It very carefully changes things'}
        </div>
        <div style={css.dump}>
        {'"So now this is a story all about how..."'}
        </div>
      </div>
    )
  }
}
Example = Radium(Example);

module.exports = Example
