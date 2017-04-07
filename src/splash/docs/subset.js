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
  subsets: `var nlp = require('compromise')
var doc = nlp( myManuscript )
doc.people()     // 'Homer J. Simpson'
doc.places()     // 'Ankara, Turkey'
doc.nouns()      // 'riboflavin'
doc.verbs()      // 'will have walked'
doc.values()     // '2 thousand fourty-fourth'
doc.adjectives() // 'nice', 'juicy'
doc.dates()      // 'Tuesday Sept. 4rth'

//and a lot more niche ones:
doc.hashtags()      //#Belieber
doc.phoneNumbers()  //'1 (800) 555-4796'
doc.lists()         //'truly, madly, deeply'
doc.clauses()     //'i would', 'but you're on my foot'
doc.questions()     //'how the?'`,

  functions: `//nouns can do this:
doc.nouns().toPlural()   //'dinosaurs'
doc.nouns().toSingular() //'dinosaur'

//verbs can do this:
doc.verbs().toPastTense()  //'walked'
doc.verbs().toInfinitive() //'walk'

//values can do this:
doc.values().toCardinal()  //'5'
doc.values().toOrdinal()   //'5th'
doc.values().toTextValue() //'five'

✖️nope✖️:
doc.nouns().toPastTense() //✖️ 'dinosaured?'`,


  overloaded: `doc.people().normalize()
//'Mister J Simpson' -> 'Mr. J. Simpson'

doc.values().normalize()
//'Seventy-fifth' -> '75th'

doc.acronyms().normalize()
//'F.B.I' -> 'FBI'`,

  match: `let r = nlp('in West-Philidelphia, born and raised..')
r.match('(east|west) #Place').out('normal')
//'west philidelphia'`
}
function doc(props) {
  return (
    <div style={css.container}>
      <div style={css.words}>
        {`You shouldn't`} have to know any <a href='https://github.com/nlp-compromise/compromise/wiki/jargon'>linguistic jargon</a>,
        {`or `}
        <a href='https://github.com/nlp-compromise/compromise/wiki/Tagset'>library internals</a> to use <b>compromise</b> effectively.
        <p>
         For this reason, it comes with some cool pre-tweaked selectors:
         <Code code={examples.subsets}/>
         you can see all of them in the <a href='https://nlp-expo.firebaseapp.com/docs'>api documentation</a>
        </p>
        <p>
         These subsets return more-specific methods to call:
         <Code code={examples.functions}/>
        </p>
        <p>
          These subsets help clear-up the api. They also let methods overload, so:
          <Code code={examples.overloaded}/>
        </p>
        <p>
          There will ofcourse never be a perfect subset for every use. To dig into a more specifc part, try a <b>.match()</b>:
          <Code code={examples.match}/>
          in some ways, this resembles a regular-expression, but with grammatical information available 🎈
        </p>
      </div>
    </div>
  )
}
module.exports = doc
