'use strict';
const corpus = require('nlp-corpus');
const firebase = require('firebase');
const config = {
  apiKey: 'AIzaSyCJPPhmg_nc8PluHrmnfD3viyMTSW1x0Fs',
  authDomain: 'nlp-expo.firebaseapp.com',
  databaseURL: 'https://nlp-expo.firebaseio.com',
  storageBucket: 'nlp-expo.appspot.com',
  messagingSenderId: '423627708124'
};
firebase.initializeApp(config);

let texts = {};
texts.weezer = corpus.weezer.parsed();
texts.fleetwood_mac = corpus.fleetwood_mac.parsed();
texts.state_of_the_union = corpus.sotu.parsed();
texts.friends = corpus.friends.parsed();
// texts.poe = corpus.parsed.poe()
// texts.hardy = corpus.parsed.hardy()
// texts.erowid = corpus.parsed.erowid()

firebase.database().ref('/texts').set(texts);
