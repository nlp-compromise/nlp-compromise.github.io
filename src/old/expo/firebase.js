
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCJPPhmg_nc8PluHrmnfD3viyMTSW1x0Fs',
  authDomain: 'nlp-expo.firebaseapp.com',
  databaseURL: 'https://nlp-expo.firebaseio.com',
  storageBucket: 'nlp-expo.appspot.com',
  messagingSenderId: '423627708124'
};

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(config);
    this.db = firebase.database();
  }
  fetchText(src, cmp) {
    this.db.ref('/texts/' + src).once('value').then((res) => {
      console.log('fetched-' + src)
      cmp.setState({
        text: res.val()
      })
      cmp.reParse()
    });

  }
}
module.exports = Firebase
