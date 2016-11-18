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

const style = styler `
@font-face {
  font-family: 'Slabo 27px';
  font-style: normal;
  font-weight: 400;
  src: local('Slabo 27px'), local('Slabo27px-Regular'), url(https://fonts.gstatic.com/s/slabo27px/v3/LfR9_S_HMdQ73mwIHBRxoSEAvth_LlrfE80CYdSH47w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Slabo 27px';
  font-style: normal;
  font-weight: 400;
  src: local('Slabo 27px'), local('Slabo27px-Regular'), url(https://fonts.gstatic.com/s/slabo27px/v3/PuwvqkdbcqU-fCZ9Ed-b7fk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}
container
  width: 80%
  margin: 9%
  padding: 8
  font-family: 'Slabo 27px', serif;
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
    let {
      state,
      css
    } = this;
    return ( < div style = {
        css.container
      } >
      <
      Source src = {
        state.src
      }
      cmp = {
        this
      }
      /> <
      Textarea value = {
        state.text
      }
      maxRows = {
        8
      }
      style = {
        css.textarea
      }
      onChange = {
        this.onType
      }
      /> <
      Bottom result = {
        state.result
      }
      cmp = {
        this
      }
      /> < /
      div >
    );
  }
}
Main = Radium(Main);

ReactDOM.render( < Main / > ,
  document.getElementById('root')
);
Id('root')
);
