'use strict';
const corpus = require('nlp-corpus')
const firebase = require('firebase');
const config = {
  apiKey: 'AIzaSyCJPPhmg_nc8PluHrmnfD3viyMTSW1x0Fs',
  authDomain: 'nlp-expo.firebaseapp.com',
  databaseURL: 'https://nlp-expo.firebaseio.com',
  storageBucket: 'nlp-expo.appspot.com',
  messagingSenderId: '423627708124'
};
firebase.initializeApp(config);

let texts = {}
texts.sotu = corpus.parsed.sotu()
texts.friends = corpus.text.friends()
texts.poe = corpus.parsed.poe()
texts.hardy = corpus.parsed.hardy()
texts.erowid = corpus.parsed.erowid()

firebase.database().ref('/texts').set(texts);
