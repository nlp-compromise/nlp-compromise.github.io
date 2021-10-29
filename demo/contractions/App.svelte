<script>
  import Page from '../../lib/Page.svelte'
  import One from '../../lib/One.svelte'
  import Left from '../../lib/Left.svelte'
  import Back from '../../lib/Back.svelte'
  import CodeMirror from '../../lib/CodeMirror/CodeMirror.svelte'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  let text = `no! we're not gonna take it..`
  let res = ''
  const onChange = function (txt) {
    let doc = nlp(txt)
    let found = doc.contractions()
    let json = found.json({ offset: true })
    let offsets = json.map(obj => {
      let offset = obj.offset
      return {
        start: offset.start,
        end: offset.start + offset.length,
        tag: 'tag',
      }
    })
    found.expand()
    res = doc.text()
    return offsets
  }
  onChange()
</script>

<Back />
<Page bottom="40px">
  <Left>
    <div class="b sea">compromise-contractions</div>

    <kbd style="font-size:1rem; ">import nlp from 'compromise/two'</kbd>
    <div style="margin-top:2rem;" />
    <div class="down tab">split-apart words -</div>
    <div class="down">
      <CodeMirror bind:text highlight={onChange} />
      <div class="res down">
        {res}
      </div>
    </div>
  </Left>
</Page>
<div class="right light f09">
  <a href="https://github.com/spencermountain/compromise/" class="">github</a>
</div>

<style>
  .right {
    margin-top: -100px;
    margin-left: 50%;
    text-align: center;
  }
</style>
