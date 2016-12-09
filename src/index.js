import React from 'react';
import ReactDOM from 'react-dom';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import style from './style'
import Logo from './logo';
import Demo from './demo';
import Install from './install';
import Example from './example';
import 'react-select/dist/react-select.css';

import './index.css'


class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {state, css} = this;
    return (
      <div>
        <Logo />
        <div style={css.container}>
          <div style={css.headline}>
            {'cuz using language is hard'}
          </div>
          <div style={css.headline2}>
            {'\'and there\'s a gazillion words'}
          </div>
          <div style={css.headline}>
            <span style={css.orange}>{'compromise'}</span>
            {' interprets and '}
            <b>{'pre-parses'}</b>
            {' words'}
          </div>
          <div style={css.headline3}>
            {'so that it\'s much easier.'}
          </div>

          <Demo />

          <Install />

          <Example />
          <div style={css.spacer}/>

        </div>
      </div>
      );
  }
}
Main = Radium(Main);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
