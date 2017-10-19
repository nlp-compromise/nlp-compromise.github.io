const chooseTag = t => {
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

    ['Value', 'palegoldenrod'],
    ['QuestionWord', 'lavender'],
    ['Acronym', 'violet'],
    ['Possessive', '#7990d6'],
    ['Noun', '#7990d6'],
    ['Expression', '#b3d3c6'],
    ['Negative', '#b4adad']
  ];
  for (let i = 0; i < colors.length; i++) {
    if (t.tags[colors[i][0]]) {
      return colors[i];
    }
  }
  // console.log('no color for:');
  // console.log(t.tags);
  return [];
};
module.exports = chooseTag;
