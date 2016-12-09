import React from 'react';
import ReactDOM from 'react-dom';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import Logo from './logo';
import Demo from './demo';
import Install from './install';
import Example from './example';
import 'react-select/dist/react-select.css';
import './index.css'
import styler from 'react-styling/flat';
const style = styler`
container
  marginTop: 50
  padding: 8
headline:
  color:steelblue;
  font-size:34
  marginLeft:20%
headline2
  color:lightgrey
  font-size:30
  marginLeft:25%
headline3
  color:palevioletred
  font-size:30
  marginLeft:25%
  marginTop:25
orange:
  color: #f39c73
spacer:
  padding:60
`


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
            {' text'}
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
