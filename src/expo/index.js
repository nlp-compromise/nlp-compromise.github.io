import React from 'react';
import ChooseText from '../shared/textarea/chooseText';
import Radium from 'radium';
import Bottom from './bottom';
import Code from './code';
import styler from 'react-styling/flat';
import nlp from '../shared/nlp';
import '../shared/index.css'

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
textarea
  margin-left:50
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
        <div style={css.textarea}>
          <ChooseText callback={this.onChange}/>
        </div>
        <Code text={state.text} cmp={this} />
        <Bottom result={state.result} cmp={this} />
      </div>
      );
  }
}
Expo = Radium(Expo);
module.exports = Expo
