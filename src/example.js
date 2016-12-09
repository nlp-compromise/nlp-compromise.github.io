import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import Textarea from './textarea';
import Select from 'react-select';
import style from './style'

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
    var options = [
      {
        value: 'one',
        label: 'One'
      },
      {
        value: 'two',
        label: 'Two'
      }
    ];
    return (
      <div>
        <div style={css.headline}>
          {'This is how:'}
        </div>
        <div style={css.freshprince}>
          <Textarea />
        </div>
        <div style={css.headline}>
          {'nlp('}
          <span style={css.param}>{'myText , '}</span>
          <span style={css.param}>{' [customLexicon] '}</span>
          {')'}
        </div>
        <Select
      name="form-field-name"
      value="one"
      options={options}
      onChange={this.changeSelector}
      />
      </div>
    )
  }
}
Example = Radium(Example);

module.exports = Example
