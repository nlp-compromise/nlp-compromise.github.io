<script>
  import { Page, Back, One, TextArea, Code, Below } from '../../lib/index.js'
  // import nlp from 'compromise'
  import text from './text.js'
  let opts = { people: true, places: true, money: true, phoneNumbers: true, emails: true }
  let res = nlp(text).redact(opts).text()
  const onchange = function (txt) {
    res = nlp(txt).redact(opts).text()
  }
  const update = function () {
    onchange(text)
  }
  let example = `let doc = nlp('my number is 416-555-6732')
doc.redact()
doc.text()`
  console.log(nlp.version)
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three</div>
  <div class="plugin">.readact()</div>
  <div class="down tab desc">hide identifiable information in a document -</div>
  <div class="row">
    <TextArea value={text} size="18px" height="400px" cb={onchange} />
    <div class="col items">
      <div class="item">
        <input type="checkbox" bind:checked={opts.people} on:click={update} />
        people
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.places} on:click={update} />
        places
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.money} on:click={update} />
        money
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.phoneNumbers} on:click={update} />
        phoneNumbers
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.emails} on:click={update} />
        emails
      </div>
    </div>
  </div>
  <pre class="res down">
    {res}
  </pre>
  <One>
    <Code js={example} width="500px" />
  </One>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-redact" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
</Below>

<style>
  pre {
    max-width: 100%;
    overflow-x: scroll;
    border-right: 1px solid lightgrey;
    border-radius: 5px;
    padding: 0.8rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .items {
    margin: 1rem;
    font-size: 0.8;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .item {
    margin-bottom: 1rem;
  }
</style>
