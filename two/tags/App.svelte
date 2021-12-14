<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  const example=`const tags = {
  Doctor:{
    is:'Person'
  }
}
const words = { 
  'dr nick':'Doctor', 
  'doogie howser':'Doctor'
}
nlp.addTags(tags)
nlp.addWords(tags)

const doc = nlp('hi Dr. Nick!')
let m = doc.match('#Person')
m.text()
// 'Dr. Nick!'
`
</script>

<div class="col">
  <Back />
  <Page bottom="40px">
      <div class="lib">compromise/two/tags</div>
      <div class="down tab">our compromise part-of-speech tags</div>
      <div class="res">
        <div class="mv7 f1" id="tags">
          <div>
             <div class="topTwo">#Noun  <span class="desc">- 'friendship'</span></div>
             <div class="ul">
                <div class="tag">#Singular <span class="desc">- 'owl'</span></div>
                <div class="tag">
                   <div class="tag">#Person  <span class="desc">- 'Jasper Beardly'</span></div>
                   <div class="tag">
                      <div class="tag">#FirstName  <span class="desc">- 'troy'</span></div>
                      <div class="tag">
                         <div class="tag">#MaleName  <span class="desc">- 'john'</span></div>
                         <div class="tag">#FemaleName  <span class="desc">- 'jane'</span></div>
                      </div>
                      <div class="tag">#LastName  <span class="desc">- 'mcclure'</span></div>
                   </div>
                   <div class="tag">#Place  <span class="desc">- 'Toronto, Ontario'</span></div>
                   <div class="tag">
                      <div class="tag">#Country <span class="desc">- 'France'</span></div>
                      <div class="tag">#City <span class="desc">- 'springfield'</span></div>
                      <div class="tag">#Region <span class="desc">- 'Florida'</span></div>
                      <div class="tag">#Address <span class="desc">- '742 evergreen terrace'</span></div>
                   </div>
                   <div class="tag">#Organization  <span class="desc">- 'St Michael's Church'</span></div>
                   <div class="tag">
                      <div class="tag">#SportsTeam  <span class="desc">- 'Red Sox'</span></div>
                      <div class="tag">#Company  <span class="desc">- 'Globex Corp'</span></div>
                      <div class="tag">#School  <span class="desc">- 'Hillcrest highschool'</span></div>
                   </div>
                </div>
                <div class="tag">#ProperNoun <span class="desc">- 'France'</span></div>
                <div class="tag">#Honorific  <span class="desc">- 'Dr.'</span></div>
                <div class="tag">#Plural <span class="desc">- 'owls'</span></div>
                <div class="tag">#Uncountable <span class="desc">- 'air'</span></div>
                <div class="tag">#Pronoun <span class="desc">- 'he'</span></div>
                <div class="tag">#Actor  <span class="desc">- 'bowler'</span></div>
                <div class="tag">#Activity <span class="desc">- 'swimming'</span></div>
                <div class="tag">#Unit <span class="desc">- 'kilos'</span></div>
                <div class="tag">#Demonym <span class="desc">- 'canadians'</span></div>
                <div class="tag">#Possessive <span class="desc">- 'Spencer's'</span></div>
             </div>
             <div class="topTwo">#Verb  <span class="desc">- 'would have walked'</span></div>
             <div class="ul">
                <div class="tag">
                   #PresentTense  <span class="desc">- 'walks'</span>
                   <div class="tag">#Infinitive <span class="desc">- 'walk'</span></div>
                   <div class="tag">#Gerund <span class="desc">- 'walking'</span></div>
                </div>
                <div class="tag">#PastTense <span class="desc">- 'walked'</span></div>
                <div class="tag">#Copula <span class="desc">- 'is'</span></div>
                <div class="tag">#Modal <span class="desc">- 'would'</span></div>
                <div class="tag">#PerfectTense <span class="desc">- 'have walked'</span></div>
                <div class="tag">
                   <div class="tag">#FuturePerfect <span class="desc">- 'will have walked'</span></div>
                   <div class="tag">#Pluperfect <span class="desc">- 'had walked'</span></div>
                </div>
                <div class="tag">#PhrasalVerb <span class="desc">- 'walk off'</span></div>
                <div class="tag">
                   <div class="tag">#Particle  <span class="desc">- 'off' of 'walk off'</span></div>
                </div>
             </div>
             <div class="topTwo">#Value</div>
             <div class="ul">
                <div class="tag">#Cardinal <span class="desc">- '5'</span></div>
                <div class="tag">
                   #Ordinal <span class="desc">- '5th'</span>
                   <div class="tag">#RomanNumeral <span class="desc">- 'XLII'</span></div>
                </div>
                <div class="tag">#TextValue <span class="desc">- 'five'</span></div>
                <div class="tag">#NumericValue <span class="desc">- '5'</span></div>
                <div class="tag">#Percent <span class="desc">- '4.3%'</span></div>
                <div class="tag">#Money <span class="desc">- '$5.20'</span></div>
                <div class="tag">#Fraction <span class="desc">- '2/3rds'</span></div>
             </div>
             <div class="topTwo">#Date <span class="desc">- 'june 2nd'</span></div>
             <div class="ul">
                <div class="tag">#Month <span class="desc">- 'june'</span></div>
                <div class="tag">#WeekDay <span class="desc">- 'wednesday'</span></div>
                <div class="tag">#Holiday <span class="desc">- 'haloween'</span></div>
             </div>
             <div class="topTwo">#Adjective  <span class="desc">- 'fast'</span></div>
             <div class="ul">
                <div class="tag">#Comparable <span class="desc">- 'fast'</span></div>
                <div class="tag">#Comparative <span class="desc">- 'faster'</span></div>
                <div class="tag">#Superlative <span class="desc">- 'fastest'</span></div>
             </div>
             <div class="topTwo">#Contraction <span class="desc">- 'he's'</span></div>
             <div class="topTwo">#Adverb <span class="desc">- 'quickly'</span></div>
             <div class="topTwo">#Currency <span class="desc">- 'USD'</span></div>
             <div class="topTwo">#Determiner <span class="desc">- 'the'</span></div>
             <div class="topTwo">#Conjunction <span class="desc">- 'and'</span></div>
             <div class="topTwo">#Preposition <span class="desc">- 'of'</span></div>
             <div class="topTwo">#QuestionWord <span class="desc">- 'who'</span></div>
             <div class="topTwo">#Pronoun <span class="desc">- 'he'</span></div>
             <div class="topTwo">#Expression <span class="desc">- 'Gee'</span></div>
             <div class="topTwo">#Url <span class="desc">- 'http://compromise.cool'</span></div>
             <div class="topTwo">#HashTag <span class="desc">- '#nlp'</span></div>
             <div class="topTwo">#PhoneNumber <span class="desc">- '(800) 555-0000'</span></div>
             <div class="topTwo">#AtMention <span class="desc">- '@nlp_compromise'</span></div>
             <div class="topTwo">#Emoji <span class="desc">- ':)'</span></div>
             <div class="topTwo">#Emoticon <span class="desc">- '😊'</span></div>
             <div class="topTwo">#Email <span class="desc">- 'hi@compromise.cool'</span></div>
             <div class="topTwo">#Auxiliary <span class="desc">- 'would have had'</span></div>
             <div class="topTwo">#Negative <span class="desc">- 'not'</span></div>
             <div class="topTwo">#Abbreviation <span class="desc">- 'st.'</span></div>
             <div class="topTwo">#Acronym <span class="desc">- 'CIA'</span></div>
          </div>
       </div>
       
       

</div>
      <Two>
        <Code js={example} width="500px"/>
      </Two>        
  </Page>
  <Below> 
    <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>


<style >
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align:center;
  flex-wrap: wrap;
  align-self: stretch;
}
.tag {
  color:cornflowerblue;
  padding-top:0.25rem;
  padding-bottom:0.25rem;
  padding-left:1.5rem;
  border-radius:0px;
  border-left:1px solid #9eb8e8;
}
.topTwo{
  color:cornflowerblue;
  padding-top:0.25rem;
  padding-bottom:0.25rem;
  padding-left:0.5rem;
}
.ul {
  padding-top:0.25rem;
  padding-bottom:0.25rem;
  padding-left:1.5rem;
}
.desc{
  color:#a8a8a8;
  margin-left:1rem;
  font-style: italic;
}
.res{
  margin:4rem;
  font-size:1rem;
}
</style >
