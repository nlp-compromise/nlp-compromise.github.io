import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Textarea from 'react-textarea-autosize'
// import Cmd from './command'
// import Output from './output'
// import nlp from 'nlp_compromise'

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
    // let result = nlp(state.text)
    return (
      <div>
        <Textarea
      value={state.text}
      maxRows={8}
      style= {{
        width: '80%',
        margin: '9%',
        padding: 8,
        color: 'grey',
        borderRadius: 5
      }}
      onChange= {(e) => this.setState({
        text: e.target.value
      })}/>
    </div>
    )
  }
}
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
