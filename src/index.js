'use strict';
const r = require('r-dom');
const React = require('react')
const ReactDOM = require('react-dom')
const reqwest = require('reqwest')
const firebase = require('firebase');
const Textarea = require('react-textarea-autosize').default
const Cmd = require('./command')

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCJPPhmg_nc8PluHrmnfD3viyMTSW1x0Fs',
  authDomain: 'nlp-expo.firebaseapp.com',
  databaseURL: 'https://nlp-expo.firebaseio.com',
  storageBucket: 'nlp-expo.appspot.com',
  messagingSenderId: '423627708124'
};
firebase.initializeApp(config);

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      text: 'placeholder'
    }
    let database = firebase.database();
    let src = 'sotu/bush_1989'
    database.ref('/texts/' + src).once('value').then((res) => {
      this.setState({
        text: res.val()
      })
    });
  }
  render() {
    let state = this.state
    return r.div({}, [
      r(Textarea, {
        value: state.text,
        maxRows: 8,
        style: {
          width: '80%',
          margin: '9%',
          padding: 8,
          color: 'grey',
          borderRadius: 5
        },
        onChange: (e) => this.setState({
          text: e.target.value
        })
      }),
      r(Cmd)
    ])
  }
}
module.exports = Main


ReactDOM.render(
  React.createElement(Main, null),
  document.body
);
