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
space:
  marginTop:15
`

const examples = {
  match1: `let m = nlp('meaningful october baseball!!')
//these return the same thing:
m.match('october baseball')     //normalized-term lookup
m.match('october #Noun')        //tag-lookup
m.match('#Date .')              //any-match
m.match('#Month (baseball|softball)') //1-of-match
m.match('#Adverb? #Date #Noun') //optional match
m.match('#Noun+')               //consecutive matches`,

  filter: `let all = nlp( headlines )
headlines.length //43,000

let listicles= all.has('#Value #Adjective #Plural')
listicles.found //true
listicles.random(2).out('array')
// ["5 inspiring dogs, who just can't take it anymore!",
//  "You'll love these seven incredible tips!" ]`,

  replace: `let polite = nlp( politeText )
//make the text meaner
polite.replace('you perhaps? (can|may|could)', 'you better')
polite.match('#Adjective').append('as hell')
polite.match('in my #Adjective? opinion').remove()`,

  tag: `doc.match('captain of the .{2,5} team').tag('#Person')

doc.match('who is on #Ordinal').firstTerm().tag('#Person')

doc.match('yes plz').tag('#FooBar')//use a custom tag`
}
function doc(props) {
  return (
    <div style={css.container}>
      <div style={css.words}>
        <div style={css.space}>
          <b>compromise</b> lets you find, and then operate-on, any part of the document, as easily as possible.
        </div>

        <div style={css.space}>
           This involves a custom (but easy) syntax for looking-up terms, based partly on <b>regular-expressions</b>:
           <Code code={examples.match1}/>
           you find more details about the syntax <a href='https://github.com/nlp-compromise/compromise/wiki/Match-syntax'>here</a>
        </div>

        <div style={css.space}>
          <b>.match()</b> statements can also be used like a filter with <b>.has()</b>
          <br/>
           <Code code={examples.filter}/>
         </div>

        <div style={css.space}>
          <b>.match()</b> works well with the <b>.replace()</b> and <b>.remove()</b> methods:
          <br/>
           <Code code={examples.replace}/>
         </div>

        <div style={css.space}>
          <b>.match()</b> also works nicely with the <b>.tag()</b> method:
          <br/>
           <Code code={examples.tag}/>
           <b>tag()</b> will accept anything,
           <br/>
           but the built-in tags will perform additional logical operations, like ensuring a <b>Noun</b> is never a <b>Verb</b>, and so on.
         </div>

      </div>
    </div>
  )
}
module.exports = doc
