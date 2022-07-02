<script>
  import { Page, Back, One, Two, Below, Code } from '../../lib/index.js'
  import Tree from './Tree.svelte'

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
  console.log(nlp.version)
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
    <Tree />
    <One>
      <Code js={tagOne} width="500px" />
    </One>
    <Two>
      Adding new tags to the current ones is easy:
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-tags" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>

<style>
  .tag {
    margin-top: 0.5rem;
  }
</style>
