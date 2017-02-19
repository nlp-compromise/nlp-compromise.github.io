const demos = [
  {
    title: 'Uppercase all verbs',
    description: 'grab a subset of the text, and apply a generic case transform method',
    code: `var r = nlp(myText)
  r.match('#Verb').toUpperCase()
  return r
    `,
    src: 'weezer/buddyholly'
  },
  {
    title: 'Find all people',
    description: 'use the `.people()` subset to grab all person names in the text',
    code: `var r = nlp(myText)
  return r.people()
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
  return (hash + '').substr(0, 6)
}

module.exports = demos.reduce((h, obj) => {
  let hash = makeKey(obj.title)
  h[hash] = obj
  return h
}, {})
