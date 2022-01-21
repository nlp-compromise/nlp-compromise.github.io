<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  import Picker from './Picker.svelte'
  let choice=0
  let trie=null
  import words from './words.js'
let example=`// pre-compile lookup words
let m = nlp.compile(myWords)

let doc = nlp(text)
doc.cache() // why not.

let m = doc.lookup(m) // whoosh 💨
m.debug()
`
let doc=nlp('')

$: lookup=()=>{
  let begin = new Date()
const m=doc.lookup(trie)
let end = new Date()
let duration=(end.getTime() - begin.getTime()) / 1000)
  console.log(m.length)
  return m.fullSentences().unique().out('array')
}
function recompile(){
  let terms=words.split(/\r?\n/).map(txt => txt.trim())
  terms=terms.filter(str => str)
  trie=nlp.compile(terms)
}
recompile()
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/one</div>
    <div class="plugin">.lookup()</div>
    <div class="down tab desc">super-fast scan for a list of words in a document</div>
    <div class="both">
      <div>
        <Picker {choice} bind:doc title="state of the union:" />
        <!-- <TextArea width="240px" height="250px" value={''} size="0.9rem" /> -->
      </div>
      <div>
        <TextArea width="180px" height="300px" bind:value={words} size="0.9rem" />
        <button on:click={recompile}>↻ compile</button>
      </div>
    </div>
    <!-- sentence-list -->
    <div class="list">
      {#each lookup() as m}
        <div class="sentence">• {m}</div>
      {/each}
    </div>

    <!-- docs -->
    <Left>
      <div class="down tab desc">
        looking up a list of words in a text is a <i>suprisingly-tough</i> thing.
        <div class="down tab">
          for every word in your text →
          <div class="down tab">→ loop through every search</div>
          <div class="down tab">→ and then every word in each search.</div>
        </div>
      </div>
      <div class="down tab desc">
        but much worse -
        <div class="down tab">
          you can stumble into <a href="https://javascript.info/regexp-catastrophic-backtracking"
            >'catastrophic backtracking'</a
          >
          -
          <div class="tab">when your terms have overlapping sub-matches.</div>
        </div>
        <div class="down tab desc">
          this implementation compiles your terms <a href="https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm"
            >into a graph</a
          >
          -
          <div class="tab">to never look at the same word twice.</div>
          <div class="down">
            worst-case is <kbd>O(n)</kbd>
          </div>
          <div class="">best-case is kind of outrageous actually.</div>
        </div>
      </div>
    </Left>
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
  </Below>
</div>

<style></style>
