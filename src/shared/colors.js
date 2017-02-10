const chooseTag = (t) => {
  const colors = [
    ['Person', '#6393b9'],
    ['Pronoun', '#81acce'],
    ['Plural', 'steelblue'],
    ['Singular', 'lightsteelblue'],

    ['Verb', 'palevioletred'],

    ['Adverb', '#f39c73'],

    ['Adjective', '#b3d3c6'],

    ['Determiner', '#d3c0b3'],
    ['Preposition', '#9794a8'],
    ['Conjunction', '#c8c9cf'],
  ]
  for (let i = 0; i < colors.length; i++) {
    if (t.tag[colors[i][0]]) {
      return colors[i]
    }
  }
  console.log('no color for:')
  console.log(t.tag)
  return []
}
module.exports = chooseTag
