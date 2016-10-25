'use strict';
const r = require('r-dom');
const React = require('react')
const reqwest = require('reqwest')

const firebase = require('firebase');
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
    return r.div(state.text)
  }
}
module.exports = Main
