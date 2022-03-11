<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  const example = `const tags = {
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
  const tagOne = `let doc = nlp('i bought an apple')
doc.match('apple').tag('Organization')
doc.debug() //see the new tags`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/two/tags</div>
    <div class="down tab">compromise ships with custom part-of-speech tags.</div>
    <div class="down tab f09">these map easily to common linguistic tagsets.</div>
    <div class="down tab f09">
      They are arranged in a graph, so adding <span class="tag">#Country</span> to a word, will also add
      <span class="tag">#Place</span>
      and <span class="tag">#Noun</span>.
    </div>
    <div class="box">
      <div>
        <div class="tag">#Noun <span class="desc">- 'friendship'</span></div>
        <div class="ul">
          <div class="tag">#Singular <span class="desc">- 'owl'</span></div>
          <div class="ul">
            <div class="tag">#Person <span class="desc">- 'Jasper Beardly'</span></div>
            <div class="ul">
              <div class="tag">#FirstName <span class="desc">- 'troy'</span></div>
              <div class="ul">
                <div class="tag">#MaleName <span class="desc">- 'john'</span></div>
                <div class="tag">#FemaleName <span class="desc">- 'jane'</span></div>
              </div>
              <div class="tag">#LastName <span class="desc">- 'mcclure'</span></div>
            </div>
            <div class="tag">#Place <span class="desc">- 'Toronto, Ontario'</span></div>
            <div class="ul">
              <div class="tag">#Country <span class="desc">- 'France'</span></div>
              <div class="tag">#City <span class="desc">- 'springfield'</span></div>
              <div class="tag">#Region <span class="desc">- 'Florida'</span></div>
              <div class="tag">#Address <span class="desc">- '742 evergreen terrace'</span></div>
            </div>
            <div class="tag">#Organization <span class="desc">- 'St Michael's Church'</span></div>
            <div class="ul">
              <div class="tag">#SportsTeam <span class="desc">- 'Red Sox'</span></div>
              <div class="tag">#Company <span class="desc">- 'Globex Corp'</span></div>
              <div class="tag">#School <span class="desc">- 'Hillcrest highschool'</span></div>
            </div>
          </div>
          <div class="tag">#ProperNoun <span class="desc">- 'France'</span></div>
          <div class="tag">#Honorific <span class="desc">- 'Dr.'</span></div>
          <div class="tag">#Plural <span class="desc">- 'owls'</span></div>
          <div class="tag">#Uncountable <span class="desc">- 'air'</span></div>
          <div class="tag">#Pronoun <span class="desc">- 'he'</span></div>
          <div class="tag">#Actor <span class="desc">- 'bowler'</span></div>
          <div class="tag">#Activity <span class="desc">- 'swimming'</span></div>
          <div class="tag">#Unit <span class="desc">- 'kilos'</span></div>
          <div class="tag">#Demonym <span class="desc">- 'canadians'</span></div>
          <div class="tag">#Possessive <span class="desc">- 'Spencer's'</span></div>
        </div>
        <div class="tag">#Verb <span class="desc">- 'would have walked'</span></div>
        <div class="ul">
          <div class="ul">
            <div class="tag">#PresentTense <span class="desc">- 'walks'</span></div>
            <div class="tag">#Infinitive <span class="desc">- 'walk'</span></div>
            <div class="tag">#Gerund <span class="desc">- 'walking'</span></div>
          </div>
          <div class="tag">#PastTense <span class="desc">- 'walked'</span></div>
          <div class="tag">#Copula <span class="desc">- 'is'</span></div>
          <div class="tag">#Modal <span class="desc">- 'would'</span></div>
          <div class="tag">#PerfectTense <span class="desc">- 'have walked'</span></div>
          <div class="ul">
            <div class="tag">#FuturePerfect <span class="desc">- 'will have walked'</span></div>
            <div class="tag">#Pluperfect <span class="desc">- 'had walked'</span></div>
          </div>
          <div class="tag">#PhrasalVerb <span class="desc">- 'walk off'</span></div>
          <div class="ul">
            <div class="tag">#Particle <span class="desc">- 'off' of 'walk off'</span></div>
          </div>
        </div>
        <div class="tag">#Value</div>
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
        <div class="tag">#Date <span class="desc">- 'june 2nd'</span></div>
        <div class="ul">
          <div class="tag">#Month <span class="desc">- 'june'</span></div>
          <div class="tag">#WeekDay <span class="desc">- 'wednesday'</span></div>
          <div class="tag">#Holiday <span class="desc">- 'haloween'</span></div>
        </div>
        <div class="tag">#Adjective <span class="desc">- 'fast'</span></div>
        <div class="ul">
          <div class="tag">#Comparable <span class="desc">- 'fast'</span></div>
          <div class="tag">#Comparative <span class="desc">- 'faster'</span></div>
          <div class="tag">#Superlative <span class="desc">- 'fastest'</span></div>
        </div>
        <div class="tag">#Contraction <span class="desc">- 'he's'</span></div>
        <div class="tag">#Adverb <span class="desc">- 'quickly'</span></div>
        <div class="tag">#Currency <span class="desc">- 'USD'</span></div>
        <div class="tag">#Determiner <span class="desc">- 'the'</span></div>
        <div class="tag">#Conjunction <span class="desc">- 'and'</span></div>
        <div class="tag">#Preposition <span class="desc">- 'of'</span></div>
        <div class="tag">#QuestionWord <span class="desc">- 'who'</span></div>
        <div class="tag">#Pronoun <span class="desc">- 'he'</span></div>
        <div class="tag">#Expression <span class="desc">- 'Gee'</span></div>
        <div class="tag">#Url <span class="desc">- 'http://compromise.cool'</span></div>
        <div class="tag">#HashTag <span class="desc">- '#nlp'</span></div>
        <div class="tag">#PhoneNumber <span class="desc">- '(800) 555-0000'</span></div>
        <div class="tag">#AtMention <span class="desc">- '@nlp_compromise'</span></div>
        <div class="tag">#Emoji <span class="desc">- ':)'</span></div>
        <div class="tag">#Emoticon <span class="desc">- '😊'</span></div>
        <div class="tag">#Email <span class="desc">- 'hi@compromise.cool'</span></div>
        <div class="tag">#Auxiliary <span class="desc">- 'would have had'</span></div>
        <div class="tag">#Negative <span class="desc">- 'not'</span></div>
        <div class="tag">#Abbreviation <span class="desc">- 'st.'</span></div>
        <div class="tag">#Acronym <span class="desc">- 'CIA'</span></div>
      </div>
    </div>
    <One>
      <Code js={tagOne} width="500px" />
    </One>
    <Two>
      Adding new tags to the current ones is easy:
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>

<style>
  .box {
    margin-top: 3rem;
    margin-left: 2rem;
  }
  .tag {
    margin-top: 0.5rem;
  }
  .ul {
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
  .desc {
    margin-left: 0.4rem;
    font-size: 0.7rem;
    color: grey;
    font-style: italic;
  }
</style>
