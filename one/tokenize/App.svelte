<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea, Three } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  let str = `i have two questions. 'Why lie?' and 'Lies, why?'`

  $: res = nlp(str).json()

  const doit = function () {
    console.log('=-=-=-= here -=-=-=-')
    res = nlp(str).json()
  }

  const showSpaces = function (str) {
    str = str.replace(/ /g, '_')
    str = str.replace(/\r?\n/g, '⏎')
    return str
  }
  const showText = function (term) {
    if (term.machine) {
      return `[${term.machine}]`
    }
    return term.text
  }
  let example = `let doc = nlp('i was saying boo-urns')
doc.json()
/*[{
    text: 'I was saying boo-urns.',
    terms: [
      {
        text: 'I',
        normal: 'i',
        pre: '',
        post: ' '
      },
      {
        text: 'was',
        pre: '',
        post: ' '
      },
      {
        text: 'saying',
        pre: '',
        post: ' '
      },
      {
        text: 'boo',
        pre: '',
        post: '-'
      },
      {
        text: 'urns',
        pre: '',
        post: '.'
      }
    ]
  }]
*/
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/one/tokenize</div>
    <!-- <div class="plugin">match-syntax</div> -->
    <div class="down tab desc">text is more useful when it's json.</div>
    <CodeMirror bind:text={str} />

    <div class="res col">
      {#each res as o, n}
        <div class="sentence row">
          {#each o.terms as term, i}
            <div class="space pre" class:empty={!term.pre}>{showSpaces(term.pre)}</div>
            <div class="term">{showText(term)}</div>
            <div class="space post" class:empty={!term.post}>{showSpaces(term.post)}</div>
          {/each}
        </div>
        {#if res[n + 1]}
          <div class="div" />
        {/if}
      {/each}
    </div>

    <Two>
      <Code js={example} width="500px" />
    </Two>

    <Three>
      viz inspired by <a href="https://www.inkandswitch.com/peritext/">Peritext</a> by Geoffrey Litt.
    </Three>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    align-self: stretch;
  }
  .div {
    background-color: lightgrey;
    align-self: flex-start;
    margin-top: 1rem;
    margin-bottom: 4rem;
    margin-left: 6rem;
    width: 40px;
    height: 2px;
  }
  .res {
    margin-left: 4rem;
    margin-top: 3rem;
    overflow-x: scroll;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    align-self: stretch;
  }
  .sentence {
    margin-bottom: 30px;
  }
  .term {
    /* border: 1px solid lightgrey; */
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    min-width: 30px;
    min-height: 30px;
    padding: 1rem;
  }
  .space {
    border: 2px solid #d68881;
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: #d68881;
    height: 25px;
    min-width: 3px;
    color: #d7d5d2;
    font-weight: bold;
    font-size: 10px;
    padding-left: 2px;
    padding-right: 2px;
  }
  .empty {
    opacity: 0.2;
  }
  .pre {
    margin-left: 1rem;
  }
  .post {
    margin-right: 1rem;
  }
</style>
