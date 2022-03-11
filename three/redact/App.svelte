<script>
  import { Page, Back, One, TextArea, Code, Below } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import text from './text.js'
  let opts = { people: true, places: true, money: true, phoneNumbers: true, emails: true }
  let res = nlp(text).redact(opts).text()
  const onchange = function (txt) {
    res = nlp(txt).redact(opts).text()
  }
  let example = `let doc = nlp('my number is 416-555-6732')
doc.redact()
doc.text()`
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three/redact</div>
  <div class="down tab desc">hide identifiable information in a document -</div>
  <!-- <div class="plugin">.readact()</div> -->
  <div class="row">
    <TextArea value={text} size="18px" height="400px" cb={onchange} />
    <div class="col items">
      <div class="item">
        <input type="checkbox" bind:checked={opts.people} />
        people
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.places} />
        places
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.money} />
        money
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.phoneNumbers} />
        phoneNumbers
      </div>
      <div class="item">
        <input type="checkbox" bind:checked={opts.emails} />
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
  <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
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
