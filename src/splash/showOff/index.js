import React, { Component } from 'react';
import Radium from 'radium';
import AutosizeInput from 'react-input-autosize'
import styler from 'react-styling';
import Result from './result';
import { nlp } from '../../shared/nlp';
import Down from 'react-icons/lib/fa/long-arrow-down'
const style = styler`
demo
  margin:15
  marginBottom:35
  color:dimgrey
  font-size:40
  font-family:Inconsolata
  white-space: nowrap;
input:
  border:none
  color:dimgrey
  font-size:50
  // font-family:Inconsolata
  border-bottom:1px dashed lightgrey
  background-color:#fdfeff
transform
  text-align:left;
  marginTop:30
  marginBottom:0
  marginLeft:25%
  color:steelblue
  font-size:20
  font-weight:500
  space:
    marginTop: 60
center:
  text-align:center
  color:steelblue
  padding-bottom:25
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
  font-size:20
  marginTop:100
table:
  width:90%
  border-spacing: 10
  marginLeft:5%
  marginRight:5%
`
const printTerms = function(r) {
  let dirt = {
    color: '#b37291',
    lineSpacing: '110%',
    fontStyle: 'italic',
    fontSize: '90%'
  // borderBottom: '1px dashed #b37291'
  }
  let noDirt = {
    color: 'steelblue'
  }
  return r.list.map((ts) => {
    return ts.terms.map((t) => {
      if (t.dirty) {
        return <span style={dirt}>{t.out('text')}</span>
      } else {
        return <span style={noDirt}>{t.out('text')}</span>
      }
    })
  })
}
const examples = {
  tense: function(r, css) {
    r = r.clone()
    r = r.sentences().toPastTense()
    return (
      <div>
        <div style={css.example.text}>change tense:</div>
        <div style={css.example.result}>{printTerms(r)}</div>
      </div>
    )
  },
  negate: function(r, css) {
    r = r.clone()
    r = r.sentences().toNegative()
    return (
      <div>
        <div style={css.example.text}>negate:</div>
        <div style={css.example.result}>{printTerms(r)}</div>
      </div>
    )
  },
  really: function(r, css) {
    r = r.clone()
    r.verbs().insertBefore('really')
    return (
      <div>
        <div style={css.example.text}>add words:</div>
        <div style={css.example.result}>{printTerms(r)}</div>
      </div>
    )
  },
  replace: function(r, css) {
    r = r.clone()
    r = r.match('#Person+').replaceWith('Alice Cooper').all()
    return (
      <div>
        <div style={css.example.text}>replace:</div>
        <div style={css.example.result}>{printTerms(r)}</div>
      </div>
    )
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);
    let text = 'I look just like Buddy Holly'
    this.state = {
      text: text,
      result: nlp(text)
    }
    this.css = style
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    let text = e.target.value || ''
    this.setState({
      text: text,
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
    let smaller = {
      '@media (min-width: 700px)': {
        fontSize: 25,
        color: 'red'
      }
    }
    return (
      <div>
        <div style={ css.transform }>
          { 'look,' }
        </div>
        <div style={ css.demo }>
          { '‘' }
          <AutosizeInput ref={ 'input' } value={ state.text } inputStyle={ css.input } onChange={ this.onChange } />
          { '’' }
        </div>
        <div style={ css.center }>
          <Down size={40}/> becomes:
        </div>
        <div style={ css.demo }>
          <Result result={ state.result } />
        </div>
        <p></p>
        <div style={css.aside}>
          { 'then you can chuck things around:' }
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
