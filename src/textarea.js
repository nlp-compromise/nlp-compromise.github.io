import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';
import Textarea from 'react-textarea-autosize';
import styler from 'react-styling/flat';
import freshPrince from './texts/freshprince'

const style = styler`
textarea
  margin:50
  marginLeft:10%
  color:dimgrey
  font-size:50
  font-family:Inconsolata
  borderRadius: 5
`;


class TextThing extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'john is nice and cool'
    };
    this.state.result = nlp(this.state.text)
    this.css = style;
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    let {state} = this;
  }
  render() {
    let {state, css} = this;
    return (
      <Textarea
      value={state.text}
      maxRows={6}
      style={css.textarea}
      onChange={this.onType}/>
    )
  }
}


TextThing = Radium(TextThing);
module.exports = TextThing
