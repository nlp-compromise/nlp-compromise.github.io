import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Textarea from 'react-textarea-autosize';

class Input extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this.refs.input)
    el.focus();
    let i = (this.props.text || '').length
    this.setCursor(el, i)
  }
  setCursor(el, pos) {
    if (el.setSelectionRange) {
      el.setSelectionRange(pos, pos);
    } else if (el.createTextRange) {
      var range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  render() {
    let css = {
      resize: 'none',
      maxHeight: 300,
      winHeight: 80,
      color: 'darkslategray',
      width: '100%',
      overflow: 'hidden',
      fontSize: 28,
      padding: '10px 15px 10px 15px'
    }
    let text = this.props.text || 'Wee-ooh, I look just like Buddy Holly.'
    return <Textarea ref='input' style={css} defaultValue={text} />
  }
}

export default Input;
