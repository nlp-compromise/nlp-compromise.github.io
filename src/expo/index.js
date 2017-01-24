import React from 'react';
import Text from './text';
import Radium from 'radium';
import Bottom from './bottom';
import Code from './code';
import styler from 'react-styling/flat';
import nlp from 'compromise';
import '../shared/index.css'

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
textarea
  color: grey
  width:100%
  borderRadius: 5
`;

class Expo extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      src:"weezer/buddyholly",
      result: nlp(''),
    };
    this.css = style;
    // this.db = new Firebase();
    // this.db.fetchText(this.state.src, this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(obj) {
    console.log(obj)
    this.setState({
      text: obj.text,
      result:obj.result
    });
  }
  render() {
    let {state, css} = this;
    return (
      <div style={css.container}>
        <Text callback={this.onChange} init={state.src}/>
        <Code text={state.text} cmp={this} />
        <Bottom result={state.result} cmp={this} />
      </div>
      );
  }
}
Expo = Radium(Expo);
module.exports = Expo
