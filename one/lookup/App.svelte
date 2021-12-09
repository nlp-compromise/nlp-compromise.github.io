<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  let words=`ends of the earth
ashes to ashes
the good fight
the extra mile
fly in the ointment
cross to bear
bite the dust
give up the ghost
flesh and blood
move mountains
head on a planter
`
  let text=``
  $: more=()=>{
    let doc=nlp(text)
    return doc.text()
  }
let example=`// pre-compile lookup words
let m = nlp.compile(myWords)

let doc = nlp(text)
doc.cache() // why not.

let m = doc.lookup(m) // whoosh 💨
m.debug()
`
</script>


<style >
  .res {
    font-size:4rem;
    line-height:4.5rem;
    margin-top:3rem;
    margin-left:2rem;
    margin-bottom:2rem;
    color:#2D85A8;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align:center;
    flex-wrap: wrap;
    align-self: stretch;
  }
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align:center;
  flex-wrap: wrap;
  align-self: stretch;
}
.both {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align:center;
  flex-wrap: wrap;
  align-self: stretch;
}
button{
  box-shadow: 2px 2px 8px 0px rgba( 0, 0, 0, 0.2 );
  background-color:#edeceb;
  border-radius:5px;
  margin:0.1rem;
  margin-left:4.5rem;
  padding-top:0.3rem;
  padding-bottom:0.3rem;
  padding-left:0.8rem;
  padding-right:0.8rem;
  color:#705E5C;
  font-size:0.7rem;
  font-family: 'Merriweather', Georgia, 'Times New Roman', Times, serif;
}
</style >

<div class="col">
  <Back />
  <Page bottom="40px">
      <div class="lib">compromise/one</div>
      <div class="plugin">.lookup()</div>
      <div class="down tab desc">super-fast scan for a list of words in a document</div>
      <div class="both">
        <div >
          <TextArea width="240px" height="250px" value={''} size="0.9rem" />
        </div>
        <div >
          <TextArea width="180px" height="300px" value={words} size="0.9rem" />
          <button>re-compile</button>
        </div>
      </div>
      
      <Left >
        <div class="down tab desc">looking up a list of words in a text is a <i >suprisingly-tough</i> thing.
          <div class="down tab">
            for every word in your text →
            <div class="down tab">
              → loop through every search
            </div>
            <div class="down tab">
              → and then every word in each search.
            </div>
          </div>
        </div>
        <div class="down tab desc">but much worse - 
          <div class="down tab">
            you can stumble into <a href="https://javascript.info/regexp-catastrophic-backtracking">'catastrophic backtracking'</a> - 
            <div class="tab">
              when your terms have overlapping sub-matches.
            </div>
          </div>
          <div class="down tab desc">
            this implementation compiles your terms <a href="https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm">into a graph</a> -
            <div class="tab">
              to never look at the same word twice.
            </div>
            <div class="down">
              worst-case is <kbd>O(n)</kbd>
            </div>
            <div class="">
              best-case is kind of outrageous actually.
            </div>
          </div>
        </div>
      </Left>
      <Two>
        <Code js={example} width="500px"/>
      </Two>        
  </Page>
  <Below> 
    <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
  </Below>
</div>

