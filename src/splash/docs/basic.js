import React from 'react';
import styler from 'react-styling';
import Code from './code'

const css = styler`
container:
  position:relative
  text-align:center
  marginLeft:10%
  marginRight:10%
  marginTop:25
code:
  border:1px solid lightgrey
words:
  text-align:left
indent:
  marginLeft:80
`

const examples = {
  init: `var nlp = require('compromise')
var parsed = nlp('Now this is a story all about how..')`,

  pretty: `parsed.debug()
//or for some json,
console.log(parsed.out('tags'))`,

  output: `parsed.out('text') //character-perfect output
parsed.out('normal') //cleaned-up text format
parsed.out('terms') //individual-word data
parsed.out('html') //sanitized, formatted html`,

  subset1: `parsed.verbs().out('array')
// ['is']
parsed.people().out('json')
// [ ]
parsed.nouns().out('topk')
//[{text:'story', count:1},
// {text:'life', count:1}
//]`,
  subsetAll: `var weezer = nlp("Oh-oh and you're Mary-Tyler Moore")
weezer.people().dehyphenate().toUpperCase()
weezer.out('text')
//"Uh-oh and you're MARY TYLER MOORE"

//or inline,
weezer.people().toLowerCase().all().out()
//"Uh-oh and you're mary tyler moore"`,
  clone: `var main = nlp("I don't care what they say about us, anyway")
//make a quick copy:
var clone = main.clone()
clone.contractions().expand() //make a change on it

clone.out('text') //'I do not care...'
main.out('text')  //'I don't care...'
  `
}
function doc(props) {
  return (
    <div style={css.container}>
      <div style={css.words}>
        <b>compromise</b> is pretty easy to use:
        <Code code={examples.init}/>
        <p>
         The text you enter is immediately
         <div style={css.indent}>
          <li>parsed into sentences,</li>
          <li>tokenized into terms,</li>
          <li>and tagged for <a href='https://github.com/nlp-compromise/compromise/wiki/Part-of-Speech-Tagging'>part-of-speech</a></li>
        </div>
        </p>
        this all happens <a href='https://github.com/nlp-compromise/compromise/wiki/Performance'>pretty quickly</a>. You can parse a big document in a few seconds.
        <p>
          to see the whole-thing:
          <Code code={examples.pretty}/>
        </p>
        <p>
         {'these <b>.out()</b> methods are handy, while we\'re at it:'}
         <Code code={examples.output}/>
        </p>
        <p>
          but they become more interesting when you grab a subset of the text:
          <Code code={examples.subset1}/>
        </p>
        <p>
          you can grab parts of your text, and change them:
          <Code code={examples.subsetAll}/>
        </p>
        <p>
          {`if you're changing a subset, and don't want the document effected`}:
          <Code code={examples.clone}/>
        </p>
      </div>
    </div>
  )
}
module.exports = doc
