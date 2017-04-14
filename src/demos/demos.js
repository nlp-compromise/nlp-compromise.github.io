const demos = [
  {
    title: 'Find all the people',
    description: 'use the `.people()` method to grab all person names in the text',
    code: `//parse the text
    var r = nlp(myText)

    //grab the person names mentioned in this text
    var p=r.people()

    //normalize punctuation, case, whitespace
    p.normalize()

    //sort them by frequency
    p.sort('frequency').unique()

    //output as an array
    return p.out('array')
    `,
    src: 'friends/s1_e2'
  },
  {
    title: 'Grab the places',
    description: 'use the `.places()` method to grab all locations in the text',
    code: `//parse the text
var r = nlp(myText)

//grab the mentioned locations
var places= r.places()

//sort them alphabetically
places.sort('alpha')

//render them an array
  return places.out('array')
    `,
    src: 'sotu/obama_2015'
  },
  {
    title: 'Uppercase all verbs',
    description: 'grab a subset of the text, and make a boring transformation',
    code: `//parse the input text
var r = nlp(myText)

//grab the verbs
var verbs=r.match('#Verb')

//change them to upper-case
verbs.toUpperCase()

//return the whole thing
  return r
    `,
    src: 'freshPrince/intro'
  },
  {
    title: 'parse all the numbers',
    description: 'use the `.values()` method to collect and parse all numbers in the text',
    code: `//parse the text
var r = nlp(myText)
r.values().toNumber()
return r.if('#Value')`,
    src: 'sotu/obama_2015'
  },
  {
    title: 'Show all the nouns',
    description: 'use the `.nouns()` method to grab all the nouns in the text',
    code: `//parse the text
    var r = nlp(myText)

  //grab the noun-phrases
  var nouns= r.nouns()

  //add a bit of a blacklist
  nouns = nouns.not(['dice', 'mirror'])

  //render the results
  return nouns.out('array')
    `,
    src: 'freshPrince/intro'
  },
  {
    title: 'Named-entity-recognition',
    description: 'grab all people/places/orgs, sorted by frequency',
    code: `//parse the text
var r = nlp(myText)

//grab the people/places/organizations
var topics=r.topics()

//remove any possessives like "joey's"
topics=topics.not('#Possessive')

//output them as an array
  return topics.out('array')
    `,
    src: 'friends/s1_e2'
  },
  {
    title: 'custom POS-tagging',
    description: 'coerce specific words into the tags you prefer',
    code: `var lexicon={
      'brillig':'Jabberwocky',
      'slithy toves':'Jabberwocky',
    }

//pass in your lexicon to compromise
var r = nlp(myText, lexicon)

//query on your custom tags
var mine = r.match('#Jabberwocky and .? #Jabberwocky')

return mine`,
    text: 'twas brillig and the slithy toves did gyre and gimble'
  },
  {
    title: 'Change sentence tense',
    description: 'change a sentence to the past-tense',
    code: `//parse the text
var r = nlp(myText)

//grab the first sentence
var s=r.sentences(0)

//change it to past-tense
s.toPastTense()

  return s
    `,
    src: 'freshPrince/intro'
  },
  {
    title: 'Negate a sentence',
    description: 'turn a sentence into its opposite meaning',
    code: `//parse the text
var r = nlp(myText)

//grab the first sentence
var s=r.sentences(0)

//make it say the opposite
s.toNegative()

  return s
    `,
    src: 'weezer/no_one_else'
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
