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
  match1: `var lexicon = {
  'dorritos':'Noun'
}
var r = nlp('blend 2tbsp of dorritos', lexicon)
r.nouns().out()
//'dorritos'`,

  match2: `var lexicon = {
  'dorritos':'Chip'
}
var r = nlp('blend 2 tbsp of dorritos', lexicon)
r.match('#Value #Unit of #Chip').out()
//'2 tbsp of dorritos'`,

  posthoc: `var s = nlp('time flies like an arrow')
s.match('like (a|an) #Noun').tag('#Infinitive . #Noun')`,
  logic: `var a = nlp('april')
a.tag('FemaleName')
//(Noun, Singular, Person, FemaleName)

//custom tags are cool-beans:
a.tag('Foo')
//(Noun, Singular, Person, FemaleName, Foo)

//Month cannot be a Person
a.tag('Month')
//(Noun, Singular, Date, Month, Foo)`
}
function doc(props) {
  return (
    <div style={css.container}>
      <div style={css.words}>
        There will never be a perfect interpration for every use of a language. Not by a long shot.
        <br/>
        For this reason, <b>compromise</b> supports all-sorts of customization and wrangling.
        <p></p>

        <div style={css.space}>
         The simplest way is to pass-in words that you know about in advance:
         <Code code={examples.match1}/>
        </div>

        <div style={css.space}>
         You can make-up your own tags, too
         <Code code={examples.match2}/>
        </div>

        <div style={css.space}>
         or, you can always change the tags <i>'in post'</i>:
         <Code code={examples.posthoc}/>
        </div>

        <div style={css.space}>
         Note that compromise is <i>somewhat-clever</i> about avoiding contradiction:
         <Code code={examples.logic}/>
        </div>

      </div>
    </div>
  )
}
module.exports = doc
