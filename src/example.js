import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import Textarea from './textarea';
import Select from 'react-select';
const style = styler`
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
  font-size:18
  // borderBottom:1px dotted palevioletred
  marginLeft:5
param2:
  font-size:30
  margin:4
  color:#87a9c5
  fontFamily:'times mono'
  font-weight:300
freshprince:
  position:relative
  marginTop:100
  marginLeft:200
r:
  color:palevioletred
ns:
  color:deepskyblue
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
const code=`Text[
  Terms[ Term, Term, Term, ...],
  Terms[ Term, Term, Term, ...]
]
`
const code2=`Text[
  Noun[ Term ],
  Noun[ Term ],
  Noun[ Term ]
]
`
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
    this.changeSelector = this.changeSelector.bind(this)
  }
  componentDidMount() {
    let {state} = this
  }
  changeSelector() {
    let {css, state} = this
  }
  render() {
    let {css, state} = this
    let nouns=[{normal:'bel-air', count:2}, {normal:'b-ball', count:1}, {normal:'dice', count:1}]
    nouns=nouns.map((n)=>{
      return (
        <li style={css.ns}>
          {n.normal}
          <span style={{color:'lightgrey'}}>
            {' - '+n.count}
          </span>
        </li>
      )
    })
    return (
      <div>
        <div style={css.headline}>
          {'This is how:'}
        </div>
        <div style={css.freshprince}>
          <Textarea />
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r = '}</span>
          {'nlp('}
          <span style={css.param}>{'myText'}</span>
          <span style={{}}>{' , '}</span>
          <span style={css.param}>{' [customLexicon] '}</span>
          {')'}
        </div>
        <div style={css.explain}>{'this tokenizes and tags the input'}</div>
        <pre style={css.code}>{code}</pre>

        <div style={css.transform}>
          {'render:'}
        </div>
        <div style={css.section}>{'if you run this:'}</div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.plaintext()'}
        </div>
        <div style={css.dump}>{'"Now this is a story all about how..."'}</div>
        <div style={css.explain}>{'you\'ll get a pixel-perfect output of your text'}</div>

        <div style={css.transform}>
          {'inspect:'}
        </div>
        <div style={css.section}>{'reach into a specific part of the text:'}</div>
        <div style={css.headline}>
          <span style={css.ns}>{'ns = '}</span>
          <span style={css.r}>{'r'}</span>
          {'.nouns()'}
        </div>
        <pre style={css.code}>{code2}</pre>
        <ul style={{marginLeft:75}}>
          <div style={css.section}>{'sort them by frequency:'}
          </div>
            <div style={css.headline}>
              <span style={css.ns}>
                {'ns'}
              </span>
              {'.sort('}
              <span style={css.param2}>{` [`}</span>
              <span style={css.param}>{`\'freq\'`}</span>
              {' , '}
              <span style={css.param}>{`\'alpha\' `}</span>
              <span style={css.param2}>{`] `}</span>
              {').slice('}
              <span style={css.param2}>{` 0, `}</span>
              <span style={css.param2}>{` 3 `}</span>
              {')'}
            </div>
          <ul style={{marginLeft:285, fontSize:30}}>
            {nouns}
          </ul>
        </ul>

        <div style={css.transform}>
          {'transform:'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.sentences( '}
          <span style={css.param2}>{` 1 `}</span>
          {' ).append('}
          <span style={css.param2}>{` \'Basically,\' `}</span>
          {')'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.adverbs().remove()'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.people().normalize( '}
          <span style={[css.param2, css.mono]}>{`{case:true}`}</span>
          {' )'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.values().toCardinal()'}
        </div>
        <div style={css.headline}>
          <span style={css.r}>{'r'}</span>
          {'.places().addCountry()'}
        </div>
      </div>
    )
  }
}
Example = Radium(Example);

module.exports = Example
