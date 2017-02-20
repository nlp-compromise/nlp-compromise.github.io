const demos = [
  {
    title: 'Uppercase all verbs',
    description: 'grab a subset of the text, and make a boring transformation',
    code: `var r = nlp(myText)
  r.match('#Verb').toUpperCase()
  return r
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Find all people',
    description: 'use the `.people()` method to grab all person names in the text',
    code: `var r = nlp(myText)
  return r.people()
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Grab the places',
    description: 'use the `.places()` method to grab all locations in the text',
    code: `var r = nlp(myText)
  return r.places()
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'parse all the numbers',
    description: 'use the `.values()` method to collect and parse all numbers in the text',
    code: `var r = nlp(myText)
  return r.values().data()
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Show all the nouns',
    description: 'use the `.nouns()` method to grab all the nouns in the text',
    code: `var r = nlp(myText)
  return r.nouns()
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Named-entity-recognition',
    description: 'grab all people/places/orgs, sorted by frequency',
    code: `var r = nlp(myText)
  return r.topics().out('freq')
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Change sentence tense',
    description: 'change a sentence to the past-tense',
    code: `var r = nlp(myText)
  return r.sentences(0).toPastTense()
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Negate a sentence',
    description: 'turn a sentence into its opposite meaning',
    code: `var r = nlp(myText)
  return r.sentences(0).toNegative()
    `,
    src: 'weezer/buddyholly'
  },
]

const makeKey = (str) => {
  str = str.toLowerCase()
  str = str.replace(/ /g, '-')
  str = encodeURIComponent(str)
  str += '-' + hashCode(str)
  return str.substr(0, 45)
}

function hashCode(str) {
  let len = str.length;
  let hash = 0;
  for (let i = 1; i <= len; i++) {
    let char = str.charCodeAt((i - 1));
    hash += char * Math.pow(31, (len - i));
    hash = hash & hash; //javascript limitation to force to 32 bits
  }
  return (Math.abs(hash) + '').substr(0, 6)
}

module.exports = demos.reduce((h, obj) => {
  let hash = makeKey(obj.title)
  h[hash] = obj
  return h
}, {})
