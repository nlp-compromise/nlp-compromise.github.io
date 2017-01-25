import React, { Component } from 'react';
import Radium from 'radium';
import AutosizeInput from 'react-input-autosize'
import styler from 'react-styling';
import Result from './result';
import nlp from '../../shared/nlp';
const style = styler`
demo
  margin:15
  marginLeft:50
  marginBottom:35
  color:dimgrey
  font-size:50
  font-family:Inconsolata
input:
  border:none
  color:dimgrey
  font-size:50
  // font-family:Inconsolata
  border-bottom:1px dashed lightgrey
  background-color:#fdfeff
transform
  marginTop:30
  marginBottom:0
  marginLeft:30
  color:steelblue
  font-size:20
  font-weight:500
  space:
    marginTop: 60
example:
  text:
    color:palevioletred
    font-size:18
    font-weight:lighter
  result:
    font-size:22
    font-weight:500
    marginLeft:60
    color:steelblue
aside:
  color:silver
  marginTop:15
table:
  width:90%
  border-spacing: 10
  marginLeft:5%
  marginRight:5%
`

const examples = {
  tense: function(r, css) {
    r = r.clone()
    r.sentences().toPastTense()
    return (
      <div>
        <div style={css.example.text}>change tense:</div>
        <div style={css.example.result}>{r.out('text')}</div>
      </div>
    )
  },
  negate: function(r, css) {
    r = r.clone()
    r.sentences().toNegative()
    return (
      <div>
        <div style={css.example.text}>negate:</div>
        <div style={css.example.result}>{r.out('text')}</div>
      </div>
    )
  },
  really: function(r, css) {
    r = r.clone()
    r.verbs().insertBefore('really')
    return (
      <div>
        <div style={css.example.text}>add words:</div>
        <div style={css.example.result}>{r.out('text')}</div>
      </div>
    )
  },
  replace: function(r, css) {
    r = r.clone()
    r.match('(#Adjective|#Conjunction)+').if('#Adjective').replaceWith('miserable')
    return (
      <div>
        <div style={css.example.text}>replace:</div>
        <div style={css.example.result}>{r.out('text')}</div>
      </div>
    )
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);
    let text='john is nice and cool'
    this.state = {
      text: text,
      result : nlp(text)
    }
    this.css = style
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    let text = e.target.value || ''
    this.setState({
      text:text,
      result: nlp(text)
    })
  }
  componentDidMount() {
    setTimeout(() => {
      this.refs.input.updateInputWidth()
    }, 50)
  }
  render() {
    let {css, state} = this
    return (
      <div>
        <div style={ css.transform }>
          { 'so' }
        </div>
        <div style={ css.demo }>
          { '‘' }
          <AutosizeInput ref={ 'input' } value={ state.text } inputStyle={ css.input } onChange={ this.onChange } />
          { '’' }
        </div>
        <div style={ css.transform }>
          { 'becomes:' }
        </div>
        <div style={ css.demo }>
          <Result result={ state.result } />
        </div>
        <p></p>
        <div style={css.aside}>
          { 'so you can do your weird stuff:' }
        </div>
        <table style={css.table}>
          <tbody>
            <tr>
              <td>{examples.tense(state.result, css)}</td>
              <td>{examples.really(state.result, css)}</td>
            </tr>
            <tr>
              <td>{examples.negate(state.result, css)}</td>
              <td>{examples.replace(state.result, css)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
Demo = Radium(Demo);

module.exports = Demo
