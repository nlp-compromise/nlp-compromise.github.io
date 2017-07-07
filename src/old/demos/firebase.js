
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
    firebase.initializeApp(config);
    this.db = firebase.database();
  }
  fetchDemos(callback) {
    this.db.ref('/demos').once('value').then((res) => {
      callback(res.val())
    });
  }
}
module.exports = Firebase
