import React, { Component } from 'react';
import Radium from 'radium';
import AutosizeInput from 'react-input-autosize'
import styler from 'react-styling/flat';
import Result from './result';
import nlp from 'compromise';
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
  font-family:Inconsolata
`


class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'john is nice and cool'
    }
    this.state.result = nlp(this.state.text)
    this.css = style
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    let {state} = this;
    state.text = e.target.value || ''
    state.result = nlp(state.text)
    this.setState(state)
  }
  componentDidMount() {
    setTimeout(() => {
      this.refs.input.updateInputWidth()
    }, 50)
  }
  componentDidMount() {
    let {state} = this
  }
  render() {
    let {css, state} = this
    let pastTense = state.result.clone().verbs().toPast()
    console.log(state.result)
    return (
      <div>
        <div style={css.transform}>
          {'so'}
        </div>
        <div style={css.demo}>
          {'‘'}
          <AutosizeInput ref={'input'} value={state.text} inputStyle={css.input} onChange={this.onChange}/>
          {'’'}
        </div>
        <div style={css.transform}>
          {'becomes:'}
        </div>
        <div style={css.demo}>
          {/*<Result result={state.result}/>*/}
        </div>

        <div style={{marginLeft: 200}}>
          <div style={[css.transform]}>
            {'to past tense:'}
          </div>
          <div style={[css.demo, { fontSize: 20, marginTop: 0 }]}>
              {/* <Result result={pastTense}/>*/}
          </div>
          <div style={css.transform}>
            {'to negative:'}
          </div>
          <div style={[css.demo, { fontSize: 20, marginTop: 0}]}>
              {/* <Result result={pastTense}/>*/}
          </div>
        </div>
      </div>
    )
  }
}
Demo = Radium(Demo);

module.exports = Demo
