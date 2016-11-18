import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import Firebase from './firebase';
import Bottom from './bottom';
import debounce from './debounce';
import Source from './source';
import Code from './code';
import styler from 'react-styling/flat';
import nlp from 'nlp_compromise';

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

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'his name is John smith',
      result: nlp(''),
      // src: 'sotu/bush_1989',
      src: 'weezer/buddyholly'
    };
    this.css = style;
    this.db = new Firebase();
    this.db.fetchText(this.state.src, this);
    this.onType = this.onType.bind(this);
    this.reParse = this.reParse.bind(this);
    this.setText = this.setText.bind(this);
    this.reParse = debounce(this.reParse, 300);
    this.reParse();
  }
  setText(src) {
    this.setState({
      src: src
    });
    this.db.fetchText(src, this);
  }
  onType(e) {
    this.setState({
      text: e.target.value
    });
    this.reParse();
  }
  reParse() {
    console.time('parse');
    let state = this.state;
    this.setState({
      result: nlp(state.text)
    });
    console.timeEnd('parse');
  }
  render() {
    let {state, css} = this;
    return (
      <div style={css.container}>
        <Source src={state.src} cmp={this}/>
        <Textarea
      value={state.text}
      maxRows={8}
      style={css.textarea}
      onChange={this.onType}/>
      <Code />
      <Bottom result={state.result} cmp={this}/>
    </div>
      );
  }
}
Main = Radium(Main);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
